//! Slash Voice's own updates (specs/009-updates).
//!
//! Checks Slash Voice's release feed, downloads a newer version in the
//! background, keeps it in the cache folder, and installs it when the user
//! presses Restart or quits. Never while a dictation or a transcription runs.
//! The plugin verifies the download's signature; it is verified again here,
//! from the cached file, right before it is installed.

use std::path::{Path, PathBuf};
use std::sync::Mutex;
use std::time::Duration;

use base64::Engine;
use log::{info, warn};
use serde::Serialize;
use specta::Type;
use tauri::{AppHandle, Emitter, Manager};
use tauri_plugin_updater::{Update, UpdaterExt};

/// The only feed the app reads. It is also the endpoint in `tauri.conf.json`.
pub const FEED_URL: &str =
    "https://github.com/iMedoV8/SlashVoice/releases/latest/download/latest.json";
/// Every update file must come from here.
pub const DOWNLOAD_PREFIX: &str = "https://github.com/iMedoV8/SlashVoice/releases/download/";
/// Slash Voice's update key (public half, key id 6105EBE0FEE4F9D1). The same
/// value is `plugins.updater.pubkey` in `tauri.conf.json`.
pub const UPDATE_PUBKEY: &str = "dW50cnVzdGVkIGNvbW1lbnQ6IG1pbmlzaWduIHB1YmxpYyBrZXk6IDYxMDVFQkUwRkVFNEY5RDEKUldUUitlVCs0T3NGWVlOV0hqckROVGNlNTdCY01EUWhMcUlSc2pKWDhaMFlJeFpIeHhlQmFLbXIK";

const FIRST_CHECK_AFTER: Duration = Duration::from_secs(30);
const CHECK_EVERY: Duration = Duration::from_secs(6 * 60 * 60);

/// Whether `bytes` carry a valid signature from `pubkey`. Any doubt is a no.
pub fn verify_bytes(bytes: &[u8], signature: &str, pubkey: &str) -> bool {
    let decode = |s: &str| {
        base64::engine::general_purpose::STANDARD
            .decode(s.trim())
            .ok()
            .and_then(|b| String::from_utf8(b).ok())
    };
    let (Some(key), Some(sig)) = (decode(pubkey), decode(signature)) else {
        return false;
    };
    let (Ok(key), Ok(sig)) = (
        minisign_verify::PublicKey::decode(&key),
        minisign_verify::Signature::decode(&sig),
    ) else {
        return false;
    };
    key.verify(bytes, &sig, true).is_ok()
}

/// Whether an update file's address is one of our releases, over HTTPS.
pub fn is_our_download(url: &str) -> bool {
    url.starts_with(DOWNLOAD_PREFIX)
        && !url[DOWNLOAD_PREFIX.len()..]
            .split('/')
            .any(|part| part == "..")
}

#[derive(Debug, PartialEq, Eq)]
pub enum Busy {
    Dictating,
    Transcribing,
}

/// Why an update cannot be installed now, if it cannot.
pub fn busy_reason(dictating: bool, jobs_idle: bool) -> Option<Busy> {
    if dictating {
        Some(Busy::Dictating)
    } else if !jobs_idle {
        Some(Busy::Transcribing)
    } else {
        None
    }
}

/// An update downloaded, verified and waiting in the cache folder.
struct Ready {
    update: Update,
    file: PathBuf,
}

#[derive(Default)]
pub struct UpdateState(Mutex<Option<Ready>>);

#[derive(Clone, Serialize, Type)]
pub struct UpdateReady {
    pub version: String,
}

#[derive(Clone, Serialize, Type)]
#[serde(rename_all = "snake_case")]
pub enum UpdateFailure {
    Unverified,
    Install,
}

#[derive(Clone, Serialize, Type)]
#[serde(tag = "state", rename_all = "snake_case")]
pub enum UpdateStatus {
    Idle,
    Ready { version: String },
}

fn lock(state: &UpdateState) -> std::sync::MutexGuard<'_, Option<Ready>> {
    state.0.lock().unwrap_or_else(|p| p.into_inner())
}

fn busy_now(app: &AppHandle) -> Option<Busy> {
    let jobs_idle = app
        .try_state::<std::sync::Arc<crate::managers::transcription_jobs::TranscriptionJobManager>>()
        .is_none_or(|jobs| jobs.is_idle());
    busy_reason(crate::tray::dictation_in_progress(app), jobs_idle)
}

fn cache_file(app: &AppHandle, version: &str) -> Option<PathBuf> {
    let dir = app.path().app_cache_dir().ok()?.join("updates");
    std::fs::create_dir_all(&dir).ok()?;
    let safe: String = version
        .chars()
        .filter(|c| c.is_ascii_alphanumeric() || matches!(c, '.' | '-' | '+'))
        .collect();
    Some(dir.join(format!("slash-voice-{safe}.update")))
}

fn write_private(path: &Path, bytes: &[u8]) -> std::io::Result<()> {
    use std::io::Write;
    let mut options = std::fs::OpenOptions::new();
    options.write(true).create(true).truncate(true);
    #[cfg(unix)]
    {
        use std::os::unix::fs::OpenOptionsExt;
        options.mode(0o600);
    }
    options.open(path)?.write_all(bytes)
}

/// Starts the background checks. Each round re-reads the setting, so turning
/// checks off stops the next request.
pub fn start(app: &AppHandle) {
    app.manage(UpdateState::default());
    let app = app.clone();
    tauri::async_runtime::spawn(async move {
        tokio::time::sleep(FIRST_CHECK_AFTER).await;
        loop {
            check(&app).await;
            tokio::time::sleep(CHECK_EVERY).await;
        }
    });
}

/// Checks now (the tray's "Check for updates"), in the background.
pub fn check_now(app: &AppHandle) {
    let app = app.clone();
    tauri::async_runtime::spawn(async move { check(&app).await });
}

async fn check(app: &AppHandle) {
    if !crate::settings::update_checks_effectively_enabled(&crate::settings::get_settings(app)) {
        return;
    }
    if let Some(state) = app.try_state::<UpdateState>() {
        if lock(&state).is_some() {
            return; // one is already waiting
        }
    }
    // The feed and the key are fixed here, not only in tauri.conf.json, so a
    // changed config alone cannot point the app elsewhere.
    let updater = tauri::Url::parse(FEED_URL)
        .map_err(|e| e.to_string())
        .and_then(|feed| {
            app.updater_builder()
                .endpoints(vec![feed])
                .map_err(|e| e.to_string())
        })
        .and_then(|b| b.pubkey(UPDATE_PUBKEY).build().map_err(|e| e.to_string()));
    let update = match updater {
        Ok(updater) => match updater.check().await {
            Ok(Some(update)) => update,
            Ok(None) => return,
            Err(e) => {
                info!("Update check failed: {e}");
                return; // a failed check is silent (spec, FR-009)
            }
        },
        Err(e) => {
            warn!("Updater unavailable: {e}");
            return;
        }
    };
    if !is_our_download(update.download_url.as_str()) {
        warn!("Ignored an update from an unexpected address");
        let _ = app.emit("update-failed", UpdateFailure::Unverified);
        return;
    }
    let bytes = match update.download(|_, _| {}, || {}).await {
        Ok(bytes) => bytes,
        Err(e) => {
            let unverified = matches!(
                e,
                tauri_plugin_updater::Error::Minisign(_)
                    | tauri_plugin_updater::Error::SignatureUtf8(_)
                    | tauri_plugin_updater::Error::Base64(_)
            );
            info!("Update download failed: {e}");
            if unverified {
                let _ = app.emit("update-failed", UpdateFailure::Unverified);
            }
            return;
        }
    };
    let Some(file) = cache_file(app, &update.version) else {
        return;
    };
    if let Err(e) = write_private(&file, &bytes) {
        warn!("Could not keep the update: {e}");
        return;
    }
    drop(bytes); // the waiting update lives on disk, not in memory
    let version = update.version.clone();
    if let Some(state) = app.try_state::<UpdateState>() {
        *lock(&state) = Some(Ready { update, file });
        info!("Update {version} is ready");
        let _ = app.emit("update-ready", UpdateReady { version });
    }
}

#[derive(Debug, PartialEq, Eq)]
pub enum InstallError {
    Busy,
    None,
    Unverified,
    Failed,
}

/// Installs the waiting update. `restart` reopens the app afterwards.
fn install(app: &AppHandle, restart: bool) -> Result<(), InstallError> {
    if busy_now(app).is_some() {
        return Err(InstallError::Busy);
    }
    let state = app.try_state::<UpdateState>().ok_or(InstallError::None)?;
    let ready = lock(&state).take().ok_or(InstallError::None)?;
    let bytes = std::fs::read(&ready.file).map_err(|_| InstallError::Failed)?;
    let _ = std::fs::remove_file(&ready.file);
    // The cached file could have been swapped since it was downloaded.
    if !verify_bytes(&bytes, &ready.update.signature, UPDATE_PUBKEY) {
        let _ = app.emit("update-failed", UpdateFailure::Unverified);
        return Err(InstallError::Unverified);
    }
    if let Err(e) = ready.update.install(&bytes) {
        warn!("Update install failed: {e}");
        let _ = app.emit("update-failed", UpdateFailure::Install);
        return Err(InstallError::Failed);
    }
    info!("Update {} installed", ready.update.version);
    if restart {
        app.restart();
    }
    Ok(())
}

/// At quit: install a waiting update, if any, without reopening.
pub fn install_on_quit(app: &AppHandle) {
    let waiting = app
        .try_state::<UpdateState>()
        .is_some_and(|state| lock(&state).is_some());
    if waiting {
        let _ = install(app, false);
    }
}

#[tauri::command]
#[specta::specta]
pub fn get_update_state(app: AppHandle) -> UpdateStatus {
    app.try_state::<UpdateState>()
        .and_then(|state| {
            lock(&state).as_ref().map(|r| UpdateStatus::Ready {
                version: r.update.version.clone(),
            })
        })
        .unwrap_or(UpdateStatus::Idle)
}

/// Installs the waiting update and reopens the app. Refused while a
/// dictation or a transcription runs.
#[tauri::command]
#[specta::specta]
pub fn restart_to_update(app: AppHandle) -> Result<(), String> {
    install(&app, true).map_err(|e| match e {
        InstallError::Busy => "busy".to_string(),
        InstallError::None => "none".to_string(),
        InstallError::Unverified => "unverified".to_string(),
        InstallError::Failed => "failed".to_string(),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    const PAYLOAD: &[u8] = include_bytes!("../tests/fixtures/updates/payload.bin");
    const ALTERED: &[u8] = include_bytes!("../tests/fixtures/updates/payload-altered.bin");
    const SIG: &str = include_str!("../tests/fixtures/updates/payload.bin.sig");
    const TEST_KEY: &str = include_str!("../tests/fixtures/updates/test-key.pub");

    #[test]
    fn a_file_signed_with_the_key_is_accepted() {
        assert!(verify_bytes(PAYLOAD, SIG.trim(), TEST_KEY.trim()));
    }

    #[test]
    fn a_file_signed_with_another_key_is_refused() {
        // The fixture was signed with a throwaway key, not Slash Voice's.
        assert!(!verify_bytes(PAYLOAD, SIG.trim(), UPDATE_PUBKEY));
    }

    #[test]
    fn an_altered_file_is_refused() {
        assert!(!verify_bytes(ALTERED, SIG.trim(), TEST_KEY.trim()));
    }

    #[test]
    fn a_missing_or_garbled_signature_is_refused() {
        assert!(!verify_bytes(PAYLOAD, "", TEST_KEY.trim()));
        assert!(!verify_bytes(PAYLOAD, "not base64!", TEST_KEY.trim()));
    }

    #[test]
    fn the_app_carries_slash_voices_key_not_handys() {
        let decoded = String::from_utf8(
            base64::Engine::decode(&base64::engine::general_purpose::STANDARD, UPDATE_PUBKEY)
                .unwrap(),
        )
        .unwrap();
        assert!(decoded.contains("6105EBE0FEE4F9D1"));
        assert!(!decoded.contains("BAB72095206601F9"));
    }

    #[test]
    fn updates_come_only_from_our_releases() {
        assert!(is_our_download(
            "https://github.com/iMedoV8/SlashVoice/releases/download/v0.2.1/slash-voice_0.2.1_macos-arm64.app.tar.gz"
        ));
        for url in [
            "https://github.com/cjpais/Handy/releases/download/v1/x.tar.gz",
            "http://github.com/iMedoV8/SlashVoice/releases/download/v0.2.1/x",
            "https://github.com/iMedoV8/SlashVoice/releases/download/../../../evil/x",
            "https://github.com.evil.example/iMedoV8/SlashVoice/releases/download/v1/x",
            "https://blob.handy.computer/x.tar.gz",
        ] {
            assert!(!is_our_download(url), "{url}");
        }
        assert!(FEED_URL.starts_with("https://github.com/iMedoV8/SlashVoice/"));
    }

    #[test]
    fn no_restart_while_dictating_or_transcribing() {
        assert_eq!(busy_reason(true, true), Some(Busy::Dictating));
        assert_eq!(busy_reason(false, false), Some(Busy::Transcribing));
        assert_eq!(busy_reason(false, true), None);
    }
}

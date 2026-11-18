//! Running totals of dictation, kept on this computer for the Home page.
//!
//! Only counts are stored: dictations, words, seconds of recording and words
//! from transcribed files, plus the date counting began. Never the text, the
//! app it went into, or the time of day (`RULES.md` §3). Nothing leaves the
//! computer.

use log::{error, warn};
use serde::{Deserialize, Serialize};
use specta::Type;
use std::fs;
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Manager};

use crate::audio_toolkit::constants::WHISPER_SAMPLE_RATE;

const VERSION: u32 = 1;
const FILE_NAME: &str = "stats.json";

/// What Home reads.
#[derive(Serialize, Deserialize, Type, Clone, Debug, PartialEq)]
pub struct DictationTotals {
    /// When counting began, Unix seconds.
    pub since: i64,
    pub dictations: u64,
    pub words: u64,
    /// Seconds of recording behind `words`.
    pub seconds: f64,
    /// Words from transcribed files: not spoken live, so not in speed or time saved.
    pub file_words: u64,
}

impl DictationTotals {
    fn zero(since: i64) -> Self {
        DictationTotals {
            since,
            dictations: 0,
            words: 0,
            seconds: 0.0,
            file_words: 0,
        }
    }
}

/// The file on disk: the totals and a format version, nothing else.
#[derive(Serialize, Deserialize)]
struct StatsFile {
    version: u32,
    #[serde(flatten)]
    totals: DictationTotals,
}

pub struct Stats {
    path: PathBuf,
    totals: Mutex<DictationTotals>,
}

impl Stats {
    /// Reads the totals at `path`. A missing file starts counting at `now`
    /// and is written at once, so the start date does not move each launch.
    /// An unreadable one is kept aside as `stats.json.unreadable` and
    /// counting starts again at `now`.
    pub fn open(path: PathBuf, now: i64) -> Self {
        let totals = match fs::read(&path) {
            Ok(bytes) => match serde_json::from_slice::<StatsFile>(&bytes) {
                Ok(file) if file.version == VERSION => Some(file.totals),
                _ => {
                    warn!("Dictation totals were unreadable; counting starts again");
                    let aside = path.with_extension("json.unreadable");
                    if let Err(e) = fs::rename(&path, &aside) {
                        error!("Could not keep the unreadable totals aside: {}", e);
                    }
                    None
                }
            },
            Err(_) => None,
        };
        let fresh = totals.is_none();
        let stats = Stats {
            path,
            totals: Mutex::new(totals.unwrap_or_else(|| DictationTotals::zero(now))),
        };
        if fresh {
            stats.save(&stats.totals());
        }
        stats
    }

    /// Counts a finished dictation of `samples` at 16 kHz. Empty text is not counted.
    pub fn add_dictation(&self, text: &str, samples: usize) {
        let words = count_words(text);
        if words == 0 {
            return;
        }
        self.update(|t| {
            t.dictations += 1;
            t.words += words;
            t.seconds += samples as f64 / WHISPER_SAMPLE_RATE as f64;
        });
    }

    /// Counts the words of a transcribed file.
    pub fn add_file(&self, text: &str) {
        let words = count_words(text);
        if words == 0 {
            return;
        }
        self.update(|t| t.file_words += words);
    }

    pub fn totals(&self) -> DictationTotals {
        self.lock().clone()
    }

    fn update(&self, change: impl FnOnce(&mut DictationTotals)) {
        let snapshot = {
            let mut totals = self.lock();
            change(&mut totals);
            totals.clone()
        };
        self.save(&snapshot);
    }

    fn lock(&self) -> std::sync::MutexGuard<'_, DictationTotals> {
        self.totals.lock().unwrap_or_else(|p| p.into_inner())
    }

    /// Written to a temporary file and renamed, so a crash never leaves half a file.
    fn save(&self, totals: &DictationTotals) {
        let file = StatsFile {
            version: VERSION,
            totals: totals.clone(),
        };
        if let Err(e) = write_atomic(&self.path, &file) {
            error!("Could not save dictation totals: {}", e);
        }
    }
}

fn write_atomic(path: &Path, file: &StatsFile) -> std::io::Result<()> {
    if let Some(dir) = path.parent() {
        fs::create_dir_all(dir)?;
    }
    let tmp = path.with_extension("json.tmp");
    fs::write(&tmp, serde_json::to_vec(file)?)?;
    fs::rename(&tmp, path)
}

/// Words separated by white space. Scripts written without spaces count as
/// one word per run; none of the app's languages is written that way.
fn count_words(text: &str) -> u64 {
    text.split_whitespace().count() as u64
}

/// Opens the totals in the app's data folder. Called once at start-up.
pub fn init(app: &AppHandle) {
    match crate::portable::app_data_dir(app) {
        Ok(dir) => {
            let now = chrono::Utc::now().timestamp();
            app.manage(Arc::new(Stats::open(dir.join(FILE_NAME), now)));
        }
        Err(e) => error!("No data folder for dictation totals: {}", e),
    }
}

/// After a dictation has its text.
pub fn record_dictation(app: &AppHandle, text: &str, samples: usize) {
    if let Some(stats) = app.try_state::<Arc<Stats>>() {
        stats.add_dictation(text, samples);
    }
}

/// After a file is transcribed for the first time.
pub fn record_file(app: &AppHandle, text: &str) {
    if let Some(stats) = app.try_state::<Arc<Stats>>() {
        stats.add_file(text);
    }
}

#[tauri::command]
#[specta::specta]
pub fn get_dictation_totals(app: AppHandle) -> Option<DictationTotals> {
    app.try_state::<Arc<Stats>>().map(|s| s.totals())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;

    const NOW: i64 = 1_795_000_000;
    const SECOND: usize = 16_000;

    fn fresh() -> (tempfile::TempDir, PathBuf) {
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("stats.json");
        (dir, path)
    }

    #[test]
    fn a_fresh_install_counts_from_now_with_zeros() {
        let (_dir, path) = fresh();
        let stats = Stats::open(path.clone(), NOW);
        let t = stats.totals();
        assert_eq!(t.since, NOW);
        assert_eq!((t.dictations, t.words, t.file_words), (0, 0, 0));
        assert_eq!(t.seconds, 0.0);
        // The start date is kept, so it does not move each launch.
        assert_eq!(Stats::open(path, NOW + 999).totals().since, NOW);
    }

    #[test]
    fn words_and_seconds_add_up() {
        let (_dir, path) = fresh();
        let stats = Stats::open(path, NOW);
        stats.add_dictation("Run the Spring Boot tests again", 4 * SECOND);
        stats.add_dictation("  deploy\nis   done ", SECOND / 2);
        let t = stats.totals();
        assert_eq!(t.dictations, 2);
        assert_eq!(t.words, 6 + 3);
        assert_eq!(t.seconds, 4.5);
        assert_eq!(t.file_words, 0);
    }

    #[test]
    fn arabic_words_are_counted_by_spaces() {
        let (_dir, path) = fresh();
        let stats = Stats::open(path, NOW);
        stats.add_dictation("شغّل الاختبارات مرة ثانية", SECOND);
        assert_eq!(stats.totals().words, 4);
    }

    #[test]
    fn an_empty_dictation_is_not_counted() {
        let (_dir, path) = fresh();
        let stats = Stats::open(path, NOW);
        stats.add_dictation("", 3 * SECOND);
        stats.add_dictation("   \n ", 3 * SECOND);
        let t = stats.totals();
        assert_eq!((t.dictations, t.words), (0, 0));
        assert_eq!(t.seconds, 0.0);
    }

    #[test]
    fn a_file_adds_words_only() {
        let (_dir, path) = fresh();
        let stats = Stats::open(path, NOW);
        stats.add_file("one two three four five");
        stats.add_file("");
        let t = stats.totals();
        assert_eq!(t.file_words, 5);
        assert_eq!((t.dictations, t.words), (0, 0));
        assert_eq!(t.seconds, 0.0);
    }

    #[test]
    fn totals_survive_a_restart() {
        let (_dir, path) = fresh();
        {
            let stats = Stats::open(path.clone(), NOW);
            stats.add_dictation("one two three", 2 * SECOND);
            stats.add_file("four five");
        }
        let t = Stats::open(path, NOW + 86_400).totals();
        assert_eq!(t.since, NOW);
        assert_eq!((t.dictations, t.words, t.file_words), (1, 3, 2));
        assert_eq!(t.seconds, 2.0);
    }

    #[test]
    fn an_unreadable_file_starts_again_from_zero_and_is_kept_aside() {
        let (dir, path) = fresh();
        fs::write(&path, b"{ not json").unwrap();
        let stats = Stats::open(path.clone(), NOW);
        let t = stats.totals();
        assert_eq!(t.since, NOW);
        assert_eq!((t.dictations, t.words), (0, 0));
        assert_eq!(
            fs::read(dir.path().join("stats.json.unreadable")).unwrap(),
            b"{ not json"
        );
        stats.add_dictation("still counting", SECOND);
        assert_eq!(Stats::open(path, NOW).totals().words, 2);
    }

    #[test]
    fn the_file_holds_only_counts() {
        let (_dir, path) = fresh();
        let stats = Stats::open(path.clone(), NOW);
        stats.add_dictation("a secret sentence nobody should read", SECOND);
        let raw = fs::read_to_string(&path).unwrap();
        assert!(!raw.contains("secret"));
        let value: serde_json::Value = serde_json::from_str(&raw).unwrap();
        let mut keys: Vec<&str> = value
            .as_object()
            .unwrap()
            .keys()
            .map(String::as_str)
            .collect();
        keys.sort();
        assert_eq!(
            keys,
            [
                "dictations",
                "file_words",
                "seconds",
                "since",
                "version",
                "words"
            ]
        );
    }
}

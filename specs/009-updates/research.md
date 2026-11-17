# Research: updates and a fixed Mac signature

Read on 2026-11-18. Tauri's website could not be fetched from this session, so the facts below come from Tauri's own source code as installed for this project (`tauri-plugin-updater` 2.10.1 in the Cargo registry, `@tauri-apps/plugin-updater` and `@tauri-apps/cli` 2.x in `node_modules`) and from the installed app.

## R1. Why macOS asks for permissions after every build

**Finding.** macOS records microphone and accessibility permission against the app's _designated requirement_. For the installed build it is:

```text
codesign -dr - "/Applications/Slash Voice.app"
designated => cdhash H"7dea1482..."
```

A `cdhash` is a hash of this exact build. Our builds are signed ad hoc (`"signingIdentity": "-"` in `tauri.conf.json`), so every build has a new hash and macOS treats it as a new app.

**Decision.** Sign with a certificate. The designated requirement then names the app's identifier and the certificate, not the build, and stays the same from build to build.

**Verified on 2026-11-18** (tasks T001 to T003), on the founder's Mac. A self-made "Slash Voice" code-signing certificate, valid until 2036, was added to his login keychain. Two builds were signed with it, 0.1.0 (A) and a test build labelled 0.1.1 (B). Both have the same designated requirement:

```text
designated => identifier "com.slashvoice.app" and certificate leaf = H"7dd17dd5a214276dcc5423d98854eb38c9666274"
```

The founder granted microphone and accessibility to A and dictated. B was installed over A: it opened without the permissions screen, macOS asked nothing, and dictation worked. The hardened runtime loads the app's libraries with this certificate. Keychain shows the certificate as not trusted, since macOS made it itself; signing does not need that trust, and no password prompt appears.

Note: System Settings showed the app with an old purple icon from the first build. The icon file in the app has no purple; it is macOS's saved copy and is refreshed by a restart.

**Alternatives.** Apple Developer ID ($99 a year): the same effect, and it also removes the "cannot verify" warning; the founder's decision if T001 fails. Keeping ad hoc: rejected, it is the cause.

## R2. How Tauri signs a Mac build with a certificate

**Finding** (strings in the Tauri CLI): when `APPLE_CERTIFICATE` (a base64 `.p12`) and `APPLE_CERTIFICATE_PASSWORD` are set, the CLI creates a temporary keychain, imports the certificate, allows `codesign` to use it, and signs with `APPLE_SIGNING_IDENTITY`. Notarisation runs only if `APPLE_ID`/`APPLE_PASSWORD`/`APPLE_TEAM_ID` or an API key are set; they will not be.

**Decision.** The release workflow sets those three variables from secrets on the Mac job. On the founder's Mac the certificate sits in his login keychain and local builds name it in `APPLE_SIGNING_IDENTITY`. `tauri.conf.json` keeps `"-"`, so a contributor without the certificate still gets an ad hoc build.

## R3. The updater

**Findings** (`tauri-plugin-updater` 2.10.1 source):

- An update is verified with `minisign` against the public key in `plugins.updater.pubkey` before it is installed (`verify_signature`). A mismatch is an error and nothing is installed.
- The feed is a JSON file: `version`, optional `notes` and `pub_date`, and `platforms`, a map from target (`darwin-aarch64`, `windows-x86_64`) to `{ url, signature }`.
- On macOS the update is a `.app.tar.gz` that replaces the app bundle in place. On Windows it is the NSIS installer, run in `passive` mode by default (a progress bar, no questions).
- Signing at build time reads `TAURI_SIGNING_PRIVATE_KEY` and `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`; `bundle.createUpdaterArtifacts: true` makes the update files and their `.sig` files.
- The Rust API separates `check`, `download` (returns the bytes) and `install(bytes)`.

**Decisions.**

- A new key pair made with `tauri signer generate`. The public key replaces Handy's in `tauri.conf.json`; the private key and its password become workflow secrets, with one backup in the founder's password manager.
- The check, download and install live in a new Rust module, `src-tauri/src/updates.rs`, not in the window. Rust knows whether a recording or transcription is running, can install at quit even when the window is closed, and keeps the downloaded file on disk rather than in memory.
- The downloaded update is written to the app's cache folder and read back when it is installed, so a waiting update does not add tens of megabytes to the app's memory (`RULES.md` §4).

## R4. Where the feed lives

**Finding.** GitHub's `releases/latest/download/<file>` address serves the newest _published, non-pre-release_ release. Drafts and pre-releases are skipped.

**Decision.** From 0.2.0, releases are published as ordinary releases (the release notes still say the app is early and unsigned). The feed is `https://github.com/iMedoV8/SlashVoice/releases/latest/download/latest.json`. This changes one assumption in the spec ("all releases are pre-releases"); the plan states it for the founder.

**Alternatives.** A fixed tag whose `latest.json` is replaced at every release: works with pre-releases, but means rewriting a published file, which `specs/004-installers` rules out. Our own server: rejected, nothing to run.

## R5. The update check in the window

**Finding.** Handy's update checker (`src/components/update-checker/UpdateChecker.tsx`) was part of the bottom bar, which `specs/008-own-look` stopped mounting. The switch for update checks is on the Debug page (`UpdateChecksToggle`).

**Decision.** A "Version N is ready · Restart" line in the sidebar's foot when an update waits, and an Updates group on About with the switch, the current state and the same Restart. The old checker stays unmounted.

## R6. Windows

**Finding.** Windows does not tie the microphone permission to a signature, so reinstalls do not reset it. SmartScreen warns about unsigned installers that carry the "downloaded from the internet" mark.

**Not verified.** Whether an update installed by the app (downloaded by the app itself, without that mark) shows the warning. Checked on the founder's Windows PC (quickstart, step 6).

# Implementation Plan: Updates, and permissions that survive them

**Branch**: `task/009-updates` | **Date**: 2026-11-18 | **Spec**: `spec.md` | **Research**: `research.md`

## Summary

Three parts, in this order, because each depends on the one before:

1. **A fixed Mac signature.** Builds are signed with a free certificate made on the founder's Mac, so macOS sees every build as the same app and keeps its permissions (`research.md` R1, R2). Tested first, before anything else is built.
2. **Updates.** Our own update key; the release workflow signs the update files and publishes a feed with each release; a new Rust module checks that feed, downloads in the background, and installs when the user presses Restart or quits (R3, R4).
3. **Release 0.2.0** with the new look, published by the workflow as the first release that can update itself.

## Technical Context

**Language/Version**: Rust stable (the app), TypeScript and React 18 (the window), GitHub Actions YAML (the release workflow)

**Primary Dependencies**: `tauri-plugin-updater` 2.10 and `tauri-plugin-process`, both already in the app; no new dependency

**Storage**: the downloaded update in the app's cache folder until it is installed

**Testing**: `cargo test` for the update module; `bun test tests-look` for the configuration and workflow; the quickstart on the founder's Mac and Windows PC

**Target Platform**: macOS on Apple Silicon, Windows x64

**Project Type**: desktop app

**Performance Goals**: an update check takes no time on the interface thread; a waiting update adds no download to memory

**Constraints**: memory with no model loaded stays under 150 MB (`RULES.md` §4); no restart during a recording or a transcription

**Scale/Scope**: the founder and his friends; releases a few times a month

## Constitution Check

| Principle (`.specify/memory/constitution.md`) | How this plan meets it                                                               |
| --------------------------------------------- | ------------------------------------------------------------------------------------ |
| Spec first                                    | `spec.md`, clarified by the founder on 2026-11-18                                    |
| Tests first                                   | Every task below lists its test before its code                                      |
| Security designed in                          | The threat table below; fail closed on any signature doubt                           |
| Our features in their own module              | `src-tauri/src/updates.rs`; Handy's `UpdateChecker` is left unmounted, not rewritten |
| Second review for updates                     | Codex reviews the diff, then the founder, before merge                               |

Result: passes.

## Design

```text
src-tauri/src/updates.rs   (new, ours)
  start(app)                 at launch, if update checks are effectively on
    every 6 hours: check feed -> newer?
      download -> verify (minisign, in the plugin) -> write to cache
      emit "update-ready" { version }
  restart_to_update()        command; refused while recording or transcribing
    install from cache -> relaunch
  on quit                    if an update waits: install from cache, then exit

src/components/UpdateNotice.tsx   (new)   "Version N is ready · Restart" in the sidebar's foot
src/components/settings/about/    Updates group: the check switch (moved from Debug), state, Restart

.github/workflows/release.yml
  build (mac)     + APPLE_CERTIFICATE, APPLE_CERTIFICATE_PASSWORD, APPLE_SIGNING_IDENTITY
  build (both)    + TAURI_SIGNING_PRIVATE_KEY, TAURI_SIGNING_PRIVATE_KEY_PASSWORD
                  + createUpdaterArtifacts -> .app.tar.gz + .sig, -setup.exe + .sig
  release         + writes latest.json (contracts/feed.md) and attaches it

tauri.conf.json   plugins.updater.pubkey = ours; endpoints = [feed]; createUpdaterArtifacts = true
settings.rs       SLASH_VOICE_HAS_RELEASE_FEED = true
```

The state of an update is in `data-model.md`; the feed, the command and the event are in `contracts/`.

**Changed from the spec's assumptions**: releases from 0.2.0 on are published as ordinary releases, not pre-releases, because GitHub's "latest" address skips pre-releases (`research.md` R4). The release notes still say the app is early and unsigned.

## Security: threats touched

| Threat                              | How this change touches it             | Response in this design                                                                                                                      | Test that covers it                                                   |
| ----------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| A forged or altered update          | The app now installs code it downloads | Installed only after its `minisign` signature matches our public key; any doubt is a refusal                                                 | A Rust test offers a file signed with another key and expects refusal |
| Updates from somewhere else         | The feed address is in the app         | One address, on our repository, over HTTPS; Handy's key and any `HF_ENDPOINT`-style override are not used                                    | A look check reads `tauri.conf.json`: one endpoint, ours, and our key |
| A leaked signing secret             | Two new secrets                        | Only in the workflow's secret store, used only by the build steps, never echoed; a backup in the founder's password manager; the secret scan | `bun run security`; a look check that the workflow never prints them  |
| A pull request stealing secrets     | The workflow builds on pull requests   | Secrets are read only when the workflow is started by hand on `main`; pull-request builds stay unsigned                                      | A look check on the workflow's conditions                             |
| A restart that loses dictated words | Restart and quit install the update    | Refused while recording or transcribing                                                                                                      | A Rust test of the refusal                                            |
| Tracking through update checks      | The app contacts GitHub                | The request carries nothing about the user; checks can be switched off and then nothing is sent                                              | A Rust test: checks off, no request                                   |

**Security rules touched** (`RULES.md` §3): self-update, secrets, no telemetry.

**Second review needed**: yes. Changes to the updater (`RULES.md` §3).

## Performance

- Memory with no model loaded is measured before and after; a waiting update is on disk, not in memory.
- The check runs on a background task; the interface never waits for it.

## What the founder does

Each step is a command he runs himself; no agent sees a password or a private key.

1. Make the certificate in Keychain Access (Certificate Assistant, a code-signing certificate named "Slash Voice", valid ten years) and export it as a `.p12` with a password.
2. Make the update key: `bun run tauri signer generate -w ~/.tauri/slash-voice.key`, with a password.
3. Put four secrets into GitHub with `gh secret set` (the command reads them from his keyboard): the certificate, its password, the update key, its password.
4. Save the certificate, the key and both passwords in his password manager.
5. Grant permissions once to the first signed build, then test the quickstart on his Mac and Windows PC.

## Handy's files touched

`tauri.conf.json` (key, endpoint, update files), `settings.rs` (the one switch), `lib.rs` (start the module, the quit hook), `Sidebar`'s foot and About (the notice and the switch), `DebugSettings.tsx` (the switch leaves), `release.yml` (ours). Handy's `UpdateChecker` is left in place, unmounted.

## Not in this task

Apple Developer ID and notarisation, a Windows signing certificate, Intel Mac and Windows ARM builds, release notes shown inside the app.

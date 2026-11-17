# Tasks: Updates, and permissions that survive them

**Tests first.** Each check is seen to fail before the code that makes it pass. Tasks marked **(founder)** are his to do; no agent sees a password or a private key.

## Phase 1: The fixed signature (a gate: nothing else starts until it passes)

- [x] T001 Make the "Slash Voice" code-signing certificate, valid ten years, in the founder's login keychain (made from Terminal at his request on 2026-11-18; exported for GitHub in T004)
- [x] T002 Build twice with the certificate; confirm the two builds share one designated requirement; the founder installs the first, grants permissions, installs the second, and dictates (`quickstart.md` §1). If it fails: stop and put the Apple Developer ID choice to the founder
- [x] T003 Record the result and memory before (`research.md` R1, `baseline` section of `plan.md`)

## Phase 2: Keys and checks

- [ ] T004 **(founder)** Make the update key (`bun run tauri signer generate -w ~/.tauri/slash-voice.key`); put the four secrets into GitHub with `gh secret set`; save the key and passwords in the password manager
- [ ] T005 Look checks (`tests-look/updates.test.ts`): `tauri.conf.json` has one updater endpoint, on our repository, our public key and not Handy's, `createUpdaterArtifacts` on; `SLASH_VOICE_HAS_RELEASE_FEED` is true; the workflow reads the signing secrets only when started by hand, never prints them, and writes `latest.json`
- [ ] T006 Rust tests for `updates.rs`: a file signed with another key is refused and deleted; `restart_to_update` is refused while recording or transcribing; nothing is fetched when checks are off; a waiting update is read from the cache, not held in memory. A throwaway test key and a signed fixture are committed for the first test; the test key signs nothing else

## Phase 3: Build

- [ ] T007 `src-tauri/src/updates.rs`: check at launch and every 6 hours; download, verify, write to cache; `update-ready` and `update-failed` events; `get_update_state` and `restart_to_update` commands; install at quit (`contracts/app.md`, `data-model.md`)
- [ ] T008 `tauri.conf.json`, `settings.rs`, `lib.rs`: our key and feed, update files on, the switch on, the module started, the quit hook
- [ ] T009 The window: `UpdateNotice` in the sidebar's foot; an Updates group on About with the check switch (moved from Debug), the state and Restart; text in English and Arabic
- [ ] T010 `release.yml`: Mac signing from secrets on the Mac job; update signing on both; the release job writes `latest.json` (`contracts/feed.md`) and attaches the `.sig` files; release notes say releases are now ordinary releases

## Phase 4: Review and release

- [ ] T011 Gate: `bun run check`, `bun run security`, `bun run tauri build --bundles app`; memory after
- [ ] T012 Second review by Codex (read only) of the updater, the workflow and the secrets' handling; fix what it finds
- [ ] T013 One pull request; the founder reviews and merges (second review, `RULES.md` §3)
- [ ] T014 Version 0.2.0; the release workflow builds it; the founder publishes it as an ordinary release; the download page links to it
- [ ] T015 Verify (`quickstart.md` §3 to §7): 0.2.0 on the founder's Mac and Windows PC, then a small 0.2.1 that reaches both by update

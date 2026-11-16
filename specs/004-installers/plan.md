# Implementation Plan: Installers built by the pipeline

**Branch**: `task/004-installers` | **Spec**: `spec.md`

## Summary

One workflow, `.github/workflows/release.yml`, adapted from Handy's `build.yml` and `release.yml` (removed in `specs/003-open-source`; the originals are in the history at commit `1472087`). It keeps the steps Handy needs to build on Windows and Mac and drops signing, Linux, the updater and the third-party release action.

## Shape

| Job       | Runs on                      | Does                                                                                            | Can write |
| --------- | ---------------------------- | ----------------------------------------------------------------------------------------------- | --------- |
| `build`   | `windows-latest`, `macos-26` | Builds one installer, names it, writes its SHA-256, uploads both as a run artifact              | No        |
| `release` | `ubuntu-latest`              | Only when started by hand: gathers the artifacts and creates or refreshes the draft pre-release | Yes       |

Triggers: by hand, and on a pull request that changes the workflow file, so the workflow is itself tested before it reaches `main`. On a pull request only `build` runs.

File names: `slash-voice_<version>_windows-x64-setup.exe`, `slash-voice_<version>_macos-arm64.dmg`, `SHA256SUMS.txt`.

## Taken from Handy's workflow, and why

| Step                                             | Why it is needed                                                                   |
| ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Long paths on Windows                            | Deep build paths                                                                   |
| Vulkan SDK and SPIRV headers on Windows          | The speech engine's Vulkan backend                                                 |
| Locate the VC++ runtime (`HANDY_VC_REDIST_DIRS`) | `build.rs` stages the runtime beside the app so it runs without a separate install |
| The staged-runtime check after the build         | A missing runtime file gives an app that will not start                            |

Dropped: Apple and Azure signing, the updater key, Linux, Windows ARM, Intel Mac, `tauri-apps/tauri-action` (the build is one command; uploading is done with `gh`).

## Rules touched

- `RULES.md` §3, secrets: none used. The only token is the run's own, read-only except in `release`.
- `RULES.md` §3, self-update: off; `createUpdaterArtifacts` stays false.
- `RULES.md` §3, model licences: the bundled silence detector only; see `research.md`.
- `RULES.md` §4, performance: none; no app code changes.
- Supply chain: every action is pinned to a commit. The Vulkan SDK action and `vcpkg` download build tools at run time, as in Handy's workflow; that is accepted and stated here.

## Handy's files touched

None. `README.md` and `CONTRIBUTING.md` lose a download step that is not needed: the silence detector is already in the repository.

## Tests

`tests-look/workflows.test.ts`, written first and seen to fail:

- every action in every workflow is pinned to a full commit;
- the release workflow starts only by hand or from a pull request that changes it;
- its default permission is read-only and only the `release` job may write, and only when started by hand;
- it names no secret;
- the release is created as a draft and a pre-release;
- the bundled silence detector matches the checksum in the catalogue.

What tests cannot show, and how it is checked instead: that the installers build (the pull request's own run), and that they install and dictate (by hand, on each system).

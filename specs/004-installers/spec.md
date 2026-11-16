# Feature Specification: Installers built by the pipeline

**Feature Branch**: `task/004-installers`

**Feature folder**: `specs/004-installers`

**Created**: 2026-11-16

**Status**: Clarified

**Input**: The founder, 2026-11-15: "I want download links for Mac and Windows ... to give to my friends, right now, for testing." Stage 2 of the plan he approved the same day.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - The founder gets installers without owning a build machine for each system (Priority: P1)

The founder starts the release workflow by hand. GitHub's machines build a Windows installer and a Mac disk image from the chosen commit and attach both to a draft release marked as a pre-release. Nobody outside the project sees the release until he publishes it.

**Independent Test**: Start the workflow, wait, open the draft release.

**Acceptance Scenarios**:

1. **Given** the workflow is started by hand, **When** it finishes, **Then** a draft pre-release named after the app's version holds one Windows installer, one Mac disk image and a file of their SHA-256 checksums.
2. **Given** a pull request changes the workflow, **When** its checks run, **Then** both installers are built and kept as downloadable artifacts, and no release is created.
3. **Given** a pull request from a fork, **When** it runs, **Then** it cannot write to the repository or create a release.

### User Story 2 - A friend installs it on Windows (Priority: P1)

A friend downloads the Windows installer, gets past the "unknown publisher" warning, installs, grants the microphone and dictates.

**Independent Test**: On the founder's Windows PC, from the installer the workflow built.

**Acceptance Scenarios**:

1. **Given** the installer, **When** it is run on Windows 11, **Then** Slash Voice installs and opens under that name with our icon.
2. **Given** the app is open, **When** the shortcut is held and released, **Then** the spoken words are typed into the app in front.

### Edge Cases

- The release for this version already exists as a draft: the workflow replaces its files and does not create a second one.
- The release for this version is already published: the workflow stops and says so. A published file is never replaced.
- A build fails on one system: no release is created.

## Requirements _(mandatory)_

### Requirements covered

| Requirement                                             | Defined in                                  | Shown to be met by                               |
| ------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------ |
| Download links for Mac and Windows                      | The founder's instruction                   | Story 1, scenario 1                              |
| Mac and Windows together                                | `AGENTS.md`, "Rules of this repository"     | Both systems build in one workflow               |
| Self-update stays off; no signing key is invented       | `AGENTS.md`; `RULES.md` §3                  | No updater files are produced; no secret is used |
| The pipeline's actions are pinned and its token minimal | `RULES.md` §6, in the style of `checks.yml` | `tests-look/workflows.test.ts`                   |

**Roadmap task**: none; there is no task list yet.

### Gaps found

- **The fallback download server is still Handy's.** Models come from Hugging Face first; when that fails the app falls back to Handy's own server, and five older models download from it directly. Changing that touches model downloads, which needs a second review (`RULES.md` §3), and one of Handy's tests asserts the fallback exists. It is the next task and must be settled before the draft release is published.
- **Model licences.** No speech model is inside the installers except the small silence detector, whose licence was read (`research.md`). The licences of the 73 models offered for download have not been read in full.
- The builds are unsigned, so both systems warn on first launch.
- No Intel Mac build and no Windows ARM build.

## Success Criteria _(mandatory)_

- **SC-001**: One run of the workflow produces both installers and their checksums in a draft pre-release.
- **SC-002**: The Windows installer installs and dictates on the founder's Windows PC.
- **SC-003**: The Mac disk image opens and the app launches on the founder's Mac.
- **SC-004**: The workflow uses no secret other than the run's own token, and only the release job can write.

## Assumptions

- Apple Silicon Macs and 64-bit Intel or AMD Windows are enough for the founder and his friends.
- Version numbers come from `src-tauri/tauri.conf.json`, as before.

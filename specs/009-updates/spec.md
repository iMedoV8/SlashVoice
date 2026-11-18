# Feature Specification: Updates, and permissions that survive them

**Feature Branch**: `task/009-updates`

**Feature folder**: `specs/009-updates`

**Created**: 2026-11-18

**Status**: Clarified

**Input**: The founder, 2026-11-18: "Can we just do updates instead of this reinstalling on Mac and Windows also". He then accepted the recommendation to do it in one task: our own update key, a fixed Mac signature from a free certificate, and a 0.2.0 release with the new look.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - A new version reaches everyone without a download page (Priority: P1)

The founder publishes a release. A friend's Slash Voice, on Mac or Windows, notices it, fetches it, checks it was made by Slash Voice, and installs it. The friend never visits the download page again.

**Why this priority**: It is what the founder asked for. Today every change means sending friends a link and asking them to reinstall.

**Independent Test**: Install release A on the founder's Mac and Windows PC, publish release B, and watch both reach B without a download page.

**Acceptance Scenarios**:

1. **Given** the app is open and a newer release is published, **When** the app next checks, **Then** it finds the release, fetches it, and offers it as described in Story 3.
2. **Given** a fetched update whose signature does not match Slash Voice's update key, **When** the app checks it, **Then** it is thrown away, nothing is installed, and a notice says the update could not be verified.
3. **Given** no newer release, **When** the app checks, **Then** nothing is shown.
4. **Given** the update check is turned off, **When** the app runs, **Then** it never contacts the release feed.

---

### User Story 2 - On a Mac, permissions are granted once (Priority: P1)

The founder grants microphone and accessibility once, to the first version with a fixed signature. Every later version, whether built on his Mac or by the release workflow, and whether installed by an update or by hand, keeps those permissions.

**Why this priority**: Without it, an update on a Mac still asks for permissions again, so updates would not remove the founder's actual pain.

**Independent Test**: Grant permissions to version A, install version B built separately, and dictate without being asked.

**Acceptance Scenarios**:

1. **Given** permissions granted to one build, **When** a later build is installed, **Then** macOS does not ask again and dictation works.
2. **Given** a build made on the founder's Mac and one made by the release workflow, **When** each is installed in turn, **Then** neither asks again.

---

### User Story 3 - An update never interrupts dictation (Priority: P1)

An update is installed only when it cannot cut off something the user is doing. While an update waits, the app says so in one place and the user can see what version they will get.

**Why this priority**: The app is used with its window closed while the user talks to other apps. A restart mid-dictation loses words.

**Acceptance Scenarios**:

1. **Given** a fetched update, **When** the user is recording or a transcription is running, **Then** nothing restarts.
2. **Given** a fetched update, **When** it is offered, **Then** the sidebar's foot shows "Version N is ready" with a Restart button; pressing it installs the update and reopens the app. If the user never presses it, on a Mac the update is installed the next time the app is quit (founder, 2026-11-18). On Windows it waits for Restart, because the Windows installer reopens the app when it finishes and a quit must not do that (found in the second review; to be confirmed by the founder).
3. **Given** an update is waiting, **When** the user opens the window, **Then** the sidebar's foot and the About page say which version is ready.

---

### User Story 4 - Friends move to the new look (Priority: P2)

Release 0.2.0 carries direction C and is the first release that can update itself. Friends on 0.1.0 install it by hand once; from then on they update without the download page.

**Acceptance Scenarios**:

1. **Given** 0.2.0 is published, **When** the download page is opened, **Then** its buttons fetch 0.2.0.
2. **Given** 0.2.0 is installed, **When** 0.2.1 is later published, **Then** 0.2.0 updates itself to it.

### Edge Cases

- **Offline, or the feed cannot be reached:** the check fails quietly and tries again later. No notice for a failed check.
- **A download is cut off:** the partial file is discarded; the next check starts again.
- **A published release has no update files** (for example, made by hand): the app ignores it.
- **The update key is lost:** no new update can be signed. Installed apps keep working and must be reinstalled by hand once with a new key. The plan says where the key's backup lives.
- **The certificate expires or is replaced:** Macs would ask for permissions once more. The certificate is made to last at least ten years.
- **A Windows install the user does not have rights to write to:** the update fails with a notice; the app keeps working.
- **Portable Windows installs:** do not check for updates at all in this task, since they cannot be replaced in place; they update by hand as before. (Changed after the second review: Handy's dialog for them lived in the removed bottom bar.)
- **Debug or development builds:** never check for or install an update.
- **Windows and quitting:** the Windows installer reopens the app when it finishes, so on Windows a waiting update is installed only by Restart, never at quit. If the user quits instead, it is fetched and offered again after the next launch.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The app checks Slash Voice's own release feed, and only that feed, when it starts and then every few hours while it runs.
- **FR-002**: An update is installed only if its signature matches Slash Voice's update key, which the app carries. Handy's key, which the app carries today, is removed.
- **FR-003**: The secret half of the update key and of the signing certificate never enter the repository, a log or a build artifact. They live in the release workflow's secret store and in one backup the founder keeps.
- **FR-004**: Every Mac build made by the release workflow, and every build the founder makes on his Mac, carries the same signature.
- **FR-005**: The release workflow publishes, with each release, the installers people download by hand, the update files, their signatures, and the feed that describes them.
- **FR-006**: An update never restarts the app while it is recording or transcribing, and no new dictation or file transcription starts once an install has begun. It is installed when the user presses Restart, or else, on a Mac, when the app is next quit.
- **FR-007**: The user can see whether update checks are on, see a waiting update's version, and turn checks off, on the About page. The control moves there from the Debug page.
- **FR-008**: When checks are off, the app makes no request to the release feed.
- **FR-009**: A failed check is silent; a failed or unverified update shows one notice.
- **FR-010**: Release 0.2.0 is built and published by the release workflow with the new look, and the download page links to it.

### Requirements covered

| Requirement                                         | Defined in                                             | Shown to be met by                                                       |
| --------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------ |
| Updates instead of reinstalling, Mac and Windows    | The founder, 2026-11-18                                | Stories 1 and 4                                                          |
| Installed on Restart, or at the next quit           | The founder, 2026-11-18                                | Story 3, scenario 2; FR-006                                              |
| Self-update only with Slash Voice's own signed feed | `AGENTS.md`, "Rules of this repository"; `RULES.md` §3 | FR-001, FR-002                                                           |
| Second review of any change to the updater          | `RULES.md` §3                                          | A review by a second coding program and by the founder before merge      |
| Secrets never in the repository, logs or fixtures   | `RULES.md` §3                                          | FR-003; the secret scan                                                  |
| No telemetry                                        | `AGENTS.md`; `RULES.md` §3                             | The check sends no data about the user beyond the request itself; FR-008 |
| Mac and Windows together                            | `AGENTS.md`                                            | Story 1 is tested on both                                                |

**Roadmap task**: none; there is no task list yet.

### Gaps found

- **Whether macOS keeps permissions for an app signed with a free, self-made certificate across builds** is expected but not verified. The plan tests it first, on the founder's Mac, before anything else is built. If it does not hold, the fallback is the paid Apple Developer ID ($99 a year), which is the founder's decision.
- **Windows** has no permission reset of this kind, but still shows the "unknown publisher" warning on a first install by hand. Updates installed by the app are expected not to show it; the plan verifies this on the founder's Windows PC.
- **Where the update check lives in the window:** today's update checker was part of the bottom bar, which direction C removed. Story 3 places it in the sidebar's foot and on About.

## Success Criteria _(mandatory)_

- **SC-001**: From the moment a release is published, an open copy of the app on the founder's Mac and on his Windows PC reaches the new version within one check interval, with no download page and no more than one click.
- **SC-002**: After the first install with the fixed signature, the founder grants macOS permissions zero more times across at least two later versions.
- **SC-003**: An update signed with any other key is never installed, shown by a test that offers one.
- **SC-004**: No update restarts the app during a recording or a transcription.
- **SC-005**: The secret scan finds no key or certificate in the repository's history.

## Assumptions

- The free certificate is made on the founder's Mac with the commands the plan gives. He makes the keys and passwords and puts them in GitHub's secret store himself; no agent sees a password or a secret half.
- From 0.2.0, releases are ordinary releases (not pre-releases), because the feed's "latest" address skips pre-releases (`research.md` R4). The feed follows the newest published one.
- Updates come from GitHub Releases on `iMedoV8/SlashVoice`; no server of our own.
- Intel Macs, Windows on ARM and Linux are not covered, as in `specs/004-installers`.

# Feature Specification: Our own look (direction C)

**Feature Branch**: `task/008-own-look`

**Feature folder**: `specs/008-own-look`

**Created**: 2026-11-17

**Status**: Clarified

**Input**: The founder, 2026-11-17: "start building our own look". He chose direction C, "the sidebar", on 2026-11-16; the stills are `design/stills/own-look-c-*` and the record is `design/README.md`, "Direction C".

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Nobody who opens the app recognises Handy (Priority: P1)

The founder opens Slash Voice. It opens on History, not on settings. The sidebar starts with the Slash Voice logo and a line saying whether dictation is ready and which key to hold. Settings read as a group name with one line about it on the left and its rows on the right, without boxes, info buttons or reset buttons on every row. There is no bar across the foot of the window.

**Independent Test**: Open the app in dark and light, English and Arabic, and compare each page with its still.

**Acceptance Scenarios**:

1. **Given** the app is opened, **When** the window appears, **Then** History is shown.
2. **Given** any page, **When** the sidebar is read, **Then** it shows the logo; a status line ("Ready", the dictation key); History and Words; then General, Models, Post Process, Advanced; About with the version at its foot; and the model in use below that.
3. **Given** any settings page, **When** it is read, **Then** each group has its name and one line on the left and its rows on the right, and no row has an info or reset button.
4. **Given** the window, **When** its foot is looked at, **Then** there is no bar; a notice the bar used to show is still shown, in the sidebar's foot.

### User Story 2 - Each page does what it did, in the new shape (Priority: P1)

| Page         | What it shows                                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| History      | Dictations as a log grouped by day: time and text. Copy, save, play, retry and delete appear on the row under the pointer or keyboard focus. Search. Transcribe file |
| Words        | Your own words, moved here from Advanced: add, remove, search                                                                                                        |
| General      | Shortcut (dictate, behaviour as a three-part switch, cancel), Appearance (theme, app language, moved here from About), Languages, Sound                              |
| Models       | On this computer (the selected one marked, delete), for your languages (download, progress, cancel), and the rest folded under "Untested"                            |
| Post Process | Today's settings, in the new layout                                                                                                                                  |
| Advanced     | Today's settings, with its groups as a jump control in the header                                                                                                    |
| About        | Version, links, data and log folders, the "Built on Handy" credit                                                                                                    |

**Acceptance Scenarios**:

1. **Given** any control that exists today, **When** the new page is used, **Then** the control is there and behaves as before. Nothing is removed except the bottom bar and the per-row info and reset buttons.
2. **Given** a part of a still that needs a feature not built (the app a dictation went into, corrections, word packs, a "fix last dictation" key), **When** the page is built, **Then** that part is left out, not drawn as empty or "coming soon".

### User Story 3 - The recording pill wears Slash's dress (Priority: P2)

The pill keeps today's form: a dot, nine upright bars, the cancel button, the optional timer, and a spinner with a word while it works. Its surface, hairline and type become Slash's. The dot is grey while the microphone gets ready and the accent from the moment it listens; the spinner is the accent. "Needs attention" is an amber outline with a triangle.

**Acceptance Scenarios**:

1. **Given** dictation starts, **When** the microphone is listening, **Then** the dot is the accent and the bars follow the voice in the text colour.
2. **Given** transcribing or a model loading, **When** the pill shows it, **Then** the spinner is the accent. Red is never used.
3. **Given** reduced motion, **When** the pill shows, **Then** the bars hold one height and the spinner does not turn.

### Edge Cases

- The model in use is not downloaded, or is downloading: the sidebar's foot says so, as the bottom bar did.
- A long dictation in History: it folds as today.
- Arabic: every page runs right to left; key caps, model names, paths and code stay left to right.
- Windows: the page layout is the same; the window's own frame is the system's.

## Requirements _(mandatory)_

### Requirements covered

| Requirement                              | Defined in                                  | Shown to be met by                                |
| ---------------------------------------- | ------------------------------------------- | ------------------------------------------------- |
| The app's look is direction C            | The founder, 2026-11-16; `design/README.md` | Stories 1 to 3; screenshots against the stills    |
| Only what works is shown                 | The founder, 2026-11-17                     | Story 2, scenario 2                               |
| Sidebar top: logo, then a status line    | The founder, 2026-11-17                     | Story 1, scenario 2                               |
| The page keeps the name "Post Process"   | The founder, 2026-11-17                     | Story 1, scenario 2                               |
| Delivered as one change                  | The founder, 2026-11-17                     | One pull request                                  |
| The accent on the pill's dot and spinner | The founder, 2026-11-16; `DESIGN.md`        | Story 3; the look contract and its check, updated |
| English and Arabic, light and dark       | `AGENTS.md`; `RULES.md` §2                  | Screenshots in all four                           |
| No text literals in components           | `AGENTS.md`                                 | The linter; the translation check                 |
| Never weaken a test                      | `RULES.md` §2                               | The test counts before and after                  |

### Gaps found

- No still exists for the Debug page, Arabic on pages other than History and Words, or onboarding in this look. Debug and onboarding keep their layout and take the new type and colours from the shared parts.
- The light-mode contrast misses recorded in `DESIGN.md` carry over.

## Success Criteria _(mandatory)_

- **SC-001**: Each of the eight stills is matched in dark, by eye, on the founder's Mac, with every difference listed in the pull request.
- **SC-002**: No control that exists today is lost; a list of today's controls is ticked against the new pages.
- **SC-003**: The Rust tests and the look checks pass with no test removed; memory with no model loaded stays under 150 MB.

## Assumptions

- The status line says "Ready" when dictation can start, and the state otherwise (the model loading or missing), with the dictation key.
- Windows is checked from the installer the release workflow builds.

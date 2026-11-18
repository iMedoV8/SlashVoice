# Feature Specification: A Home page, and Appearance shown as pictures

**Feature Branch**: `task/010-home-appearance`

**Feature folder**: `specs/010-home-appearance`

**Created**: 2026-11-18

**Status**: Clarified

**Input**: The founder, 2026-11-18, with screenshots of another dictation app: "We want to make a homepage in our app, and do we want to add appearance customizations like this for recording window and the theme". He accepted the recommendation the same day: a Home page with only numbers that can be truly calculated, a getting-started list and what's new; theme and recording pill as picture cards; stills first.

**Changes a decision**: direction C (founder, 2026-11-16) opens on History and has no Home page. This adds Home as the first page and the page the app opens on.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Home shows what dictation has done for me (Priority: P1)

The founder opens Slash Voice and lands on Home. It shows, for all time on this computer: words dictated, dictations, average speaking speed, and an estimate of time saved, each with the way it is worked out a click away. Below that, the shortcut to hold, and the last few dictations with a link to History.

**Acceptance Scenarios**:

1. **Given** the app is opened, **When** the window appears, **Then** Home is shown, and it is first in the sidebar.
2. **Given** dictations since this version was installed, **When** Home is read, **Then** the words, the number of dictations, the speaking speed (words ÷ minutes of recording) and the time saved (the time those words take to type at 40 words a minute, minus the time spent recording) match what was dictated.
3. **Given** a fresh install, **When** Home is read, **Then** the numbers show zero with a line saying they count from now, not a made-up figure.
4. **Given** History keeps only a few entries, **When** old entries are removed, **Then** the totals on Home do not go down.

### User Story 2 - Getting started (Priority: P2)

A friend in their first days sees a short list: try the shortcut, add your words, pick a model for your languages. Each item ticks itself when done and links to the place to do it. Once all are done, or the user hides it, the list goes away.

### User Story 3 - What's new (Priority: P3)

After an update, Home shows the notes of the version now installed, from the release, with a link to the release page. It respects "Show what's new after an update".

### User Story 4 - Appearance as pictures (Priority: P1)

On General, Appearance shows the theme as three small pictures of the window (System, Light, Dark) and the recording pill as three small pictures of our own pill (Live, Minimal, None). Choosing one changes the setting as the switch and the menu do today. The pill's position (top or bottom) stays a plain choice beside it.

**Acceptance Scenarios**:

1. **Given** General, **When** a theme picture is chosen, **Then** the window changes at once and the choice is saved.
2. **Given** General, **When** a pill picture is chosen, **Then** the next dictation shows that pill, and None shows no pill.
3. **Given** a keyboard, **When** the pictures are reached with Tab and arrows, **Then** each can be chosen, and its name is read out.

### Edge Cases

- **No dictations yet:** zeros, and "Counts from today".
- **A dictation with no words** (cancelled, empty): not counted.
- **Files transcribed from History:** counted as words, not as dictations, and not in speaking speed or time saved, since nobody spoke them live.
- **Very short recordings** would make speed meaningless: speed shows once at least one minute of speech is counted.
- **Arabic:** numbers and speed read right to left; the pictures mirror; key caps stay left to right.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Home is the first page and the page the app opens on.
- **FR-002**: The app keeps running totals on this computer: dictations, words, and seconds of recording. Only these counts are kept: no text, no app names, no times of day.
- **FR-003**: Totals count from the version that adds them; earlier dictations are not counted. (History cannot seed them: it keeps no recording lengths, and only the last few entries.)
- **FR-004**: Time saved uses an assumed typing speed of 40 words a minute, which Home states.
- **FR-005**: Theme and recording pill on General are shown as pictures and change the existing settings (`theme`, `overlay_style`); no new setting.
- **FR-006**: The "Overlay" menu leaves Advanced; overlay position stays, beside the pill pictures.
- **FR-007**: Getting started and What's new only show what is true: a step ticks only when it was done; notes come from the installed version's release.

### Requirements covered

| Requirement                                         | Defined in                                                    | Shown to be met by                                |
| --------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| A Home page                                         | The founder, 2026-11-18                                       | Stories 1 to 3                                    |
| Appearance as pictures                              | The founder, 2026-11-18                                       | Story 4                                           |
| Only numbers that can be calculated                 | The founder, 2026-11-18; `AGENTS.md` ("never invent numbers") | FR-002 to FR-004; Story 1, scenario 3             |
| Never log dictation text; nothing leaves the device | `RULES.md` §3                                                 | FR-002: counts only, stored locally               |
| Our own look, not another app's                     | `DESIGN.md`; the founder                                      | Stills drawn in direction C, approved before code |
| English and Arabic, dark and light                  | `AGENTS.md`; `RULES.md` §2                                    | Stills in dark, light and Arabic                  |

### Gaps found

- **"Apps used"**, which the other app shows, needs the app each dictation went into. Slash Voice does not record that (left out in `specs/008-own-look` for privacy). Not in this task.
- **Release notes inside the app** need a way to fetch the installed version's notes; the update feed carries only "See the release page" today (`specs/009-updates/contracts/feed.md`). The plan decides whether the feed carries the notes.

## Success Criteria _(mandatory)_

- **SC-001**: The stills for Home (dark, light, Arabic) and Appearance (dark, light) are approved by the founder before any code.
- **SC-002**: After ten dictations, every number on Home can be recomputed by hand from those dictations and matches.
- **SC-003**: Every Appearance choice is reachable and usable by keyboard alone.

## Assumptions

- 40 words a minute is a common figure for typing; it is stated on Home, not hidden.
- The app opens on Home even when the window was last left on another page.

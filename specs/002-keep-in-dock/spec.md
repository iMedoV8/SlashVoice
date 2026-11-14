# Feature Specification: Keep the app in the Dock

**Feature Branch**: `task/002-keep-in-dock` (stacked on `task/001-slash-look`)

**Feature folder**: `specs/002-keep-in-dock`

**Created**: 2026-11-15

**Status**: Clarified

**Input**: The founder, 2026-11-15: "keep it in the dock always".

## User Scenarios & Testing _(mandatory)_

### User Story 1 - The app is always in the Dock (Priority: P1)

The founder closes the Slash Voice window. Today the app then leaves the Dock and lives only in the menu bar, where a menu-bar manager can hide it, so it looks as if the app has gone. After this change it stays in the Dock, and clicking its Dock icon brings the window back.

**Independent Test**: Open the app, close its window, look at the Dock, click the icon.

**Acceptance Scenarios**:

1. **Given** the window is open, **When** the founder closes it, **Then** the Slash Voice icon stays in the Dock and dictation keeps working.
2. **Given** the window is closed, **When** the founder clicks the Dock icon, **Then** the window opens.
3. **Given** the app is set to start hidden, **When** it launches, **Then** its icon is in the Dock even though no window is shown.
4. **Given** the menu-bar icon is turned on, **When** the window is closed, **Then** the menu-bar icon is still there too.

### Edge Cases

- The menu-bar icon is turned off: the app already kept its Dock icon in that case; nothing changes.
- Windows and Linux have no Dock; nothing changes there.

## Requirements _(mandatory)_

### Requirements covered

| Requirement                                     | Defined in                      | Shown to be met by                                                 |
| ----------------------------------------------- | ------------------------------- | ------------------------------------------------------------------ |
| The app stays in the Dock at all times on macOS | The founder's instruction above | Scenarios 1 to 3; test `keeps_dock_icon_when_window_hides_to_tray` |

**Decisions relied on**: none beyond the instruction. This changes Handy's behaviour, which hides the Dock icon whenever the window is closed and a menu-bar icon exists.

**Roadmap task**: none; there is no task list yet.

### Gaps found

None.

## Success Criteria _(mandatory)_

- **SC-001**: After the window is closed, the Dock icon is present in 100% of tries.
- **SC-002**: A click on the Dock icon opens the window.
- **SC-003**: Handy's tests give the same result as before, plus the new test.

## Assumptions

- No setting is added: the founder asked for "always".

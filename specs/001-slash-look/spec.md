# Feature Specification: The Slash look

**Feature Branch**: `task/001-slash-look`

**Feature folder**: `specs/001-slash-look`

**Created**: 2026-11-14

**Status**: Clarified 2026-11-14

**Input**: User description: "Replace Handy's look with the approved Slash Voice look: the Slash colours, typefaces and component styles; logo option B; the slash-with-arcs app icon; menu-bar and tray icons for four states; and the welcome, permissions and General settings screens rebuilt to match the approved stills. Behaviour, text and tests unchanged."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - The app looks like Slash Voice when it opens (Priority: P1)

The founder opens Slash Voice for the first time. The welcome screen, the permissions screen and, after setup, the main window with the General settings look like the stills he approved: the Slash greys, the one orange-red accent on the main action, the Onest typeface, hairlines instead of boxes, and the "/Slash Voice" logo with "Voice" set lighter. Nothing on screen recalls Handy: no pink, no mascot, no hand.

**Why this priority**: This is what the founder asked for and what his friends will see first. Without it the app reads as a renamed copy of another product.

**Independent Test**: Open a fresh install, walk the first two onboarding steps, finish setup, and open General. Compare each screen with its still at the same window size.

**Acceptance Scenarios**:

1. **Given** a fresh install in dark mode, **When** the welcome screen appears, **Then** it matches `design/stills/04-welcome.png`: step marks, the language menu, the logo, the heading, the language picker with the chosen languages on top, and one accent button, Continue.
2. **Given** the permissions step with the microphone allowed and accessibility not yet allowed, **When** the screen appears, **Then** it matches `design/stills/05-permissions.png`: the microphone row shows a green tick and "Allowed", the accessibility row carries the one accent button, and Continue is visibly unavailable.
3. **Given** setup is finished, **When** the main window opens on General, **Then** it matches `design/stills/06-general-settings.png`: the navigation column with the logo and the selected row in the selected tint, and the settings as labelled rows divided by hairlines.
4. **Given** any of the three screens, **When** a person looks for Handy's pink, its mascot, its hand icon or its wordmark, **Then** none is present.
5. **Given** a switch that is on, a selected segment, a chosen language and a primary button on the same screen, **When** the founder looks at where the accent appears, **Then** it is only on the primary button and on the switch that is on.

---

### User Story 2 - The app is recognisable outside its window (Priority: P2)

With the window closed, which is how the app is used almost all the time, the founder can find Slash Voice in the Dock or taskbar by its icon, and can tell from the menu bar or tray what it is doing: idle, recording, transcribing, or needing his attention.

**Why this priority**: The window is for setup. The icon and the menu-bar mark are the product's presence during real use.

**Independent Test**: Install the build, look at the Dock or taskbar icon, then start a dictation and watch the menu-bar mark through recording and transcribing; then revoke a permission and look again.

**Acceptance Scenarios**:

1. **Given** the app is installed, **When** its icon is shown at 32, 64 and 160 points, **Then** it is the slash with two sound arcs as in `design/stills/02b-app-icon-chosen.png`, with no purple.
2. **Given** a dark menu bar and a light menu bar, **When** the app is idle, recording, transcribing or needs attention, **Then** the mark matches `design/stills/03-menu-bar-icon-states.png` for that state and that bar.
3. **Given** the app is recording or transcribing, **When** the founder looks at the mark, **Then** it is in the bar's text colour and is neither red nor the accent.
4. **Given** the four state marks shown without colour, **When** a person compares them, **Then** each can be told from the others by shape alone.

---

### User Story 3 - Nothing else changed (Priority: P3)

A friend who already set the app up updates to the build with the new look. Every setting is where it was and does what it did, dictation works as before, and the app reads correctly in every language it had, Arabic included.

**Why this priority**: The look must not cost behaviour. A restyle that breaks a shortcut or a translation is a regression.

**Independent Test**: Run the existing checks; then use the app in English and in Arabic and exercise each control on the three screens.

**Acceptance Scenarios**:

1. **Given** the existing automated checks, **When** they run on the new build, **Then** the same tests pass as before and none was removed, weakened or skipped.
2. **Given** the menus set to Arabic, **When** each of the three screens is shown, **Then** the layout is mirrored, the text is readable in the Arabic typeface, and no control overlaps or is cut off.
3. **Given** each control on the three screens (language picker, permission buttons, shortcut fields, shortcut behaviour, preferred languages, model, microphone, input channel, mute, audio feedback, output device, volume), **When** it is used, **Then** it does what it did before.
4. **Given** the screens outside this task (History, Models, Advanced, Post Process, About, the later onboarding steps), **When** they are opened, **Then** they use the new colours and type, remain usable, and show no pink.
5. **Given** the app is running, **When** its network activity is observed while the three screens are opened, **Then** nothing is fetched for fonts, icons or styling.

---

### Edge Cases

- A long translation in a button, a segment of the shortcut-behaviour switch or a navigation label: the control grows or the text wraps; it is never cut off.
- A language whose letters the interface typeface lacks (Chinese, Japanese, Korean, Arabic, Greek): the name still renders, in a fallback typeface.
- The app needs attention while it is recording: the recording mark is shown, as today; the attention mark returns when it is idle.
- The system menu bar changes between light and dark while the app runs: the mark follows.
- The system cannot show a different app icon in light mode: the dark-mode icon is used everywhere.
- A setting that is unavailable (the volume when audio feedback is off): it is visibly dimmed, not hidden.
- The window at its smallest allowed size: nothing on the three screens is cut off.

## Requirements _(mandatory)_

### Requirements covered

There is no requirements document yet (`AGENTS.md`, "Build order"), so this task links to the founder's recorded decisions and the approved stills.

| Requirement                                                              | Defined in                                                                                                     | Shown to be met by         |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | -------------------------- |
| The app takes the Slash theme                                            | `DESIGN.md`, "What is taken from the Slash brand"; `../Slash/DESIGN.md` Colors, Typography, Shapes, Components | Story 1, scenarios 1 to 5  |
| Logo option B                                                            | `DESIGN.md`, "Decided by the founder (2026-11-13)"; still `01-logo-options.png`                                | Story 1, scenarios 1 and 3 |
| App icon: the slash with two sound arcs, in the decided colours          | `DESIGN.md`, "Decided by the founder (2026-11-13)"; still `02b-app-icon-chosen.png`                            | Story 2, scenario 1        |
| Menu-bar and tray marks for four states                                  | Still `03-menu-bar-icon-states.png`, approved 2026-11-13                                                       | Story 2, scenarios 2 to 4  |
| The three screens                                                        | Stills `04-welcome.png`, `05-permissions.png`, `06-general-settings.png`, approved 2026-11-13                  | Story 1, scenarios 1 to 3  |
| Running work is never red or the accent                                  | `../Slash/DESIGN.md`, Colors; `DESIGN.md`, "Don't"                                                             | Story 2, scenario 3        |
| Never ship Handy's name, logo, icon or mascot                            | `AGENTS.md`, "Rules of this repository"; constitution V                                                        | Story 1, scenario 4        |
| All visible text stays in the locale files; English and Arabic both work | `AGENTS.md`, "Rules of this repository"; constitution VI                                                       | Story 3, scenario 2        |
| No test is deleted, weakened or skipped                                  | `RULES.md` §2; constitution II                                                                                 | Story 3, scenario 1        |
| Nothing is fetched from the network for the look                         | `RULES.md` §3; constitution III                                                                                | Story 3, scenario 5        |
| Memory with no speech model loaded stays under the proposed target       | `RULES.md` §4                                                                                                  | Success criterion SC-006   |

**Decisions relied on**:

- Design document §3, decision 9: built on a renamed copy of Handy, with the screens, look and features ours.
- Design document §3, decision 14: Handy's visible layer is replaced early.
- `DESIGN.md`, "Decided by the founder (2026-11-13)": logo B, the slash-with-arcs icon and its colours.
- The founder's approval of the menu-bar marks and the three screens on 2026-11-13 ("Approved, build it").

**Roadmap task**: none. There is no task list yet; `001` is this folder's number, not a task ID.

### Gaps found

- Light mode: settled by the founder on 2026-11-14. Light mode is built now from the light values in `../Slash/DESIGN.md`, and he approves real screenshots of it before the change is merged. No light still was drawn.
- The stills show English only. `RULES.md` §2 asks for screenshots in English and Arabic, light and dark. Arabic is covered by Story 3, scenario 2, without an approved Arabic still.
- Contrast in light mode: two of the brand's own light values fall short of 4.5 to 1 (tertiary text on the window, about 4.2; white text on the accent, about 3.5). `../Slash/DESIGN.md` says its values were not contrast-tested. They are used as they are and reported; SC-003 is therefore met for primary and secondary text in both modes and for all text in dark mode, and not fully in light mode.
- In dark mode the icon's arcs were drawn two ways. This spec takes the version shown as the main one (the whole mark in the accent), since the founder approved the stills without choosing the alternative.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: For each of the three screens, placed beside its still at the same size, the founder can point to no difference in layout, colour or type other than the sample values listed in `design/README.md`.
- **SC-002**: Across every screen and every icon the app ships, there are zero uses of Handy's pink, of purple, of a gradient or glow, or of Handy's mascot, hand or wordmark.
- **SC-003**: Body text on the three screens has a contrast of at least 4.5 to 1 against its background, and large text at least 3 to 1.
- **SC-004**: Each of the four menu-bar states is correctly named by a person shown the marks at real size without colour.
- **SC-005**: The existing automated checks give the same result as before the change: 346 passing, 20 skipped as upstream marks them, none removed.
- **SC-006**: With no speech model loaded, the app's memory stays under 150 MB, measured before and after the change (baseline 112 to 126 MB).
- **SC-007**: Opening the three screens causes zero network requests.

## Assumptions

- Built and checked on the Mac. The Windows build does not exist yet, so the Windows window, taskbar icon and tray marks are produced but not verified.
- The screens outside this task inherit the new colours and type and are not redesigned here; they may look plainer than the three redrawn screens until their own stills are approved.
- The recording overlay is out of scope and keeps its current shape, in the new colours.
- The sample values in the stills (the microphone name, the model shown) are replaced by the real values on the user's machine.
- The typefaces named in `../Slash/DESIGN.md` may be bundled with the app; their licences are confirmed in the plan before they are added.
- Internal names stay Handy's, so components keep names such as `HandyTextLogo`.
- The rename and the project setup were committed to `main` on 2026-11-14 with the founder's go-ahead, and this task's branch starts from that commit.

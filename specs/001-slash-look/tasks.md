# Tasks: The Slash look

**Input**: `specs/001-slash-look/` (spec.md, plan.md, research.md, contracts/look-tokens.md, quickstart.md)

**Tests**: mandatory and written first (constitution II). Each test is run and seen to fail before the code that makes it pass.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel (different files, no dependency)
- **[Story]**: US1 the look in the window, US2 outside the window, US3 nothing else changed

## Phase 1: Setup

- [x] T001 Record the baseline before any change: memory of the release build with no model loaded, and the app's size, in `specs/001-slash-look/baseline.md`
- [x] T002 Add the three typeface packages to `package.json` (`@fontsource-variable/onest`, `@fontsource-variable/jetbrains-mono`, `@fontsource/ibm-plex-sans-arabic`) and confirm each ships its OFL-1.1 licence text
- [x] T003 Add the script `test:look` (`bun test tests-look`) to `package.json` and run it from `check:screens`

## Phase 2: Foundational (the checks every story depends on)

**Tests, written first and seen to fail on today's pink theme**

- [x] T004 [P] `tests-look/tokens.test.ts`: every colour in `contracts/look-tokens.md` has that value in `src/styles/theme.css`, for dark and for light
- [x] T005 [P] `tests-look/contrast.test.ts`: each pair in the contract's contrast table meets its ratio, with tints composited over the window
- [x] T006 [P] `tests-look/banned.test.ts`: none of the banned colours, and no gradient, appears in `src/`, `index.html` or `branding/`
- [x] T007 [P] `tests-look/offline.test.ts`: no stylesheet in `src/` and no page names an `http` or `https` address for a font, image or style
- [x] T008 [P] `tests-look/assets.test.ts`: all twelve tray images exist at 64 by 64 with a source in `branding/tray/`; `branding/app-icon.svg` uses only the dark ground and the accent

**Implementation**

- [x] T009 Swap the palette in `src/styles/theme.css` to the contract's values for dark and light; add the `accent`, `on-accent`, `selected`, `sunken` and `info` tokens; point `logo-primary` and `plum` at the primary text colour; remove the pink values (makes T004, T005 and part of T006 pass)
- [x] T010 Import the three typefaces in `src/main.tsx`; set the interface, code and Arabic stacks, the sizes and the corners in `src/App.css` (makes T007 pass)

**Checkpoint**: the whole app is in the Slash colours and type; nothing is rebuilt yet.

## Phase 3: User Story 1 — The app looks like Slash Voice when it opens (P1)

**Goal**: the welcome, permissions and General screens match stills 04, 05 and 06.

**Independent test**: quickstart section 3, in dark mode and English.

### Tests for User Story 1 (written first)

- [x] T011 [US1] Extend `tests-look/banned.test.ts`: the welcome screen's source no longer uses the mascot, and no component outside the primary button and the switch uses the `accent` token as a fill

### Implementation for User Story 1

- [x] T012 [P] [US1] Logo option B in `src/components/icons/HandyTextLogo.tsx`: the slash in the accent at weight 800, "Slash" at 700, "Voice" at 400 in the secondary text colour; the name not translated
- [x] T013 [P] [US1] The slash-with-arcs mark in one colour in `src/components/icons/HandyHand.tsx`
- [x] T014 [P] [US1] Controls to the stills in `src/components/ui/`: `Button` (primary on the accent with `on-accent` text; secondary a raised tint with a hairline; quiet text only), `ToggleSwitch` (on is the accent), `Select` and `Dropdown` (hairline, corner 8), `Slider` (neutral fill), `SettingsGroup` and `SettingContainer` (plain group label; rows divided by hairlines, no boxes)
- [x] T015 [US1] Welcome screen to still 04 in `src/components/onboarding/OnboardingShell.tsx` and `screens/Welcome.tsx`: step marks, the language menu, the logo without the tile, the heading, the picker with chosen languages on top, one accent button (makes T011 pass)
- [x] T016 [US1] Permissions screen to still 05 in `src/components/onboarding/screens/Permissions.tsx`: icon tiles, the green tick and "Allowed", the accent on the first permission still missing, Continue visibly unavailable
- [x] T017 [US1] Navigation column to still 06 in `src/components/Sidebar.tsx`: the logo, Lucide icons, the selected row in the selected tint, the version at the foot
- [ ] T018 [US1] (reopened 2026-11-15: colours and type are done, the structure differs from still 06 in nine ways listed in `findings.md`) General settings to still 06 in `src/components/settings/general/` and the controls it uses: key caps in the code typeface, the shortcut-behaviour switch as a segmented control, language chips, the model row
- [ ] T019 [US1] (captured 2026-11-15: all three screens. General does not match still 06, see `findings.md`; T018 is reopened by that) Build the app and capture the three screens in dark mode and English into `specs/001-slash-look/evidence/`; compare each with its still and fix what differs

**Checkpoint**: Story 1 can be shown to the founder on its own.

## Phase 4: User Story 2 — The app is recognisable outside its window (P2)

**Goal**: the app icon and the menu-bar marks match stills 02b and 03.

**Independent test**: quickstart section 4.

### Tests for User Story 2 (written first)

- [x] T020 [US2] `tests-look/assets.test.ts` already fails on the purple icon and the old tray set (T008); confirm it fails for the right reason before the artwork changes

### Implementation for User Story 2

- [x] T021 [P] [US2] Recolour `branding/app-icon.svg` to the dark ground with the mark in the accent; add `branding/app-icon-light.svg` (accent ground, white mark) as artwork that is not wired in; regenerate `src-tauri/icons/` with `bun run tauri icon`
- [x] T022 [P] [US2] Redraw the twelve images in `branding/tray/` to still 03 (slash alone; slash and dot; slash and the Lucide `loader`; slash and the Lucide `triangle-alert` in amber) for dark and light bars, and regenerate `src-tauri/resources/*.png` (makes T008 and T020 pass)
- [ ] T023 [US2] (partly done: Dock icon captured; the menu-bar marks are not) Build, then check the Dock icon at each size and the menu-bar mark through idle, recording and transcribing; capture them into `specs/001-slash-look/evidence/`

## Phase 5: User Story 3 — Nothing else changed (P3)

**Goal**: same behaviour, same tests, every language still reads correctly.

**Independent test**: quickstart sections 1 and 5.

- [x] T024 [US3] Run `bun run check` and `bun run security`; confirm 346 Rust tests pass and 20 are ignored, with none removed
- [ ] T025 [US3] (captured 2026-11-15: all three screens in all four variants; nothing cut off or unreadable on General) Capture the three screens in light mode, and in Arabic in both modes, into `specs/001-slash-look/evidence/`; fix anything cut off, overlapping or unreadable
- [ ] T026 [US3] Open History, Models, Advanced, Post Process, About and the later onboarding steps; fix anything unusable or still pink, without redesigning them
- [ ] T027 [US3] Use each control on the three screens once and confirm it behaves as before; confirm from the built app's files that every typeface, icon and style it loads is inside the app
- [x] T028 [US3] Measure memory with no model loaded and the app's size again; record both beside the baseline in `baseline.md`

## Phase 6: Finish

- [ ] T029 Update `DESIGN.md`, `design/README.md` and `HANDOFF.md`: what is built, the two contrast findings, the icon-by-mode gap, and the leftover mascot on the later onboarding step
- [ ] T030 Show the founder the evidence, light mode included, for approval before merge
- [ ] T031 Write the pull request body with the `pr` skill and the fields `RULES.md` §6 requires, listing each of Handy's files changed and why

## Dependencies

- T004 to T008 before T009 and T010.
- Phase 2 before every story.
- T014 before T015 to T018. T012 before T015 and T017.
- T021 and T022 are independent of Story 1.
- Phase 5 after Stories 1 and 2.

## Not in these tasks

- A different app icon in light mode (`plan.md`, "What this plan does not deliver").
- The Windows build and its verification.
- The recording overlay, the later onboarding steps and the other settings screens.
- A harness that renders screens under test (`research.md`, R5).

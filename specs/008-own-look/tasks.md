# Tasks: Our own look (direction C)

**Tests first.** Each check is seen to fail before the code that makes it pass.

## Phase 1: Setup

- [ ] T001 Record the baseline: memory with no model loaded; the list of every control on every page today (`controls.md`)
- [ ] T002 Update the look contract and `DESIGN.md` cross-reference for the accent on the pill's dot and spinner

## Phase 2: The frame

- [ ] T003 Checks: sidebar order and opening page; bottom bar not mounted; notices in the sidebar's foot; no info or reset button on a settings row
- [ ] T004 Sidebar: logo, status line, new order, About at the foot, model and notices below it; open on History
- [ ] T005 Remove the bottom bar from the window; move its model picker, status and notice into the sidebar's foot
- [ ] T006 Settings layout: group name and one line on the left, rows on the right; `SettingContainer` without info and reset buttons; page header with actions

## Phase 3: Pages

- [ ] T007 Checks: Custom Words on Words and not on Advanced; theme and language on General and not on About; new text keys in English and Arabic
- [ ] T008 General to still 3
- [ ] T009 History to still 1
- [ ] T010 Words to still 2 (your words only)
- [ ] T011 Models to still 4
- [ ] T012 Post Process to still 5
- [ ] T013 Advanced to still 6
- [ ] T014 About to still 7

## Phase 4: The pill

- [ ] T015 Check: the accent in the overlay only on the dot and the spinner
- [ ] T016 The pill to still 8

## Phase 5: Finish

- [ ] T017 Tick every control in `controls.md` against the new pages
- [ ] T018 Captures: every page in dark and light, English and Arabic; compare with the stills; fix differences
- [ ] T019 Gate: `bun run check`, `bun run security`, the app build; memory after
- [ ] T020 One pull request, with the captures and the list of differences from the stills

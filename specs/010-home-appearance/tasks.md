# Tasks: A Home page, and Appearance shown as pictures

**Tests first.** Each check is seen to fail before the code that makes it pass.

## Phase 1: The counter

- [ ] T001 Rust tests for `stats.rs`: words and seconds add up; an empty dictation is not counted; a file adds words only; totals survive a restart; an unreadable file starts again from zero; the file holds only counts
- [ ] T002 `stats.rs`, the `get_dictation_totals` command, the two hooks; regenerate the bindings

## Phase 2: Home

- [ ] T003 Look checks: Home first in the sidebar and the page the app opens on; Home's numbers come from `getDictationTotals` (speed shown from 60 s, 40 words a minute named); What's new read from the bundled release notes; new text in English and Arabic
- [ ] T004 `HomeSettings.tsx` to still 9, dark, light and Arabic; sidebar and App
- [ ] T005 A `## What's new` section in `.github/release-notes.md`

## Phase 3: Appearance

- [ ] T006 Look checks: theme and pill are picture cards that set `theme` and `overlay_style`; the overlay controls are on General, not Advanced; cards are radio groups usable by keyboard
- [ ] T007 Theme cards and pill cards to still 10; position switch; Advanced loses the overlay rows

## Phase 4: Finish

- [ ] T008 Captures of Home and General in dark, light and Arabic against the stills; list the differences
- [ ] T009 Gate: `bun run check`, `bun run security`, the app build; memory after
- [ ] T010 One pull request

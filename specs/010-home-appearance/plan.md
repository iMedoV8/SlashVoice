# Implementation Plan: A Home page, and Appearance shown as pictures

**Branch**: `task/010-home-appearance` | **Date**: 2026-11-18 | **Spec**: `spec.md` | **Stills**: `design/stills/own-look-c-09-home-*`, `own-look-c-10-appearance-*` (approved 2026-11-18)

## Summary

A small counter in Rust records each finished dictation (words, seconds of recording) and each transcribed file (words) to a file on this computer. Home reads it and works out speed and time saved in the window. The theme and pill controls on General become picture cards over the same settings. Home becomes the first page.

## Technical Context

**Language/Version**: Rust stable; TypeScript, React 18, Tailwind 4

**Primary Dependencies**: none new

**Storage**: `stats.json` in the app's data folder: `{ version, since, dictations, words, seconds, file_words }`. Counts only.

**Testing**: `cargo test` for the counter; `bun test tests-look` for the frame, the cards and the text; captures from the screens preview against the stills

**Target Platform**: macOS, Windows

**Performance Goals**: a dictation's end adds one small file write, off the interface thread

**Constraints**: memory under 150 MB with no model; nothing about the text is stored

## Constitution Check

| Principle                        | How                                                       |
| -------------------------------- | --------------------------------------------------------- |
| Spec first                       | `spec.md`, clarified                                      |
| Design approved before code      | Stills approved 2026-11-18                                |
| Tests first                      | Each task lists its test first                            |
| Our features in their own module | `src-tauri/src/stats.rs`; `src/components/settings/home/` |
| Privacy                          | Counts only; never text, app names or times of day        |

Result: passes.

## Design

```text
src-tauri/src/stats.rs (new)
  record_dictation(app, text, samples)   words = whitespace-separated words; seconds = samples / 16 000
  record_file(app, text)                 words only
  get_dictation_totals (command)         -> { since, dictations, words, seconds, file_words }
  empty text: not counted. Unreadable file: start again from zero, keep the bad file aside.
  hooks: actions.rs, after a dictation is saved to History; transcription_jobs.rs, after a file job

src/components/settings/home/HomeSettings.tsx (new)
  Totals       words + file_words | dictations | words ÷ (seconds/60), shown from 60 s | time saved
  How counted  "since <date>", 40 words a minute
  Getting started (hidden when all done or hidden; the choice is remembered on this computer)
    shortcut tried  = dictations > 0
    words added     = custom words not empty
    model fits      = the model in use hears every spoken language (the Models page's own check)
  What's new   the installed version's note in src/content/whats-new/ (bundled at build time; the
               after-update window reads the same files), in English and Arabic; no network
  Recent       the last three History entries, "All history"

src/components/settings/ThemeSelector.tsx   -> picture cards (SegmentedControl replaced)
src/components/settings/ShowOverlay.tsx     -> pill picture cards + position switch; moves from Advanced to General
src/components/Sidebar.tsx, App.tsx         -> home first; opens on home
```

Time saved = words ÷ 40 minutes − seconds ÷ 60, never below zero. Files count toward words only.

Why release notes are bundled, not fetched: Home must not make a network request (`RULES.md` §3: nothing leaves the device unless chosen).

Changed while building (2026-11-18): the plan first put the notes in a `## What's new` section of `.github/release-notes.md`. The app already had a mechanism for bundled per-version notes, shown after an update. Home uses it, with our notes in `src/content/whats-new/<version>.md` and `<version>.ar.md` for Arabic (Handy's old folder `src/content/release-notes/` stays empty, as `tests-look/public.test.ts` requires). The GitHub release page is not fed from these files yet.

## Rules touched

- `RULES.md` §3: "never log the text of a dictation" holds: only counts are written. No telemetry: the counts never leave the computer. Test: the stats file's keys are exactly the five counts and `version`/`since`.
- `RULES.md` §4: none measurable; one small write per dictation, off the interface thread.
- A decision changes: direction C's "opens on History" (DESIGN.md records it). The check in `tests-look/own-look.test.ts` for the sidebar order is updated to the new order, with the decision named.

## Not in this task

"Apps used"; release notes fetched from the internet; a stats reset button (the founder did not ask; can follow).

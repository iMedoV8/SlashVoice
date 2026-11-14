# Implementation Plan: The Slash look

**Branch**: `task/001-slash-look` | **Date**: 2026-11-14 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-slash-look/spec.md`

## Summary

Replace Handy's look with the approved Slash Voice look, without changing behaviour. The app's colours already come from one token file, so the palette is swapped there for dark and light, and the accent becomes a token of its own that only the main action and an "on" switch use. The three typefaces are bundled with the app. The logo becomes option B, the tile beside it on the welcome screen goes, and the welcome, permissions and General screens are rebuilt to their stills. The app icon and the twelve menu-bar and tray images are regenerated from new artwork.

One part of the founder's decision is not delivered by this task: showing a different app icon in light mode. See "What this plan does not deliver".

## Technical Context

**Language/Version**: TypeScript 5.6 and React 18 for the screens; Rust 1.99 for the backend (two string paths only, see below)

**Primary Dependencies**: Tauri 2.11, Tailwind 4, Vite 6, lucide-react (already present). New: `@fontsource-variable/onest`, `@fontsource-variable/jetbrains-mono`, `@fontsource/ibm-plex-sans-arabic`

**Storage**: N/A. No stored data changes.

**Testing**: `bun test` for the new look checks; `cargo test` (Handy's 346 tests) unchanged; screenshots from the real app as evidence

**Target Platform**: macOS, built and checked. Windows assets are produced and not verified (no Windows build yet).

**Project Type**: desktop app (Tauri), screens in web technology

**Performance Goals**: no change to dictation. Memory with no model loaded stays under 150 MB.

**Constraints**: nothing fetched from the network for the look; all visible text stays in the locale files; internal names stay Handy's; changes to Handy's files are small and explained in the pull request

**Scale/Scope**: one token file, one stylesheet, about twelve components, three logo or mark components, one app-icon source, twelve tray images

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                                     | Check                                                                                                                       | Result                        |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| I. The design document is the source of truth | The spec links to the founder's decisions and the approved stills; it adds no requirement of its own                        | Pass                          |
| II. Tests first                               | The look checks in `tests-look/` are written first and seen to fail on today's pink theme. No existing test is touched      | Pass                          |
| III. Security and privacy are designed in     | Fonts are bundled, never fetched; a check fails if any stylesheet or page names a remote address. Nothing is logged or sent | Pass                          |
| IV. Performance is a requirement              | Memory with no model loaded is measured before and after                                                                    | Pass                          |
| V. Built on Handy, visibly Slash Voice        | Token values and a small set of components change; component and file names stay Handy's; Handy's artwork is not used       | Pass                          |
| VI. Two systems, two languages                | English and Arabic, light and dark are captured on Mac. Windows cannot be checked yet and the pull request says so          | Pass, with Windows unverified |
| VII. Honest by construction                   | What is not delivered (icon by mode) and not verified (Windows) is stated                                                   | Pass                          |
| VIII. Small, deep, in scope                   | Three new dependencies, all typefaces under OFL-1.1, checked below. No new abstraction                                      | Pass                          |

Quality gate 1 (stills approved before code): met on 2026-11-13 for dark. Light mode has no still; the founder chose on 2026-11-14 to approve it from real screenshots before merge.

Re-checked after Phase 1: no change.

## Security: threats touched

There is no threat model document yet. The rules in `RULES.md` §3 are used in its place.

| Rule                                                                 | How this change touches it                            | Response in this design                                                                                 | Test that covers it                                                         |
| -------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| No telemetry or outside requests                                     | Typefaces could be loaded from a font host            | All three are bundled into the app at build time                                                        | `tests-look/offline.test.ts`: no stylesheet or page names an `http` address |
| Dependencies need a licence that allows closed-source commercial use | Three typeface packages are added                     | All are OFL-1.1, which allows bundling in commercial software; the licence text ships with each package | Recorded in `research.md`; reviewed in the pull request                     |
| Never ship Handy's name, logo, icon or mascot                        | The logo, mark, app icon and tray images are replaced | New artwork sources in `branding/`; the mascot is no longer shown                                       | `tests-look/assets.test.ts`: every shipped image has a Slash Voice source   |

**Security rules touched**: no outside requests; dependency licences; Handy's artwork.

**Second review needed**: no. Nothing here changes what leaves the device, where text is typed, the updater, model downloads or secret storage.

## Performance: targets touched

| Target                                                       | Why this change can affect it          | Benchmark or measurement                                                          | Baseline                   | Budget                  |
| ------------------------------------------------------------ | -------------------------------------- | --------------------------------------------------------------------------------- | -------------------------- | ----------------------- |
| Memory, app open with no speech model loaded (`RULES.md` §4) | Three typefaces are loaded             | Resident memory of the release build's main process, window open, no model loaded | 112 to 126 MB (2026-11-12) | Under 150 MB            |
| App size                                                     | Typeface files are added to the bundle | Size of `Slash Voice.app`                                                         | 31 MB (2026-11-12)         | Reported, no budget set |

Dictation speed is not touched: no code on the recording or transcription path changes.

## Test levels used

- **Look checks** (new, `bun test tests-look`): token values for dark and light against `contracts/look-tokens.md`; text contrast; banned colours absent from the screens' source and the artwork; nothing remote in stylesheets; the full set of tray images present at the right size with Slash Voice sources.
- **Unit** (Handy's, `cargo test`): unchanged, must give the same result.
- **Lint and translation checks** (Handy's): no text literal in a component; every locale complete.
- **Visual and language** (manual evidence): screenshots of the three screens from the real app, in dark and light, English and Arabic, compared with the stills. The comparison is by eye; there is no automatic picture comparison.

Not used, and why: there is no way yet to render a screen under test, because the screens call about ninety backend commands and no stand-in for them exists. Building that is its own task (see `research.md`, R5).

## Who does what

| Part      | Done by                    | Brief or review                                  |
| --------- | -------------------------- | ------------------------------------------------ |
| All tasks | Orchestrator (Claude Code) | The founder reviews the screenshots before merge |

Codex is not used on this task.

## Project Structure

### Documentation (this feature)

```text
specs/001-slash-look/
├── plan.md
├── research.md
├── quickstart.md
├── contracts/
│   └── look-tokens.md
├── checklists/
│   └── requirements.md
└── tasks.md            (from /speckit-tasks)
```

No `data-model.md`: this task stores and changes no data.

### Source Code (repository root)

```text
branding/                        artwork sources (new and replaced)
├── app-icon.svg                 dark ground, mark in the accent (the shipped icon)
├── app-icon-light.svg           accent ground, white mark (kept, not wired in)
└── tray/*.svg                   twelve tray images, redrawn to still 03

tests-look/                      new look checks (bun test)
├── tokens.test.ts
├── contrast.test.ts
├── banned.test.ts
├── offline.test.ts
└── assets.test.ts

src/
├── styles/theme.css             token values, dark and light        (Handy's file)
├── App.css                      typeface stacks, sizes, corners     (Handy's file)
├── main.tsx                     imports the bundled typefaces       (Handy's file)
├── components/
│   ├── icons/HandyTextLogo.tsx  logo option B
│   ├── icons/HandyHand.tsx      the slash-with-arcs mark, one colour
│   ├── icons/HandyMascot.tsx    no longer used on the welcome screen
│   ├── Sidebar.tsx              navigation column to still 06
│   ├── onboarding/OnboardingShell.tsx, screens/Welcome.tsx, screens/Permissions.tsx
│   ├── settings/general/GeneralSettings.tsx
│   └── ui/Button, SettingsGroup, SettingContainer, ToggleSwitch, Select, Dropdown, Slider
src-tauri/
├── icons/*                      regenerated from branding/app-icon.svg
└── resources/*.png              twelve tray images, regenerated

package.json                     three typeface packages; `test:look` added to the gate
```

**Structure Decision**: No new module. This is a restyle of Handy's own visible layer, so the changes are in Handy's files; each is listed in the pull request with its reason. The checks live in `tests-look/`, outside `tests/`, because Playwright claims every test file under `tests/`.

## How the palette is swapped

Handy's components name colours by role (`text`, `background`, `line`, `wash`, `ink-2`, `ink-3`, `logo-primary`, `background-ui`, `moss`, `warning`, `error`). Those names stay; their values change. Full table: `contracts/look-tokens.md`.

The one trap is `logo-primary`, Handy's pink highlight, used 87 times for hovers, focus rings and selected states. Pointing it at the accent would paint the accent everywhere, which the brand forbids. It is pointed at the primary text colour instead, so those places become neutral tints, as in Slash. The accent gets its own token and is used only by the primary button and by a switch that is on.

## What this plan does not deliver

- **A different app icon in light mode.** The founder chose the dark-ground icon for dark mode and the accent-ground icon for light mode. This task ships the dark-ground icon everywhere and keeps the light one as artwork. Reason: on macOS a mode-following icon needs an Icon Composer file and applies only from macOS 26; on Windows an app that is not store-packaged has no light and dark icon variants at all, only a runtime workaround. Both findings are field reports, not official documentation (`research.md`, R3). It is proposed as its own task.
- **Windows verification.** No Windows build exists.
- **A redesign of the other screens.** They inherit the palette and type.

## Complexity Tracking

No constitution violations to justify.

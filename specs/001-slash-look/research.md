# Research: The Slash look

Read on 2026-11-14. Code facts are from this repository; web facts name their source and how strong it is.

## R1. Where the colours come from

- **Decision**: Change the token values in `src/styles/theme.css`; keep Handy's token names.
- **Rationale**: Every colour in the screens resolves to a role token defined there as a light and dark pair, switched by the system setting or by `data-theme`. Usage counted in the components: `line` 98, `ink-3` 93, `logo-primary` 87, `ink-2` 50, `wash` 50, `warning` 24, `error` 23, `background-ui` 13, `plum` 13, `moss` 11. Renaming them would touch hundreds of lines of Handy's code for no visible gain and would make merges from `upstream` painful.
- **Alternatives considered**: New Slash-named tokens with every component rewritten to use them (rejected: far larger diff in Handy's files). A second stylesheet overriding the first (rejected: two sources of truth for one colour).

## R2. The accent must not follow `logo-primary` or `background-ui`

- **Decision**: `logo-primary`, `plum` and `background-ui` all take the primary text colour. A new `accent` token carries `#F0532B`, with `on-accent` for text on it, and is used by name only in the primary button, a switch that is on, a selected radio and the logo's slash.
- **Rationale**: `logo-primary` is Handy's pink, used for hovers, focus rings, chips and selected states. `background-ui` is its primary fill, and besides the primary button it fills progress bars, spinners, the current step mark and the volume slider: running work, which the brand never shows in the accent. `../Slash/DESIGN.md` allows the accent on the main action and the current selection only. Making those three tokens neutral turns every such place neutral at once, and the few places that may carry the accent name it explicitly, which `tests-look/banned.test.ts` enforces.
- **Alternatives considered**: Pointing `background-ui` at the accent and changing every progress bar and spinner (rejected: more of Handy's files touched, and a new user of `background-ui` would silently be orange). Pointing `logo-primary` at the accent (rejected: accent on every hover and ring).
- **Changed during build (2026-11-15)**: the plan first had `background-ui` take the accent. Reading its users showed the progress and spinner cases, so it was made neutral instead.

## R3. An app icon that follows light and dark mode

- **Decision**: Ship one icon everywhere, the dark-ground one. Keep the accent-ground one as artwork. Propose mode-following as its own task.
- **Rationale**:
  - macOS: a mode-following icon needs an Icon Composer `.icon` file, built into the app by Xcode 26's tool, and it applies from macOS 26; earlier systems keep the single icon. Tauri's bundler is reported to accept such a file from CLI 2.11. Projects also report the build crashing intermittently in that step.
  - Windows: an app that is not store-packaged has no light and dark variants for its program icon. Projects work around it by setting the window icon at runtime from the taskbar's mode.
  - Source strength: issues and pull requests of individual projects, and one Tauri issue. No official Tauri or Microsoft page was found. Not verified here.
- **Alternatives considered**: Building the Icon Composer file now (rejected for this task: unverified tooling, and it would not cover Windows or older macOS).
- **Sources**: [Tauri issue 14207](https://github.com/tauri-apps/tauri/issues/14207), [Liquid Glass icons without Xcode](https://www.hendrik-erz.de/post/supporting-liquid-glass-icons-in-apps-without-xcode), [taskbar-mode icon on Windows](https://github.com/Dis1092006/agterm-win/pull/6)

## R4. Typefaces

- **Decision**: Bundle Onest and JetBrains Mono as variable fonts and IBM Plex Sans Arabic as static weights 400, 500, 600 and 700, from the `@fontsource` packages, imported in `src/main.tsx` so Vite copies the files into the app.
- **Rationale**: `RULES.md` §3 forbids outside requests. The packages contain the font files and a stylesheet with local addresses only. Today the interface uses the system font, with one bundled subset for Chinese, Japanese and Korean, which stays as the fallback for those scripts. Arabic text falls to IBM Plex Sans Arabic automatically because Onest has no Arabic letters.
- **Licences**: all three are OFL-1.1 (checked with `bun pm view`: `@fontsource-variable/onest` 5.3.1, `@fontsource-variable/jetbrains-mono` 5.3.0, `@fontsource/ibm-plex-sans-arabic` 5.3.0). OFL-1.1 allows bundling in commercial, closed-source software; the fonts may not be sold on their own, and the licence text must travel with them. It ships inside each package.
- **Alternatives considered**: A font host (rejected: outside request). The system font (rejected: the brand names Onest). A variable IBM Plex Sans Arabic package (none is published under that name).

## R5. How the screens are tested

- **Decision**: Automated checks cover what can be decided from files: token values, contrast, banned colours, remote addresses, and the artwork set. The three screens are checked against their stills from real screenshots, by eye.
- **Rationale**: There is no way today to draw a screen under test. The screens call about ninety backend commands and several system plugins, and the repository has no stand-in for them; the two existing Playwright tests only confirm that the development server answers. Building a stand-in for ninety commands is larger than this task.
- **Consequence**: SC-001 (each screen matches its still) rests on the founder's review of screenshots, which the spec already says. It is not protected against later regressions by an automatic test.
- **Follow-up proposed**: a harness that renders each screen with stand-in data, so screenshots can be compared automatically in English and Arabic, light and dark.
- **Alternatives considered**: Picture comparison in Playwright now (rejected: needs the harness). A component test library with stand-ins (rejected: same cost, plus new dependencies).

## R6. Where the look checks live

- **Decision**: `tests-look/`, run with `bun test tests-look`, added to `check:screens`.
- **Rationale**: Playwright's `testDir` is `tests/` and it claims every `*.test.ts` and `*.spec.ts` there; `bun test` would in turn try to run the Playwright files. A separate folder keeps the two runners apart. Bun is already the project's runner, so no dependency is added.

## R7. The mascot

- **Decision**: Remove the mascot from the welcome screen, as still 04 shows. Leave the later onboarding step that also uses it (`TryIt`) alone.
- **Rationale**: Only the welcome and permissions steps were drawn and approved. `TryIt` is out of scope. The mascot there is already the placeholder tile, not Handy's glove, so nothing of Handy's ships; but a mascot of any kind is ruled out by the brand, so it is a known leftover.
- **Follow-up**: the remaining onboarding steps need stills, and one onboarding sentence refers to a helper "in the corner".

## R8. Tray images

- **Decision**: Redraw the twelve images to still 03 and keep Handy's file names and its mapping in `tray.rs`.
- **Rationale**: `get_icon_path` picks a file by bar theme and state; the names are internal. The marks for transcribing and needing attention use the Lucide shapes `loader` and `triangle-alert`, taken from the `lucide-react` package already in the project (ISC licence). The slash is drawn as a slanted bar, because the tool that renders the images cannot use the Onest font file.
- **The third theme**: Handy has a "coloured" set for Linux, formerly pink. It takes the light-glyph set, since Linux is out of scope and running work must not be coloured.

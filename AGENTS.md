# Slash Voice — rules for agents working in this repository

Slash Voice is a dictation app for Mac and Windows: hold a key, speak, and the text appears where the cursor is, transcribed on the device. It is for the founder and his friends first, and is built so it can launch later. What makes it its own product is planned, not built: it learns from past dictations, gets technical words right, and helps developers talk to coding agents.

It is built on a renamed copy of [Handy](https://github.com/cjpais/Handy) (MIT). Today the app is Handy with the Slash Voice name and placeholder artwork; none of our own features exist yet. The design and the decisions are in `docs/2026-11-11-slash-voice-design.md`, the research behind them is in `research/`, and the current state is in `HANDOFF.md`. If code and documents disagree, or two documents disagree, or this repository and `../Slash` disagree, stop and report it. Do not pick one silently.

**Security, privacy and performance are requirements, not clean-up work.** The gates are in [RULES.md](RULES.md) and they bind every change.

## This is one of three repositories

| Repository         | What it is                                                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `../Slash`         | The product: a desktop workspace where a team and their coding agents share threads. It holds the brand, the glossary and the decision record. |
| `../Slash-Website` | The marketing website.                                                                                                                         |
| This one           | Slash Voice.                                                                                                                                   |

These are read from the product folder. They are never copied here and never changed from here:

| What                                                                 | Where                                                       |
| -------------------------------------------------------------------- | ----------------------------------------------------------- |
| Product purpose, audience, voice, brand commitments                  | `../Slash/PRODUCT.md`                                       |
| Colours, typefaces, shapes, the logo, what the founder has ruled out | `../Slash/DESIGN.md`                                        |
| Words to use, in English and Arabic                                  | `../Slash/docs/01-glossary.md`, `../Slash/docs/06-ux.md` §8 |
| Decisions (`D-` numbers)                                             | `../Slash/docs/README.md`                                   |
| How the founder works                                                | `../Slash/HANDOFF.md` §1 and §2                             |

**Not reconciled yet, report it when it matters.** `../Slash/AGENTS.md` records voice as a part of the Slash engine (whisper.cpp through a Rust binding, ADR-019, milestone M6) and the Mac app as Swift (ADR-003). Slash Voice is a separate app on Tauri for both systems, built on Handy's engine. No decision record in `../Slash/docs/README.md` covers that yet, and whether Slash Voice decisions take `D-` numbers there is not decided. Ask before assuming either.

## Tech stack

"Decided" means the founder chose it and it is recorded in the design document. "Comes with Handy" means it is what the copied code uses; changing it is a decision. "Proposed" and "Open" are not settled: do not build on them as if they were.

| Part                               | Choice                                                                                       | Status                                        | Source                     |
| ---------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------- | -------------------------- |
| Starting point                     | A renamed copy of Handy; its repository is the git remote `upstream`                         | Decided                                       | design §3, decision 9      |
| App shell                          | Tauri 2, one build for Mac and Windows                                                       | Decided                                       | design §3, decision 9      |
| Backend                            | Rust                                                                                         | Comes with Handy                              | `docs/handy-code-guide.md` |
| Screens                            | React 18, TypeScript, Tailwind 4, Zustand, Vite                                              | Comes with Handy                              | `docs/handy-code-guide.md` |
| Look                               | The Slash brand: colours, typefaces and logo from `../Slash/DESIGN.md`                       | Decided 2026-11-12; not designed or built yet | `DESIGN.md`                |
| Design tool                        | Pencil (`.pen`), with the `impeccable` skill                                                 | Decided 2026-11-12                            | `DESIGN.md`                |
| Speech engine                      | `transcribe-cpp` in its own worker process; Metal on Apple Silicon, Vulkan on Windows        | Comes with Handy                              | `research/handy-study.md`  |
| Speech models                      | English: `parakeet-unified-en-0.6b`. Arabic with English: `cohere-transcribe-arabic-07-2026` | To verify, on the founder's own recordings    | `research/handy-study.md`  |
| Rewrite model                      | Local first, cloud optional; only text is ever sent                                          | Direction decided; the model is open          | design §3, decision 7      |
| Our own features                   | A separate Rust module and a separate screens folder, apart from Handy's files               | Proposed                                      | design §4                  |
| Storage                            | SQLite on the device, no sync                                                                | Comes with Handy                              | design §4                  |
| Text                               | `src/i18n/locales/<language>/translation.json`, 26 languages; no text literals in components | Comes with Handy                              | `docs/handy-code-guide.md` |
| Package manager and runner         | Bun; Rust stable through rustup                                                              | Comes with Handy                              | `BUILD.md`                 |
| Pipeline                           | GitHub Actions, `checks.yml`                                                                 | Proposed; the repository is not on GitHub yet | `RULES.md` §6              |
| Self-update, signing, notarisation | Off and none                                                                                 | Open                                          | design §7                  |
| Requirement IDs and task list      | Not written                                                                                  | Open                                          | below                      |

## Build order

1. **Milestone 1.** Rename, build and run on Mac: done 2026-11-12. Still to do: the Windows build, and replacing Handy's screens and pink theme with the Slash brand.
2. **The look.** Designed in Pencil first, shown to the founder as stills, built only after he approves them.
3. **Features**, in the order of design §6: technical vocabulary and correction memory, repo-aware names, voice slash commands, point-and-speak, rewrite in the founder's style, live preview, spoken agent status.

There is no requirements document and no task list yet. Writing them (requirement IDs and one task per feature, in `docs/`) is the first spec-kit work, and their ID prefixes are the founder's to choose. Until they exist, a spec links to the numbered decisions and sections of the design document.

Every task needs the founder's go-ahead. Do not start a task whose dependencies are not done.

## How a task is built: spec-kit

Every task is built through spec-kit. No code is written without a spec, a plan and a task list that the founder has seen. The skills are in `.claude/skills/speckit-*`; the principles are in `.specify/memory/constitution.md`.

| Step | Command              | What it produces                                                                                                 |
| ---- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1    | `/speckit-specify`   | `specs/NNN-<name>/spec.md`. One task is one feature folder.                                                      |
| 2    | `/speckit-clarify`   | Open questions answered by the founder, not guessed.                                                             |
| 3    | `/speckit-plan`      | `plan.md`: structure, data, and which security and privacy rules and which performance targets the task touches. |
| 4    | `/speckit-tasks`     | `tasks.md`, tests listed before the code they check.                                                             |
| 5    | `/speckit-analyze`   | Consistency check. Fix findings before step 6.                                                                   |
| 6    | `/speckit-implement` | The code, tests first.                                                                                           |

A spec links to decisions and document sections. It never restates or replaces them.

## Before you write code

1. Read the design document and the section of `research/handy-study.md` that covers the part you touch.
2. Read `docs/handy-code-guide.md` before changing any of Handy's files.
3. Use the words in `../Slash/docs/01-glossary.md` exactly, in code and in text.
4. If something is unclear or contradictory, ask. Do not guess.

## How to work

- Tests first. Show each test failing before the code that makes it pass.
- Build only what your task covers. No extra features, no drive-by refactors.
- Never delete, weaken or skip an existing test, Handy's included. If one looks wrong, report it.
- Keep changes inside the paths your task names. Touching one of Handy's files needs a reason in the pull request.
- One task, one pull request, on branch `task/<task-id>-<short-name>`.
- Never invent customers, numbers, testimonials or prices. Say what is unverified.

## Rules of this repository (do not break these)

- **Audio stays on the device.** Speech is transcribed locally. No audio leaves the machine unless the user has chosen a cloud option that says so plainly.
- **Only text goes to a rewrite model**, and only when the user has turned that on.
- **No telemetry, tracker or analytics** unless a decision record names it.
- **Visible names are Slash Voice; internal names stay Handy's.** The product name, the identifier (`com.slashvoice.app`), the program name (`slash-voice`), window and tray text, translations, icons and logos are ours. The crate name `handy`, `HANDY_*` environment variables, component names such as `HandyHand`, and code comments are left alone on purpose, so merges from `upstream` stay easy.
- **Never ship Handy's name, logo, icon or mascot**, and never imply Handy endorses Slash Voice. Keep Handy's copyright notice (`LICENSE`) and the "Built on Handy" credit on the About screen.
- **Self-update stays off** (`SLASH_VOICE_HAS_RELEASE_FEED` in `src-tauri/src/settings.rs`) until Slash Voice has its own release feed and signing key. Never point the updater at Handy's releases.
- **New Slash Voice features go in their own module**, not spread through Handy's files. Keep changes to Handy's files small.
- **All user-facing text goes in the locale files.** The linter rejects text literals in components. A screen is done only when it works in English and in Arabic, right-to-left.
- **Mac and Windows together.** Once the Windows build exists, an interface change is not done until it builds and looks right on both.
- **A wrong name is worse than no name.** A correction to a spoken word is applied only when the match is confident.
- **A rewrite never drops** a negation, "only", a number or code.

## Working principles

These hold on every task, whether or not a skill is invoked.

- **Design deep modules.** Put a lot of behaviour behind a small interface. Test through the interface only. Do not add an abstraction until two real uses exist.
- **No fix before a failing reproduction.** For any bug or slowdown, first build one fast, repeatable command that fails on the exact symptom. Write the regression test before the fix. For performance, measure a baseline before changing anything. Remove all debug output before finishing.
- **Review on two separate axes.** Standards: does the change follow these rules and `RULES.md`? Spec: does it do what the spec says, nothing missing and nothing extra? Report the two separately.
- **Think like an attacker on every change.** What can a hostile audio file, a hostile model download, a hostile repository whose names we index, or text on the screen do with this code? Fail closed: when a check cannot run, deny.
- **Research from primary sources.** Official documentation and source code, with a link for every claim. Say plainly what was not verified.
- **Ask about decisions, look up facts.** Put each decision to the founder with a recommended answer first. Never ask for something you could read yourself.
- **Pull request body.** Summary, evidence (before and after: screenshots, then test output), merge danger (reversible or not, and what could break), plus the fields in `RULES.md`.

## Orchestrator and helper

The same as in the product repository (`../Slash/AGENTS.md`, D-215): Claude Code orchestrates and plans; Codex is a helper through the `codex-delegate` skill and never claims, commits, pushes or merges.

## Commands

On this Mac, add `/opt/homebrew/opt/rustup/bin` to `PATH` first.

- `bun run check` — lint, formatting, translation checks, screens build, Rust formatting and Rust tests (what the pipeline runs)
- `bun run security` — secret scan of the repository
- `bun run tauri dev` — run the app in development
- `bun run tauri build --bundles app` — build the Mac app
- `bun run tauri icon branding/app-icon.svg` — regenerate the app icons from the artwork in `branding/`

Not built yet: dependency vulnerability and licence checks, benchmarks, and end-to-end tests with the `e2e` framework.

More commands and how Handy's code is organised: `docs/handy-code-guide.md`.

## When you finish

State plainly: what you built, what you ran and its result, and what is not done or not tested.

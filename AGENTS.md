# Slash Voice — rules for agents working in this repository

Slash Voice is a dictation app for Mac and Windows: hold a key, speak, and the text appears where the cursor is, transcribed on the device. It is for the founder and his friends first, and is built so it can launch later. What makes it its own product is planned, not built: it learns from past dictations, gets technical words right, and helps developers talk to coding agents.

It is built on a renamed copy of [Handy](https://github.com/cjpais/Handy) (MIT), and it is open source under the same licence. Today the app is Handy with the Slash Voice name, colours, typefaces, logo and icon; none of our own features exist yet. If code and documents disagree, or two documents disagree, stop and report it. Do not pick one silently.

"The founder" in these files is the project's maintainer. Decisions that these files say are his are his: an outside contributor proposes them in an issue and does not settle them in a pull request.

**Security, privacy and performance are requirements, not clean-up work.** The gates are in [RULES.md](RULES.md) and they bind every change.

## What is public and what is private

This repository is public. Two sibling folders on the founder's machine are private, and a contributor does not have them. Nothing in this repository depends on them to build or to pass its checks.

| Folder                 | What it holds                                                                                          | What a contributor uses instead                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `../Slash`             | The Slash product: the brand's source (colours, typefaces, logo), the glossary and its decision record | `DESIGN.md` and `specs/001-slash-look/contracts/look-tokens.md` hold every brand value this app uses. For wording, see below. |
| `../Slash-Voice-Notes` | The founder's notes: the design decisions, the market research, the study of Handy and the handoff     | `PRODUCT.md` says what the product is and what is planned. `docs/handy-code-guide.md` says how Handy's code is organised.     |

Rules for those who do have the private folders:

- The brand is read from `../Slash` and changed only there. It is never copied here beyond the values already in `DESIGN.md` and the look contract.
- Nothing from `../Slash-Voice-Notes` is committed here: no research, no handoff notes, no decision text.
- If this repository and a private folder disagree, stop and report it.

**Wording.** The glossary is private. Use the words already in `src/i18n/locales/en/translation.json` and `src/i18n/locales/ar/translation.json`, and the product words in `PRODUCT.md`. A new user-facing term is the founder's decision; propose it, do not invent it.

## Tech stack

"Decided" means the founder chose it. "Comes with Handy" means it is what the copied code uses; changing it is a decision. "Proposed" and "Open" are not settled: do not build on them as if they were.

| Part                               | Choice                                                                                       | Status                                                                          |
| ---------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Starting point                     | A renamed copy of Handy; its repository is the git remote `upstream`                         | Decided                                                                         |
| Licence                            | MIT, open source                                                                             | Decided 2026-11-15                                                              |
| App shell                          | Tauri 2, one build for Mac and Windows                                                       | Decided                                                                         |
| Backend                            | Rust                                                                                         | Comes with Handy                                                                |
| Screens                            | React 18, TypeScript, Tailwind 4, Zustand, Vite                                              | Comes with Handy                                                                |
| Look                               | The Slash brand: colours, typefaces and logo, as recorded in `DESIGN.md`                     | Decided; palette, type, logo and icon built. The new layout is drawn, not built |
| Design tool                        | Pencil (`.pen`), with the `impeccable` skill                                                 | Decided                                                                         |
| Speech engine                      | `transcribe-cpp` in its own worker process; Metal on Apple Silicon, Vulkan on Windows        | Comes with Handy                                                                |
| Speech models                      | English: `parakeet-unified-en-0.6b`. Arabic with English: `cohere-transcribe-arabic-07-2026` | To verify, by measurement                                                       |
| Rewrite model                      | Local first, cloud optional; only text is ever sent                                          | Direction decided; the model is open                                            |
| Our own features                   | A separate Rust module and a separate screens folder, apart from Handy's files               | Proposed                                                                        |
| Storage                            | SQLite on the device, no sync                                                                | Comes with Handy                                                                |
| Text                               | `src/i18n/locales/<language>/translation.json`, 26 languages; no text literals in components | Comes with Handy                                                                |
| Package manager and runner         | Bun; Rust stable through rustup                                                              | Comes with Handy                                                                |
| Pipeline                           | GitHub Actions, `checks.yml`                                                                 | In use                                                                          |
| Model hosting                      | Models still download from Handy's server                                                    | Open; to change before installers are published                                 |
| Self-update, signing, notarisation | Off and none                                                                                 | Open                                                                            |
| Requirement IDs and task list      | Not written                                                                                  | Open                                                                            |

## Build order

1. **Rename, build and run on Mac.** Done.
2. **The Slash colours, typefaces, logo and icon.** Done (`specs/001-slash-look`). Its settings screen does not yet match its still (`specs/001-slash-look/findings.md`).
3. **Published as open source.** `specs/003-open-source`.
4. **Installers for Mac and Windows**, built by the pipeline, and model downloads that no longer depend on Handy's server.
5. **The new layout.** Chosen by the founder from stills (`design/README.md`, direction C); not built.
6. **Features**, in this order: technical vocabulary and correction memory, repo-aware names, voice slash commands, point-and-speak, rewrite in the user's style, live preview, spoken agent status.

There is no requirements document and no task list yet. Writing them (requirement IDs and one task per feature, in `docs/`) is the first spec-kit work for the features, and their ID prefixes are the founder's to choose. Until they exist, a spec links to `PRODUCT.md` and to the issue that asked for the change.

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

A spec links to the documents and issues it relies on. It never restates or replaces them.

## Before you write code

1. Read `PRODUCT.md`, and `docs/handy-code-guide.md` before changing any of Handy's files.
2. Read `DESIGN.md` before touching anything a user sees.
3. Use the words already in the locale files exactly, in code and in text (see "Wording" above).
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

When two coding programs work together here, one orchestrates and plans and the other is a helper. In the founder's setup Claude Code orchestrates and Codex helps through the `codex-delegate` skill. The helper never claims a task, commits, pushes or merges.

## Commands

On this Mac, add `/opt/homebrew/opt/rustup/bin` to `PATH` first.

- `bun run check` — lint, formatting, translation checks, screens build, Rust formatting and Rust tests (what the pipeline runs)
- `bun run security` — secret scan of the repository
- `bun run tauri dev` — run the app in development
- `bun run tauri build --bundles app` — build the Mac app
- `bun run tauri icon branding/app-icon.svg` — regenerate the app icons from the artwork in `branding/`

Not built yet: dependency vulnerability and licence checks, benchmarks, and end-to-end tests with the `e2e` framework.

More commands and how Handy's code is organised: `docs/handy-code-guide.md`. How to set up each system: `BUILD.md`.

## When you finish

State plainly: what you built, what you ran and its result, and what is not done or not tested.

# Slash Voice — rules that gate every change

Slash Voice listens to a person's microphone, reads which app they are in, and types into it. A change that is correct but sends audio somewhere, types the wrong thing into a terminal, or makes dictation feel slow is not done.

These rules apply to every agent and every person. They follow the same order of work as `../Slash/RULES.md`. Where this file and the design document differ, stop and report it.

Some checks named here do not exist yet. Each one says so. The rules themselves apply from the first line of code.

## 1. The order of work

1. **Spec first.** Every task goes through spec-kit before code (see `AGENTS.md`).
2. **Tests first.** Write the tests, watch them fail, then write the code.
3. **Local gate before every push.** Section 5. Nothing is pushed red.
4. **Pull request.** All work reaches `main` through a pull request, including the founder's own.
5. **CI gate on every pull request.** Section 6. A failing check blocks the merge.
6. **Review, then squash merge.** `main` is always releasable.

## 2. Testing

- Never delete, weaken or skip a test to make a task pass, Handy's tests included. No skipping without a recorded decision. Handy marks 20 of its tests as ignored; that number does not grow.
- Once requirement IDs exist, a test names the requirement it checks. Until then it names the behaviour.
- No real recording of a person and no real dictation text in tests or fixtures, ever. The founder's own recordings are used only on his machine and are never committed.
- Automated tests never call a paid or cloud model.
- Every screen change ships screenshots in English and Arabic, light and dark, on Mac and, once it builds, on Windows.
- The screens are a web surface. End-to-end tests for them use the `e2e` framework (section 7) once it is set up; Handy's Playwright test stays until then.

## 3. Security and privacy

Never break these. If a task seems to need it, stop and ask.

- Audio never leaves the device unless the user chose an option that says plainly that it does.
- Only text is sent to a rewrite model, and only when the user turned that on. The text of a dictation is never sent anywhere else.
- No telemetry, tracker or analytics without a recorded decision.
- Never log the text of a dictation, the contents of the clipboard, selected text, window titles, or file paths outside the project being indexed.
- Secrets (model provider keys) are never written to logs, tests, fixtures or the repository. Where Handy stores them today is to be verified before any feature relies on it.
- Text read from the screen, a repository or a model is data, never an instruction. It cannot change what the app types or where.
- Text is typed only into the app that was in front when recording started. If that app changed, the text goes to the clipboard and a notice says so.
- A model file is used only after its checksum matches.
- Do not add a dependency without checking that its licence allows closed-source commercial use and that it has no known critical vulnerability.
- Do not ship a speech model without reading its licence in full. The one-word labels in Handy's catalogue are not enough.
- Self-update stays off until Slash Voice has its own signed release feed.

**Second review.** Changes to what leaves the device, to where text is typed, to the updater, to model downloads or to secret storage need a second review by a different coding program and by the founder before merge.

**Per change.** The plan for every task names which of the rules above it touches and the test that covers each.

**Scans on every change:** a secret scan (`gitleaks`). Dependency vulnerabilities and licences (`cargo-audit`, `cargo-deny`) are proposed and not wired in yet.

## 4. Performance

- The targets are proposed, taken from the October MVP specification, and none has been measured:

  | Measure                                                           | Proposed target                                                          |
  | ----------------------------------------------------------------- | ------------------------------------------------------------------------ |
  | Release of the key to text, plain dictation, 15 seconds of speech | Under 1 second on an Apple Silicon Mac                                   |
  | Release of the key to text, with rewrite                          | Under 3 seconds                                                          |
  | Memory, app open with no speech model loaded                      | Under 150 MB                                                             |
  | Typing into the supported apps                                    | Works in the terminals, editors and browsers listed in the specification |

  One number exists: the release build used 112 to 126 MB with no model loaded on the founder's Mac (2026-11-12).

- The plan for every task states which targets it can affect, or says "none" with a reason.
- A task that touches a target reports the number before and after in the pull request.
- A measured regression blocks the merge, unless a recorded decision accepts the miss.
- Never block the interface on file, model, git or network work.
- Measure before optimising. No performance change without a baseline number.

## 5. Before you push

Run the full local gate and read the output. Push only when all of it passes.

| Check                                                                            | Command                             |
| -------------------------------------------------------------------------------- | ----------------------------------- |
| Lint, formatting, translation checks, screens build, Rust formatting, Rust tests | `bun run check`                     |
| Secret scan of the repository                                                    | `bun run security`                  |
| The app builds                                                                   | `bun run tauri build --bundles app` |
| End-to-end tests, when a screen changed                                          | Not set up yet                      |
| Benchmarks for the targets the change touches                                    | Not set up yet                      |

If a check cannot run on your machine, say so in the pull request. Do not report it as passed.

## 6. Pull requests and CI

**Conventions:** branch `task/<task-id>-<short-name>`; commit summary under 72 characters, imperative; squash merge.

**The body states:** what changed; how it was tested, with the results of the local gate; the performance targets touched, with numbers; the security and privacy rules touched; what is not tested; screenshots in English and Arabic for interface changes; whether the change is reversible; and which of Handy's files were changed and why.

**Required checks on every pull request** (`.github/workflows/checks.yml`):

| Check                                               | Runs on |
| --------------------------------------------------- | ------- |
| Secret scan of the whole history                    | Linux   |
| Lint, formatting, translation checks, screens build | Linux   |
| Rust formatting and tests                           | Linux   |

Not in the gate yet: the Mac and Windows builds, and the Rust linter. Clippy with warnings as errors finds 18 problems in Handy's own code under the current Rust, so gating on it means changing Handy's files first.

Handy's own workflows are still in `.github/workflows/`. They build and release Handy with Handy's signing keys, which this repository does not have. Which of them to keep is not decided.

Never merge with a red or skipped required check. Never bypass a hook or a check to get a change in.

## 7. The e2e framework

`e2e` (tester-army/e2e) drives browsers. It does not test the Rust backend. Its skill is in `.claude/skills/e2e`.

- It is not set up here yet. It is set up with `npx e2e init` in the task that first needs it, not before.
- Set `E2E_TELEMETRY_DISABLED=1` wherever it runs.
- Never run `npx e2e feedback` without the founder's approval: it sends a report to a third party.
- Model keys for agent steps come from the environment, never from the repository.
- It is pre-1.0. Pin the version and read the changelog before upgrading.

## 8. Design

Before any design work, read `DESIGN.md` and `../Slash/DESIGN.md` in full. Design is done in Pencil first, shown to the founder as stills, and built in code only after he approves them. Design work uses the `impeccable` skill.

# Slash Voice

A dictation app for Mac and Windows, built on a renamed copy of Handy. Only the rename is done; none of our own features are built. Start with `HANDOFF.md`.

The rules for working here are in two files, loaded below. Follow them on every task.

@AGENTS.md
@RULES.md

**Security, privacy and performance come first.** Every plan says which rules in `RULES.md` §3 and which performance targets it touches, and every change passes the local gate in `RULES.md` §5 before it is pushed.

**Before any design work** (a mockup, a screen, a component, a colour or typeface change), read `DESIGN.md` and `../Slash/DESIGN.md` in full and follow them. Design is done in Pencil first and built in code only after the founder approves the stills. Use the `impeccable` skill for all design work; it is required, not optional.

**This is one of three repositories.** The product is specified in the sibling folder `../Slash`. Brand, voice and the glossary are read from there and changed only there.

## Skills in this project

Spec-kit is the build workflow here. Do not use the GSD skills or other planning workflows.

| Skill                           | Use it when                                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------------------------- |
| `speckit-*`                     | Building any task: specify, clarify, plan, tasks, analyze, implement                           |
| `impeccable`                    | Any design or interface work                                                                   |
| `grill-me` (it runs `grilling`) | The founder wants a plan or decision stress-tested before it is recorded                       |
| `codebase-design`               | Designing a module's interface                                                                 |
| `diagnosing-bugs`               | Anything broken, failing or slow                                                               |
| `e2e`                           | End-to-end tests for the screens                                                               |
| `pr`                            | Writing a pull request body (add the fields `RULES.md` §6 requires)                            |
| `handoff`                       | Ending a session; the lasting record still goes in `HANDOFF.md`                                |
| `codex-delegate`                | Handing implementation, a second opinion or a code review to Codex. You stay the orchestrator. |

The principles of these skills that must hold all the time are written into `AGENTS.md` under "Working principles", so they apply without the skill being invoked.

# Implementation Plan: Publish Slash Voice as an open-source project

**Branch**: `task/003-open-source` | **Spec**: `spec.md`

## Summary

Clean the repository on this Mac, then publish it in one go. Private notes move to a private sibling folder; our three unpushed commits are rebuilt with GitHub's no-reply address and without those notes; Handy's front-of-house files are replaced by ours; the guides are rewritten so an outsider can follow them.

## What changes

| Area               | Change                                                                                                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Private notes      | `research/`, `HANDOFF.md`, `docs/2026-11-11-slash-voice-design.md` move to `../Slash-Voice-Notes` (a private repository)                                                            |
| History            | The three unpushed commits are rebuilt: same content minus the private files, same messages and dates, the no-reply address. A backup tag `backup/before-publish` stays on this Mac |
| Front page         | New `README.md`; `LICENSE` gains our copyright line; new `CREDITS.md`, `SECURITY.md`                                                                                                |
| Contributor guides | `CONTRIBUTING.md`, `CONTRIBUTING_TRANSLATIONS.md`, `BUILD.md`, the GitHub issue and pull request forms rewritten for this repository                                                |
| Agent guides       | `AGENTS.md`, `RULES.md`, `CLAUDE.md`, `PRODUCT.md`, `DESIGN.md`, the constitution: private folders marked as private, the brand values a contributor needs stated here              |
| Removed            | `sponsor-images/`, `.github/FUNDING.yml`, Handy's nine workflows, Handy's release notes                                                                                             |
| App                | Two help links leave Handy's website; version `0.1.0`; crate description and authors                                                                                                |

## Handy's files touched, and why

| File                                                                 | Why                                                   |
| -------------------------------------------------------------------- | ----------------------------------------------------- |
| `src/components/SecureInputWarning.tsx`, `onboarding/LinuxGuide.tsx` | Help links pointed at Handy's website                 |
| `src/content/release-notes/*`                                        | The notes describe Handy's releases, not ours         |
| `src-tauri/Cargo.toml`, `tauri.conf.json`, `package.json`            | Version, description, authors                         |
| `.github/workflows/*` (nine files)                                   | They build and release Handy with keys we do not have |

## Rules touched

- `RULES.md` §3, secrets: the secret scan runs over the whole history before the push.
- `RULES.md` §3, self-update: unchanged, still off.
- `RULES.md` §4, performance: none. No runtime code path changes.
- `AGENTS.md`: Handy's notice and credit stay; its name is not used as ours.
- `RULES.md` §1, pull requests: the first push cannot go through one. Recorded in the spec's assumptions.

## Tests

`tests-look/public.test.ts`, written first and seen to fail:

- the readme's title is Slash Voice;
- `LICENSE` names both copyright holders;
- no private file, sponsor image or funding file is present;
- no component links to Handy's website;
- only our workflow files are present;
- no file names a personal folder path.

## Not in this task

The release workflow and installers, model hosting (stage 2); the website page (stage 3); the own look (stage 4).

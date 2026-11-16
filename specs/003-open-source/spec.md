# Feature Specification: Publish Slash Voice as an open-source project

**Feature Branch**: `task/003-open-source` (stacked on `task/002-keep-in-dock`)

**Feature folder**: `specs/003-open-source`

**Created**: 2026-11-16

**Status**: Clarified

**Input**: The founder, 2026-11-15: "I want to launch this project as an open source project ... launch a GitHub repo with an MIT certificate." Stage 1 of the plan he approved the same day.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - A stranger opens the repository and sees Slash Voice (Priority: P1)

Someone finds the repository on GitHub. The first page says what Slash Voice is, that it is early, how to build it, and that it is built on Handy. Nothing they see presents itself as Handy, asks them to sponsor Handy's author, or sends them to Handy's issue tracker.

**Independent Test**: Read the repository's front page, its licence, its contributing guide and its issue form as a stranger would.

**Acceptance Scenarios**:

1. **Given** the repository's front page, **When** it is read, **Then** the name is Slash Voice and Handy appears only as the project it is built on.
2. **Given** the licence, **When** it is read, **Then** it is MIT and names both Handy's author and the Slash Voice contributors.
3. **Given** the contributing guide, the issue form and the pull request form, **When** they are followed, **Then** every link leads to this repository.

### User Story 2 - Nothing private is published (Priority: P1)

The founder's competitor research, handoff notes, decisions document and personal email address are not in the repository or anywhere in its history.

**Independent Test**: Search the final tree and every commit that is ours.

**Acceptance Scenarios**:

1. **Given** our commits, **When** their author and committer are read, **Then** each shows GitHub's no-reply address.
2. **Given** the whole history, **When** it is searched for the private files, **Then** none is found.
3. **Given** the final tree, **When** it is searched for a personal folder path, **Then** none is found.

### User Story 3 - A contributor can follow the guides alone (Priority: P2)

A contributor, or their coding agent, reads `AGENTS.md`, `RULES.md` and `DESIGN.md` and can work without the founder's private folders.

**Acceptance Scenarios**:

1. **Given** a guide names a private folder, **When** it is read, **Then** it says the folder is private and gives the value the contributor needs in this repository.

### Edge Cases

- Handy's 953 commits keep their authors and are not rewritten.
- The "Built on Handy" credit and Handy's copyright line stay.
- The app's behaviour does not change, apart from two help links and the version number.

## Requirements _(mandatory)_

### Requirements covered

| Requirement                                                               | Defined in                                 | Shown to be met by                              |
| ------------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------- |
| Public on GitHub under MIT                                                | The founder's instruction; plan decision 1 | Stories 1 and 2; the final look before the push |
| The public sees code and guides only                                      | Plan decision 2                            | Story 2; `tests-look/public.test.ts`            |
| Commits use GitHub's private address                                      | Plan decision 3                            | Story 2, scenario 1                             |
| Never ship Handy's name, logo, icon or mascot; keep its credit and notice | `AGENTS.md`, "Rules of this repository"    | Story 1; `tests-look/public.test.ts`            |
| No secrets in the repository or its history                               | `RULES.md` §3                              | `bun run security` over the whole history       |

**Roadmap task**: none; there is no task list yet.

### Gaps found

- Speech models still download from Handy's server. That is stage 2's work and is stated in the readme.
- Handy's own Linux packaging files (`flake.nix`, `nix/`) still describe Handy. Linux is out of scope; the readme says so.

## Success Criteria _(mandatory)_

- **SC-001**: A search of the tree and of our commits for the founder's address, a personal folder path and the private files finds nothing.
- **SC-002**: The readme, the contributing guide and the GitHub forms name Handy only as credit, and every link in them leads to this repository or to a named outside source.
- **SC-003**: `bun run check`, `bun run security` and the app build pass.
- **SC-004**: The founder sees the final file list and the readme before anything is pushed.

## Assumptions

- The repository is `iMedoV8/slash-voice`.
- The first push puts the three earlier task commits and this one on `main` together, because there was no remote for pull requests to go through. Pull requests are the rule from then on.

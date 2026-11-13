# Implementation Plan: [FEATURE]

**Branch**: `task/[task-id]-[short-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]

**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]

**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]

**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]

**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]

**Project Type**: [e.g., library/cli/web-service/mobile-app/compiler/desktop-app or NEEDS CLARIFICATION]

**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]

**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]

**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Security: threats touched

<!--
  REQUIRED (constitution: security is designed in). Name every threat from the
  repository's threat model that this change touches, and the test that covers it.
  Think like an attacker: hostile input, a forged request, a low-privilege user.
  If none apply, write "None" and the reason. Fail closed: when a check cannot run, deny.
-->

| Threat ID | How this change touches it | Response in this design | Test that covers it |
|---|---|---|---|
| [e.g. T-12] | [surface] | [control] | [test name] |

**Security rules touched**: [rule IDs, or "None" with a reason]

**Second review needed**: [yes or no; yes for access rules, redaction, approvals, updates, billing, personal data]

## Performance: targets touched

<!--
  REQUIRED (constitution: performance is a requirement). Name every performance
  target this change can affect, the benchmark or measurement that covers it, and
  the baseline number measured BEFORE any change. If none, write "None" and the reason.
-->

| Target ID | Why this change can affect it | Benchmark or measurement | Baseline | Budget |
|---|---|---|---|---|
| [e.g. NFR-PERF-03] | [reason] | [name] | [number, or "to measure first"] | [number] |

## Test levels used

<!-- From the repository's test strategy: which levels apply to the code this task touches. -->

- [level]: [what it covers here]

## Who does what

<!--
  The orchestrator (Claude Code) wrote this plan and owns every decision in it (docs/15 B.9).
  Name which parts go to Codex (GPT-6.1 Sol, high effort, via the codex-delegate skill) and
  which the orchestrator does itself. Codex never plans, claims, commits or merges.
-->

| Part | Done by | Brief or review |
|---|---|---|
| [e.g. implement tasks T005-T012] | [Codex / orchestrator] | [brief file, or "second opinion on the plan", or "review of the diff"] |

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

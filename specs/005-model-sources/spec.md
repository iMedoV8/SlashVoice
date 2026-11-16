# Feature Specification: Models download from Hugging Face only

**Feature Branch**: `task/005-model-sources`

**Feature folder**: `specs/005-model-sources`

**Created**: 2026-11-16

**Status**: Clarified

**Input**: The founder, 2026-11-16, asked whether to remove the fallback to Handy's own server for model downloads: "Yes, remove it".

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Slash Voice never contacts Handy's own server (Priority: P1)

A user downloads a speech model. The file comes from Hugging Face. If Hugging Face cannot be reached, the download fails and says so. The app does not turn to Handy's storage server, which Slash Voice has not asked to use.

**Independent Test**: Read the list of servers the app may fall back to, and try to download one of the five older models that point at that server.

**Acceptance Scenarios**:

1. **Given** any model the app offers, **When** its fallback servers are listed, **Then** the list is empty.
2. **Given** the language detector, **When** its fallback servers are listed, **Then** the list is empty.
3. **Given** Hugging Face fails for a download, **When** the retries are used up, **Then** the download ends with an error that names Hugging Face, and no other server is contacted.
4. **Given** one of the five older models whose address is on Handy's server, **When** a download is requested for it, **Then** it is refused before any request is made.
5. **Given** the app is started with `HF_ENDPOINT` set to another server, **When** a model is downloaded, **Then** the request still goes to `huggingface.co`.

### Edge Cases

- An older model already on the user's disk keeps working. Only downloading it is refused.
- A download that was half finished from the fallback server is not resumed from it.
- The checksum check on downloaded files is unchanged.
- `HF_ENDPOINT` is ignored. Handy honoured it, so a user who relied on a Hugging Face mirror through that setting loses it. Found by the second review.

## Requirements _(mandatory)_

### Requirements covered

| Requirement                                          | Defined in                   | Shown to be met by                                              |
| ---------------------------------------------------- | ---------------------------- | --------------------------------------------------------------- |
| No download from, or fallback to, Handy's own server | The founder's decision above | Scenarios 1 to 4; the tests in `model_sources.rs` and `catalog` |
| A model file is used only after its checksum matches | `RULES.md` §3                | Unchanged; Handy's existing tests                               |
| Changes to model downloads get a second review       | `RULES.md` §3                | A review by Codex and by the founder before merge               |

**Decision recorded here (needed by `RULES.md` §2):** two of Handy's tests assert that every offered model has a fallback server (`every_offered_model_has_mirror_fallbacks_with_hashes` in `catalog/mod.rs`, and the retired-model test in `managers/model.rs`). The founder's decision makes that assertion wrong for Slash Voice. Both are changed to assert the opposite. No test is deleted or skipped, and the count of tests does not fall.

**Roadmap task**: none; there is no task list yet.

### Gaps found

- The models are still published by Handy's author, in his Hugging Face repositories. Slash Voice hosts none. If those repositories were removed, downloads would stop.
- With no fallback, and with `HF_ENDPOINT` ignored, a user whose network blocks Hugging Face cannot download a model.
- A file downloaded from Hugging Face is checked by the download library against what the server reports, at a pinned revision. Whether the app also checks it against the hash compiled into the catalogue was not traced in this task.

## Success Criteria _(mandatory)_

- **SC-001**: No code path in the app can start a request to `blob.handy.computer`.
- **SC-002**: The Rust tests pass, with no fewer tests than before and 20 still ignored.
- **SC-003**: The second review is done and its findings are answered in the pull request.

## Assumptions

- Hugging Face is reachable for the founder and his friends.
- A mirror of our own may be added later; the place for it is `model_sources.rs`.

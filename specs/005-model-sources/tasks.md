# Tasks: Models download from Hugging Face only

- [x] T001 Add `model_sources.rs` holding today's behaviour, and the tests that assert the new behaviour; see them fail
- [x] T002 Change the two Handy tests to assert no fallback; see them fail
- [x] T003 Empty the fallback list and refuse plain-URL downloads (makes T001 and T002 pass)
- [x] T004 Update `README.md` and `AGENTS.md` where they describe model downloads
- [x] T005 Local gate: `bun run check`, `bun run security`, the app build
- [x] T006 Second review by Codex; answer its findings
- [ ] T007 Open the pull request for the founder's review

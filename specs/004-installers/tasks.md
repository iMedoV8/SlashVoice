# Tasks: Installers built by the pipeline

- [x] T001 Read the licence of the bundled silence detector in full and record it in `research.md`
- [x] T002 Write `tests-look/workflows.test.ts` and see it fail
- [x] T003 Write `.github/workflows/release.yml` (makes T002 pass)
- [x] T004 Remove the unneeded model download step from `README.md` and `CONTRIBUTING.md`; point the readme at the releases page
- [ ] T005 Local gate: `bun run check`, `bun run security`
- [ ] T006 Open the pull request; both installers build in its run
- [ ] T007 After merge: start the workflow by hand; the draft pre-release holds both installers and the checksums
- [ ] T008 The founder installs and dictates on his Windows PC
- [ ] T009 The Mac disk image opens and the app launches on the founder's Mac
- [ ] T010 The founder publishes the release (after the model download task)

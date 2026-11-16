# Tasks: Installers built by the pipeline

- [x] T001 Read the licence of the bundled silence detector in full and record it in `research.md`
- [x] T002 Write `tests-look/workflows.test.ts` and see it fail
- [x] T003 Write `.github/workflows/release.yml` (makes T002 pass)
- [x] T004 Remove the unneeded model download step from `README.md` and `CONTRIBUTING.md`; point the readme at the releases page
- [x] T005 Local gate: `bun run check`, `bun run security`
- [x] T006 Open the pull request; both installers build in its run (pull request 1: Windows in 22 minutes, Mac in 16)
- [x] T007 After merge: start the workflow by hand; the draft pre-release holds both installers and the checksums (2026-11-16, run 43939716988, built from commit `f977944`; both files match `SHA256SUMS.txt`)
- [ ] T008 The founder installs and dictates on his Windows PC
- [ ] T009 (partly done 2026-11-16: the disk image mounts and holds the app and the Applications shortcut; name, identifier, version 0.1.0, Apple Silicon binary and ad-hoc signature are right; macOS rejects it until "Open Anyway", as expected for an unsigned build. Not launched: a second copy cannot run beside the installed one) The Mac disk image opens and the app launches on the founder's Mac
- [ ] T010 The founder publishes the release (after the model download task)

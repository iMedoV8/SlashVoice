# Baseline and result: The Slash look

Measured on the founder's Mac (Apple M5, 16 GB).

**Method.** A release build, freshly launched (quit, then `open`), window open on the onboarding screen, no speech model downloaded. Resident memory of the main `slash-voice` process, read with `ps` 10 and 30 seconds after launch. The web view's own processes are not counted, the same as in the earlier measurement. App size is `du -sh` of the `.app` bundle.

| Measure                                 | Before (2026-11-14, commit `cb1aa58`) | After  | Budget       |
| --------------------------------------- | ------------------------------------- | ------ | ------------ |
| Memory, main process, 10 s after launch | 119 MB                                | 107 MB | under 150 MB |
| Memory, main process, 30 s after launch | 119 MB                                | 107 MB | under 150 MB |
| App size                                | 31 MB                                 | 32 MB  | reported     |

After: 2026-11-15, the release build of this branch. The drop in memory is within launch-to-launch noise and is not claimed as an improvement; the size grows by about 1 MB for the bundled typefaces.

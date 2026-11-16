# Research: Installers built by the pipeline

Read on 2026-11-16. Each fact names where it was read.

## R1. What is inside the installers

- **Decision**: The installers carry the app, its runtime libraries and one model: the silence detector `silero-vad-v6.2-F32.gguf`. No speech model is inside; those are downloaded when the user picks one.
- **Read from**: `src-tauri/tauri.conf.json` (`resources/**/*`), `git ls-files src-tauri/resources/models` (one file, added by Handy's commit `3985508`).

## R2. The licence of the bundled silence detector

- **Licence**: MIT, copyright "2020-present Silero Team". Read in full from the upstream repository's `LICENSE` (`snakers4/silero-vad`). The converted file's page (`handy-computer/silero-vad-v6.2-gguf` on Hugging Face) states the same licence.
- **What it asks**: the copyright notice and the permission notice travel with copies. The notice is added to `CREDITS.md`.
- **Integrity**: the file in the repository has SHA-256 `0d871a80…1c88e6`, the value the catalogue pins for it. `tests-look/workflows.test.ts` checks this.
- **Not verified**: that the conversion to this file format changed nothing but the format. That rests on Handy's catalogue.

## R3. Where speech models come from today

- **Fact**: all 76 catalogue entries are files in Hugging Face repositories under `handy-computer`, each pinned to a revision with a SHA-256 (`src-tauri/src/catalog/catalog.json`). Hugging Face is tried first.
- **Fact**: when that fails, the app tries `https://blob.handy.computer`, Handy's own storage (`MIRRORS` in `src-tauri/src/catalog/mod.rs`). Handy's test `every_offered_model_has_mirror_fallbacks_with_hashes` asserts that fallback exists.
- **Fact**: five older models download from that server directly (`src-tauri/src/managers/model.rs`).
- **Licence labels in the catalogue** (labels only, not read in full): Apache-2.0 27, MIT 22, CC-BY-4.0 16, "other" 8, CC-BY-SA-4.0 1, and two non-commercial (CC-BY-NC-4.0, CC-BY-NC-SA-4.0). One of the five models recommended at onboarding is labelled "other".
- **Decision**: not changed in this task. It is the next task, because it touches model downloads (`RULES.md` §3, second review) and one of Handy's tests.

## R4. Testing a hand-started workflow before it is merged

- **Fact**: GitHub runs a hand-started workflow only when its file is on the default branch.
- **Decision**: the workflow also runs its build jobs on a pull request that changes the workflow file. That tests the builds before the file reaches `main`, and from then on whenever the file changes. The job that creates the release runs only when started by hand.
- **Not verified here**: stated from GitHub's documented behaviour, not re-read today.

## R5. Why the release is a draft and a pre-release

- **Decision**: a draft, so nothing is public until the founder has tried the Windows installer; a pre-release, because the app is early and unsigned.
- **Consequence**: GitHub's "latest release" link skips pre-releases, so links must name the release's tag.

## R6. Actions and their pinned commits

| Action                         | Version | Commit                                     | Read from              |
| ------------------------------ | ------- | ------------------------------------------ | ---------------------- |
| `actions/checkout`             | v7.0.1  | `3d3c42e5aac5ba805825da76410c181273ba90b1` | `checks.yml`           |
| `oven-sh/setup-bun`            | v2.2.0  | `0c5077e51419868618aeaa5fe8019c62421857d6` | `checks.yml`           |
| `humbletim/install-vulkan-sdk` | v1.2    | `30ba978f977e81b72d091fc8888feb1fb26f9aff` | GitHub API, 2026-11-16 |
| `actions/upload-artifact`      | v7.0.2  | `cf430e030ddbb5b0abf93d22962f4752f3646cd9` | GitHub API, 2026-11-16 |
| `actions/download-artifact`    | v7      | `37930b1c2abaa49bbe596cd826c3c89aef350131` | GitHub API, 2026-11-16 |

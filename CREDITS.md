# Credits

Slash Voice stands on other people's work. This file names the main pieces and their licences.

## Handy

Slash Voice is built on [Handy](https://github.com/cjpais/Handy) by CJ Pais and its contributors, under the MIT licence. Handy's copyright notice is in [LICENSE](LICENSE), and its commit history is kept in this repository.

## Typefaces, bundled in the app

| Typeface             | Licence | Package                               |
| -------------------- | ------- | ------------------------------------- |
| Onest                | OFL-1.1 | `@fontsource-variable/onest`          |
| JetBrains Mono       | OFL-1.1 | `@fontsource-variable/jetbrains-mono` |
| IBM Plex Sans Arabic | OFL-1.1 | `@fontsource/ibm-plex-sans-arabic`    |

Each package carries the licence text of its typeface.

## Icons

[Lucide](https://lucide.dev), ISC licence.

## Speech models

Slash Voice ships no speech model. Models are downloaded when you choose them, and each has its own licence. Their licences have not all been read in full by this project yet; that is required before a model is offered in a published installer ([RULES.md](RULES.md) §3).

## Code libraries

The Rust and JavaScript libraries the app is built from are listed, with their versions, in `src-tauri/Cargo.lock` and `bun.lock`. Each keeps its own licence. An automatic licence check for them is planned and not set up yet.

## Working files for coding agents

The files in `.claude/skills/` and `.specify/` are copied from these projects:

| Files                                                                         | From                                                      | Licence    |
| ----------------------------------------------------------------------------- | --------------------------------------------------------- | ---------- |
| `codebase-design`, `diagnosing-bugs`, `grill-me`, `grilling`, `handoff`, `pr` | [mattpocock/skills](https://github.com/mattpocock/skills) | MIT        |
| `e2e`                                                                         | [tester-army/e2e](https://github.com/tester-army/e2e)     | Apache-2.0 |
| `speckit-*`, `.specify/`                                                      | [github/spec-kit](https://github.com/github/spec-kit)     | MIT        |

# Contributing to Slash Voice

Thank you for wanting to help. Slash Voice is early and has one maintainer, so this guide is short and strict about a few things.

Slash Voice is built on [Handy](https://github.com/cjpais/Handy). A bug in the speech engine, the recorder or the pasting may be Handy's too; if you can reproduce it in Handy, it is best fixed there, and Slash Voice will pick the fix up.

## Before you start

- **Bugs:** search the [issues](https://github.com/iMedoV8/slash-voice/issues) first, then open one with the bug form.
- **Features and ideas:** open an issue and describe the problem before writing code. A feature that arrives as a surprise pull request is likely to be declined. The planned features are listed in the [readme](README.md).
- **Security problems:** do not open an issue. See [SECURITY.md](SECURITY.md).

## Set up

You need [Rust](https://rustup.rs/), [Bun](https://bun.sh/) and the tools for your system listed in [BUILD.md](BUILD.md).

1. Fork the repository and clone your fork.

   ```bash
   git clone https://github.com/YOUR_USERNAME/slash-voice.git
   cd slash-voice
   ```

2. Install the dependencies.

   ```bash
   bun install
   ```

3. Run the app.

   ```bash
   bun run tauri dev
   ```

   On macOS, if you see cmake errors, run it as `CMAKE_POLICY_VERSION_MINIMUM=3.5 bun run tauri dev`.

How Handy's code is organised, and where to add things, is in [docs/handy-code-guide.md](docs/handy-code-guide.md).

## How work is done here

The full rules are in [AGENTS.md](AGENTS.md) and [RULES.md](RULES.md). They are written for people and for coding agents alike. The parts that matter most:

1. **A short spec first.** Every change has a folder under `specs/` with what it does, how it is tested and which rules it touches. `specs/002-keep-in-dock/` is a small example. For a typo or a one-line fix, the pull request description is enough.
2. **Tests first.** Write the test, see it fail, then write the code. Never delete, weaken or skip an existing test, Handy's included.
3. **One change, one pull request,** on a branch named `task/<number>-<short-name>`.
4. **Keep changes to Handy's files small.** New features go in their own module. If you touch one of Handy's files, say why in the pull request. This keeps it possible to take Handy's future fixes.
5. **All text a user sees goes in the locale files,** never in a component. A screen is done only when it works in English and in Arabic, right to left.
6. **Design comes before code.** A change to how a screen looks follows [DESIGN.md](DESIGN.md) and needs the maintainer's agreement before it is built.

## Before you open a pull request

Run the local gate and read its output.

```bash
bun run check
```

```bash
bun run security
```

`bun run check` runs the linter, the formatter, the translation checks, the look checks, the screens build, Rust formatting and Rust tests. `bun run security` scans for secrets and needs [gitleaks](https://github.com/gitleaks/gitleaks).

If a check cannot run on your machine, say so in the pull request. Do not report it as passed.

## The pull request

The form asks for what `RULES.md` §6 requires: what changed, how it was tested, which rules and performance targets it touches, what is not tested, screenshots in English and Arabic for a screen change, and which of Handy's files were changed and why.

**Coding agents are welcome.** Say which one you used and how much. You are responsible for every line you submit: read it, run it, and be ready to explain it.

## Translations

See [CONTRIBUTING_TRANSLATIONS.md](CONTRIBUTING_TRANSLATIONS.md).

## Licence

By contributing, you agree that your contribution is licensed under the [MIT licence](LICENSE).

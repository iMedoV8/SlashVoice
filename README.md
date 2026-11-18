# Slash Voice

**Dictation for people who talk to coding agents. Hold a key, speak, and the text appears where the cursor is. Speech is turned into text on your own computer.**

Slash Voice is a desktop app for macOS and Windows. It is open source under the MIT licence.

> **Early.** This is the first public state of the project. Dictation works. The features that will make Slash Voice its own product are planned and not built. There are no signed installers yet.

## What works today

- Hold a shortcut, speak, release: the text is typed into the app in front.
- Speech models that run on your computer, with a picker to choose between them. A model is downloaded the first time you run the app.
- Silence is removed before transcription.
- A history of your dictations, kept on your computer.
- A list of your own words that the app should get right.
- Optional clean-up of the text by a language model you choose. It is off until you turn it on, and only text is sent, never audio.
- 26 interface languages, with English and Arabic (right to left) treated as first-class.
- Dark and light modes.

## What is planned

None of this is built yet.

- **Technical words come out right.** "Spring Boot", not "spring boots": a technical word list, plus words learned from your own corrections.
- **It learns when you correct it.** Fix the last dictation and the fix becomes a rule.
- **Names as your project spells them.** File and symbol names from the project you are working in.
- **Voice slash commands.** Say the command and the app types the agent's real `/command`.
- **Point and speak.** Say "fix this" and the selected text goes along with your words.
- **Rewrite in your style**, on your computer first.

## Privacy

- Audio never leaves your computer.
- Nothing is sent to a language model unless you turn that on, and then only text.
- There is no telemetry and no analytics.
- Updates come only from this repository's own signed releases (from 0.2.0). The app checks every six hours and asks before restarting; checks can be turned off on the About page.

The rules that hold the project to this are in [RULES.md](RULES.md).

## Install

Installers for Windows (64-bit) and for Macs with Apple Silicon are built by this repository's pipeline and published on the [releases page](https://github.com/iMedoV8/SlashVoice/releases). If that page is empty, the first release has not been published yet: build from source.

The builds are not signed with a paid certificate, so both systems warn you on first launch:

- **Windows** says "unknown publisher". Choose **More info**, then **Run anyway**.
- **macOS** says it cannot verify the app. Open **System Settings → Privacy & Security** and choose **Open Anyway**.

macOS also asks for two permissions: the microphone, to hear you, and accessibility, to type the text into other apps.

## Build from source

You need [Rust](https://rustup.rs/), [Bun](https://bun.sh/) and the [Tauri prerequisites](https://tauri.app/start/prerequisites/). The details for each system are in [BUILD.md](BUILD.md).

```bash
git clone https://github.com/iMedoV8/SlashVoice.git
cd SlashVoice
bun install
```

Run it in development, or build the app:

```bash
bun run tauri dev
```

```bash
bun run tauri build
```

## Known limits

- **Slash Voice does not host the speech models yet.** They are downloaded from Hugging Face repositories published by the author of the app it is built on. If Hugging Face cannot be reached, the download fails; there is no second server.
- **Linux is not supported.** The Linux code and packaging files that came with the code base are still in the repository and are untested here.
- **No paid certificate.** Mac builds are signed with a free, self-made certificate and Windows builds are not signed, so both systems warn on the first install by hand. No Intel Mac build and no Windows ARM build.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) first. The short version: every change starts with a short written spec, tests come before the code, and `bun run check` must pass before a pull request.

If you work with a coding agent, [AGENTS.md](AGENTS.md) and [RULES.md](RULES.md) are written for it.

To report a security problem, see [SECURITY.md](SECURITY.md).

## Built on Handy

Slash Voice is built on [Handy](https://github.com/cjpais/Handy), an open-source dictation app by CJ Pais, used under the MIT licence. The speech engine, the recorder, the pasting into other apps and most of the code you will read here are Handy's work. Its full commit history is kept in this repository.

Slash Voice is a separate project. Handy and its author do not endorse it and are not responsible for it. If Slash Voice is useful to you, Handy deserves much of the thanks.

Other work this project depends on is listed in [CREDITS.md](CREDITS.md).

## Licence

[MIT](LICENSE).

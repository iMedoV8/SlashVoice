# Product

<!-- impeccable:product-schema 1 -->

Confirmed by the founder on 2026-11-13. The fuller record is `docs/2026-11-11-slash-voice-design.md`. The Slash brand and voice are in `../Slash/PRODUCT.md` and `../Slash/DESIGN.md` and are changed only there.

## Platform

web

The screens are web technology inside a desktop app (Tauri) for Mac and Windows. There is no browser version and no mobile app.

## Users

The founder and his developer friends, who talk to coding agents all day. The founder is on a Mac; his friends are all on Windows. They dictate prompts into terminals and editors running Claude Code, Codex and Cursor, and ordinary text into every other app. The founder also speaks Arabic mixed with English technical terms. It is built so it can later be released to other developers.

## Product Purpose

Hold a key, speak, and the text appears where the cursor is. Speech is turned into text on the device. Success is that the founder and his friends use it every day in place of the dictation tool they have now, because technical words come out right and it gets better the more they correct it.

## Positioning

A local dictation app that knows it is talking to a coding agent. Other tools return what they heard. Slash Voice is meant to get technical words right, learn from each correction, spell file and symbol names as they are in the project, and type the agent's own slash commands. None of this is built yet; today the app is Handy with the Slash Voice name.

## Operating Context

- A small window for onboarding, settings, models and history; a menu-bar or tray icon; and a small overlay shown while speaking.
- It is used with the main window closed almost all of the time. The user is looking at another app.
- Typical places the text lands: Terminal, iTerm2, Ghostty, Warp, VS Code, Cursor, browsers, chat apps.
- Two system permissions are needed on Mac: microphone and accessibility.
- A speech model is downloaded on first run.

## Capabilities and Constraints

- Works today (from Handy): hotkey dictation, local speech models with a picker, silence removal, pasting into any app, history, a manual list of custom words, optional text cleanup by a language model, 26 screen languages.
- Planned, not built: learning from corrections, technical vocabulary built from the user's own history and projects, repo-aware names, voice slash commands, point-and-speak, rewrite in the user's style, live preview, spoken agent status.
- **Arabic mixed with English is part of the product from the start**, not a later addition. Which speech model serves it is not decided; it is to be measured on the founder's own recordings.
- Audio stays on the device unless the user chooses an option that says otherwise. Only text may be sent to a rewrite model, and only when turned on.
- Self-update is off. The builds are not signed with a paid certificate.
- Built on a renamed copy of Handy (MIT). Handy's name, logo, icon and mascot never appear; a "Built on Handy" credit stays on the About screen.
- Open: the licences of the speech models, where models are hosted, pricing, and whether the code is open source.

## Brand Commitments

- The name "Slash Voice" is a working name.
- It takes the Slash theme: the accent `#F0532B`, neutral greys, the Onest typeface, and the "/Slash" logo family (founder, 2026-11-12). The values are in `../Slash/DESIGN.md`.
- Ruled out by the founder for Slash: gradients, glows, purple, colours not asked for, mascots and cartoon shapes.
- Voice and wording follow `../Slash/PRODUCT.md` and the glossary in `../Slash/docs/01-glossary.md`.
- Open: the Slash Voice logo and app icon.

## Evidence on Hand

- About 1,700 of the founder's own dictation recordings, on his machine only, for testing. Never committed, never used in automated tests.
- Handy's published accuracy and speed figures for its models (`research/handy-study.md`). They are for read, general speech, not technical words or dialect.
- One measurement of ours: the release build used 112 to 126 MB with no model loaded on the founder's Mac.
- There are no customers, testimonials, usage numbers or benchmarks of our own. None may be invented.

## Product Principles

- Out of the way. The product is the text that appears in another app; the window is for setup.
- A wrong name is worse than no name. Corrections are applied only when the match is confident.
- What the user said is kept. A rewrite never drops a negation, "only", a number or code.
- Private by default. Nothing leaves the device unless the user chose it, and the app says so plainly.
- Honest about state. What is recording, what is still working and what failed are always visible, and never by colour alone.

## Accessibility & Inclusion

- English and Arabic, with right-to-left layout, are both first-class.
- Dark and light modes.
- Dictation is itself an accessibility aid for people who find typing hard; the app must be fully usable by keyboard.

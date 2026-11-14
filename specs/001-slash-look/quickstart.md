# Quickstart: checking the Slash look

How to prove this task works. On this Mac, add `/opt/homebrew/opt/rustup/bin` to `PATH` first.

## 1. The automated checks

```bash
bun run check
```

```bash
bun run security
```

Expected: the look checks pass (tokens, contrast, banned colours, nothing remote, artwork set); the linter and translation checks pass; Handy's Rust tests give 346 passed and 20 ignored, the same as before.

To run only the look checks:

```bash
bun test tests-look
```

## 2. Build and open the app

```bash
bun run tauri build --bundles app
```

```bash
open "src-tauri/target/release/bundle/macos/Slash Voice.app"
```

## 3. Compare the three screens with their stills

Each screen is compared by eye with its still in `design/stills/`, at the same window size. Values listed as samples in `design/README.md` may differ.

| Screen      | How to reach it                    | Still                     |
| ----------- | ---------------------------------- | ------------------------- |
| Welcome     | First launch with no settings      | `04-welcome.png`          |
| Permissions | Continue from Welcome              | `05-permissions.png`      |
| General     | Finish setup, open the main window | `06-general-settings.png` |

Then repeat in light mode (About, Theme) and with the menus in Arabic (About, App language). Capture each as a picture for the pull request: three screens, two modes, two languages.

Light mode has no still. The founder approves it from these pictures before the change is merged.

## 4. Outside the window

- The Dock icon is the slash with two sound arcs on a dark ground, at every size, with no purple (`02b-app-icon-chosen.png`).
- The menu-bar mark matches `03-menu-bar-icon-states.png`: start a dictation and watch it go from the slash alone, to the slash with a dot, to the slash with the spinner mark, and back.
- macOS can keep showing an old icon from its cache after a rebuild. If the Dock shows the purple one, remove the app from the Dock and open it again.

## 5. Nothing else changed

- Use every control on the three screens once and confirm it does what it did.
- Open History, Models, Advanced, Post Process and About: they are in the new colours and type, usable, with no pink.
- Memory: with the window open and no model loaded, the main process stays under 150 MB (baseline 112 to 126 MB).

## Not checked by this guide

- Windows. There is no Windows build.
- A different icon in light mode. Not delivered by this task (see `plan.md`).

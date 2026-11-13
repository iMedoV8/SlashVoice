# Design rules: Slash Voice

**Read this file and `../Slash/DESIGN.md` in full before any design work on Slash Voice**: a mockup, a screen in code, a component, a colour or a typeface change.

Slash Voice has no look of its own yet. The founder decided on 2026-11-12 that it takes the Slash theme. This file says how that applies here and what is still open. It does not copy the brand: the values live in `../Slash/DESIGN.md` and are changed only there.

## Where the app stands today

- The screens are Handy's: its layout, its pink accent and its type.
- The artwork in the app is the first build's (`branding/`): the slash with two sound arcs, with the arcs in purple. The founder kept the mark and ruled out the purple (see "Decided" below). The app still ships the purple version until the new colours are built.
- The tile beside the logo on the first onboarding screen is a placeholder. The Slash brand rules out mascots and childish shapes, and the redrawn welcome screen has no tile.

## What is taken from the Slash brand

| What                    | Rule                                                                                                                              | Source in `../Slash/DESIGN.md` |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Accent                  | `#F0532B`, used for the one main action on a screen and the current selection, and nowhere else                                   | Colors                         |
| Window and surfaces     | Neutral greys: dark `#121212`, light `#F5F5F3`; surfaces are tints of the window, lines are hairlines                             | Colors                         |
| State colours           | Green done, red failed, amber waiting or not checked, blue information; never colour alone, each state has its own icon shape     | Colors                         |
| Running work is not red | Recording and transcribing are work in progress, so they are never shown in the accent or in danger red                           | Colors                         |
| Typefaces               | Onest for the interface, JetBrains Mono for code and paths, IBM Plex Sans Arabic for Arabic                                       | Typography                     |
| Corners                 | 7 to 8 on controls, 10 on cards, 12 on panels, 16 on dialogs                                                                      | Shapes                         |
| Icons                   | Lucide, one weight; never emoji or drawn shapes as icons                                                                          | Shapes                         |
| Depth                   | Tint, not shadow; shadows only for things that float                                                                              | Elevation & Depth              |
| Logo                    | The word with a slash in front; the slash is the accent, weight 800; the word is Onest 700. The app icon is the slash on a square | Shapes, D-157                  |
| Dark first              | Dark is the main mode; light and Arabic right-to-left follow the same rules                                                       | Overview                       |
| Ruled out               | Gradients, glows, purple, colours not asked for, mascots, cartoon shapes, controls the founder did not ask for                    | Overview                       |

`../Slash/DESIGN.md` says its rules cover the Slash app and must not be carried elsewhere without asking. The founder asked for the Slash theme here, so the table above is what was asked for. Its layout rules (four columns, thread list, dock, receipt) describe a different product and do not apply.

## Decided by the founder (2026-11-13)

- **Logo: option B.** The Slash logo unchanged ("/Slash", the slash in the accent at weight 800, the word in Onest 700), with "Voice" beside it in Onest 400 in the secondary text colour. Still: `design/stills/01-logo-options.png`, Pencil frame `VkI5O`.
- **App icon: the slash with two sound arcs.** The mark from the first build is kept; only its colours change. This is Slash Voice's own icon and differs from the Slash icon, which is the slash alone.
- **App icon colours.** Dark mode: dark ground `#1A1A1A`, the mark in the accent. Light mode: the accent as ground, the mark in white. Still: `design/stills/02b-app-icon-chosen.png`, Pencil frame `o7TzPg`.

## Open, for the founder

- **The arcs in dark mode.** Drawn two ways: the whole mark in the accent, or the slash in the accent with the arcs in the light text colour. He has not said which.
- **How the icon follows the mode.** Whether macOS and Windows can show a different app icon in dark and light mode for this kind of app is not verified. If they cannot, one of the two is the icon everywhere.
- **Menu-bar and tray icons.** Drawn (idle, recording, transcribing, needs attention) and not approved. As drawn, the idle icon is the slash alone, without the arcs.
- **The three screens** (welcome, permissions, general settings). Drawn and not approved.
- **The recording overlay**, the remaining onboarding steps and the other settings screens are not drawn.

## How design work is done here

1. Read this file and `../Slash/DESIGN.md`. Use the `impeccable` skill.
2. Draw in Pencil first. The founder can move things himself there.
3. Show the stills. Nothing is built in code until he approves them.
4. Design dark first, then check light, then Arabic right-to-left.
5. Change only the frame he named.

**Pencil notes** (from `../Slash/HANDOFF.md`):

- `.pen` files are encrypted. Use only the Pencil tools on them, never Read or Grep.
- Pencil ignores a new file path and draws into the open document at 0,0. Never overwrite frames: place every new frame clear of the existing ones.
- Call `get_app_state` and read its guide before drawing. If calls hang, ask the founder to check the Pencil window.

## Don't

- Add a gradient, a glow, purple or any colour the founder did not ask for.
- Draw a mascot or a face.
- Colour recording or transcribing in the accent or in red.
- Use Handy's name, logo, icon or mascot.
- Build a screen in code before its still is approved.

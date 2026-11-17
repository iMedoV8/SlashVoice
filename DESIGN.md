# Design rules: Slash Voice

**Read this file in full before any design work on Slash Voice**: a mockup, a screen in code, a component, a colour or a typeface change.

Slash Voice takes the Slash theme (founder, 2026-11-12). The brand's source is `../Slash/DESIGN.md`, a private file that is changed only there. Everything this app needs from it is written here and in `specs/001-slash-look/contracts/look-tokens.md`. If you have the private file, read it too; if the two disagree, stop and report it.

## Where the app stands today

Built (`specs/001-slash-look`):

- The Slash palette in dark and light, Onest, JetBrains Mono and IBM Plex Sans Arabic bundled, Slash corners. Values in `specs/001-slash-look/contracts/look-tokens.md`, checked by `tests-look/`.
- Logo option B, the slash-with-arcs app icon (dark ground everywhere; the light one is kept as artwork only), and the four menu-bar states.
- The welcome and permissions screens rebuilt to their stills.
- Handy's pink, its mascot on the welcome screen, and the purple of the first build are gone.

Built (`specs/008-own-look`), direction C:

- The window opens on History. The sidebar has the logo, a status line, History and Words, the settings, About with the version at its foot, and the model in use below. There is no bottom bar.
- Settings groups put their name and one line beside their rows; rows have no info or reset buttons.
- History, Words, General, Models, Post Process, Advanced and About in that layout; the recording pill in Slash's dress, with the accent on its dot and spinner.
- Left out until the features exist: the app per dictation, corrections, word packs and the fix-last-dictation key. The differences from each still are listed in the pull request for `specs/008-own-look`.

Not there yet:

- The later onboarding steps still show the placeholder tile, and onboarding is not drawn in direction C.
- macOS draws menu-bar icons as templates, so the attention mark shows in the menu-bar colour there (its triangle shape still sets it apart); the amber shows on Windows.

**Contrast findings.** Two of the brand's own light values fall short of 4.5 to 1: tertiary text `#767676` on the light window (about 4.2) and white on the accent (about 3.5). They are used as the brand defines them; changing them is a decision for the brand, which is the founder's.

## What is taken from the Slash brand

| What                    | Rule                                                                                                                                                | Source in the brand file                  |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Accent                  | `#F0532B`, used for the one main action on a screen, the current selection and the recording pill's dot and spinner, and nowhere else               | Colors, and the 2026-11-16 decision below |
| Window and surfaces     | Neutral greys: dark `#121212`, light `#F5F5F3`; surfaces are tints of the window, lines are hairlines                                               | Colors                                    |
| State colours           | Green done, red failed, amber waiting or not checked, blue information; never colour alone, each state has its own icon shape                       | Colors                                    |
| Running work is not red | Recording and transcribing are work in progress, so they are never shown in danger red. The accent marks them in one place only: the recording pill | Colors, and the 2026-11-16 decision below |
| Typefaces               | Onest for the interface, JetBrains Mono for code and paths, IBM Plex Sans Arabic for Arabic                                                         | Typography                                |
| Corners                 | 7 to 8 on controls, 10 on cards, 12 on panels, 16 on dialogs                                                                                        | Shapes                                    |
| Icons                   | Lucide, one weight; never emoji or drawn shapes as icons                                                                                            | Shapes                                    |
| Depth                   | Tint, not shadow; shadows only for things that float                                                                                                | Elevation & Depth                         |
| Logo                    | The word with a slash in front; the slash is the accent, weight 800; the word is Onest 700. The app icon is the slash on a square                   | Shapes                                    |
| Dark first              | Dark is the main mode; light and Arabic right-to-left follow the same rules                                                                         | Overview                                  |
| Ruled out               | Gradients, glows, purple, colours not asked for, mascots, cartoon shapes, controls the founder did not ask for                                      | Overview                                  |

The brand file says its rules cover the Slash app and must not be carried elsewhere without asking. The founder asked for the Slash theme here, so the table above is what was asked for. Its layout rules (four columns, thread list, dock, receipt) describe a different product and do not apply.

## Decided by the founder (2026-11-13)

- **Logo: option B.** The Slash logo unchanged ("/Slash", the slash in the accent at weight 800, the word in Onest 700), with "Voice" beside it in Onest 400 in the secondary text colour. Still: `design/stills/01-logo-options.png`, Pencil frame `VkI5O`.
- **App icon: the slash with two sound arcs.** The mark from the first build is kept; only its colours change. This is Slash Voice's own icon and differs from the Slash icon, which is the slash alone.
- **App icon colours.** Dark mode: dark ground `#1A1A1A`, the mark in the accent. Light mode: the accent as ground, the mark in white. Still: `design/stills/02b-app-icon-chosen.png`, Pencil frame `o7TzPg`.

## Decided by the founder (2026-11-16)

- **The layout: direction C, "the sidebar".** The structure the app has today is kept and reworked so that nobody who sees it recognises Handy. The app opens on History. Stills: `design/stills/own-look-c-*`; the full record is in `design/README.md`. Built in `specs/008-own-look`.
- **The recording pill carries the accent.** Its dot is grey while the microphone gets ready and the accent from the moment it is listening. Its spinner is the accent while transcribing and while a model loads. Still: `design/stills/own-look-c-08-pill-dark.png` and `-light`. Built in `specs/008-own-look`.
  - This is a change to the earlier rule that running work never takes the accent. The look contract (`specs/001-slash-look/contracts/look-tokens.md`) and the check `tests-look/banned.test.ts` were updated to allow exactly these two places (`specs/008-own-look`).
  - The brand's private source still states the earlier rule. That is reported to the founder and is his to reconcile there.

## Open, for the founder

- **The arcs in dark mode.** Drawn two ways: the whole mark in the accent, or the slash in the accent with the arcs in the light text colour. He has not said which.
- **How the icon follows the mode.** Whether macOS and Windows can show a different app icon in dark and light mode for this kind of app is not verified. If they cannot, one of the two is the icon everywhere.
- **Menu-bar and tray icons.** Drawn (idle, recording, transcribing, needs attention) and not approved. As drawn, the idle icon is the slash alone, without the arcs.
- **Light mode.** Built on every screen and not yet approved.
- **The last onboarding step** is not drawn in the chosen layout, and the Arabic wording in the direction C stills is a draft.

## How design work is done here

1. Read this file. Use the `impeccable` skill.
2. Draw in Pencil first. The founder can move things himself there.
3. Show the stills. Nothing is built in code until he approves them.
4. Design dark first, then check light, then Arabic right-to-left.
5. Change only the frame he named.

**Pencil notes:**

- `.pen` files are encrypted. Use only the Pencil tools on them, never Read or Grep.
- Pencil ignores a new file path and draws into the open document at 0,0. Never overwrite frames: place every new frame clear of the existing ones.
- Call `get_app_state` and read its guide before drawing. If calls hang, ask the founder to check the Pencil window.

## Don't

- Add a gradient, a glow, purple or any colour the founder did not ask for.
- Draw a mascot or a face.
- Colour recording or transcribing in red, or in the accent anywhere but the recording pill's dot and spinner.
- Use Handy's name, logo, icon or mascot.
- Build a screen in code before its still is approved.

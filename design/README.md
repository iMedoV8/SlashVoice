# Design stills

**Read `DESIGN.md` at the project root first, then `../Slash/DESIGN.md`.** This file is the index of the pictures.

Drawn in Pencil on 2026-11-13 in the Slash theme, dark first. The founder chose the logo (option B) and the app icon (the slash with two sound arcs) the same day; the menu-bar icons and the three screens are **not approved yet**. Nothing here is built in code.

Source: the Pencil document `~/.pencil/documents/979d2fc7-4689-4210-ad85-c793e5bc4b11/SlashVoice.pen`. It is outside this repository.

## Stills (`stills/`)

| File                          | What it shows                                                                       | Pencil frame |
| ----------------------------- | ----------------------------------------------------------------------------------- | ------------ |
| `01-logo-options.png`         | Three logo options: "/Slash Voice", "/Slash" with a lighter "Voice", "/Voice"       | `VkI5O`      |
| `02-app-icon-options.png`     | Slash's three existing icons, to choose which one Slash Voice wears                 | `DjOKa`      |
| `02b-app-icon-chosen.png`     | The chosen mark, the slash with two sound arcs, in dark-mode and light-mode colours | `o7TzPg`     |
| `03-menu-bar-icon-states.png` | Idle, recording, transcribing, needs attention; dark and light bars                 | `SMywP`      |
| `04-welcome.png`              | Onboarding step 1: pick the languages you dictate in                                | `cts7m`      |
| `05-permissions.png`          | Onboarding step 2: microphone and accessibility                                     | `cvnQw`      |
| `06-general-settings.png`     | The main window: navigation and the General settings                                | `cd8Cp`      |

## What the stills assume

- The screens use the chosen logo, option B.
- The content of each screen is the app's real content. The layout, colours and type are new.
- Sample values: the microphone name, and the model shown on the settings screen (`parakeet-unified-en-0.6b` is a real model from the catalogue, but which model is the default is not decided).
- Only dark is drawn. Light, Arabic right-to-left, and the Windows window are not drawn yet.

## Not drawn yet

The remaining onboarding steps (model download, demo, try it), and the History, Models, Advanced, Post Process and About screens. The recording overlay and the last onboarding step are drawn below, as part of the two directions.

## Own look: two directions to choose from (2026-11-15)

Drawn in Pencil for stage 4 of the plan the founder approved on 2026-11-15, so the app stops looking like a copy of Handy. Redrawn the same day at the founder's request (second pass): every window is now 880 by 600, the lists are filled, the pill boards show the mark enlarged in each state, and claims that are not decided were taken out of the screens. **Not approved: the founder picks one.** Nothing here is built in code. Both directions keep the Slash palette, Onest, JetBrains Mono, IBM Plex Sans Arabic, logo option B and the slash-with-arcs mark, and differ in structure. In the Pencil document they sit below the earlier frames: direction A from x 0, direction B from x 3200, each with a title card at the top (`Sieom`, `rNM3t`).

### What differs

|                      | A: The log                                                                                                                                                                                | B: The stage                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Feel                 | A quiet editor: dense rows, hairlines, text first                                                                                                                                         | An instrument: a few large things, more air                                                                                                            |
| Navigation           | Tabs in the title bar (Today, Words) and a gear for Preferences, beside the "/Slash Voice" logo; no sidebar                                                                               | A narrow rail on the left: the mark, Home, Words, Preferences at the bottom. Each page's header carries its title; the word logo appears in onboarding |
| Home                 | A log of today's dictations, each with the app it went into and the word it corrected; the shortcut and a "Ready" state in a band across the top; this week's learned words down the side | The last dictation in large type with its correction and a "Fix a word" button; the shortcut as big keys beside it; today and this week's words below  |
| Recording pill       | A capsule at the bottom of the screen: the mark, a word ("Listening") and a timer                                                                                                         | No capsule: the mark alone in a small tile right beside the text cursor; words appear only when something needs the user                               |
| Transcribing         | The arcs become a spinner, as in the menu-bar icon                                                                                                                                        | The arcs become three dots that scan                                                                                                                   |
| Words                | One table: heard, typed, times used, state; packs and your own words in a side column                                                                                                     | A list on the left (corrections, your words, packs with switches); the chosen list on the right as large before-and-after pairs                        |
| Fix last dictation   | A panel under the word: the sentence, three spellings as radio choices, "Type it yourself", Remember, Replace                                                                             | One line under the word: type the spelling and press Enter; three suggestions as numbered chips; Remember                                              |
| Preferences          | One centred column; theme as three small previews with radios; the other settings as a row of links                                                                                       | Label on the left, controls on the right; theme as three radios with swatches; the shortcut in a large field                                           |
| Last onboarding step | Centred: "Say: Spring Boot", the result in a box, a short receipt of what was heard and typed, then the pill itself with a line saying where it lives                                     | Steps listed on the left; the result field with the mark tile, then "It heard", "It typed", "Because" side by side                                     |

Shared in both: recording and transcribing turn the mark to the text colour, never the accent or red; "needs attention" is the slash in amber with a triangle in place of the arcs, as in the menu-bar icon; the arcs follow the voice (silence, speaking, loud) and reduced motion shows one still mark per state. Each pill still shows the states in place and then the mark enlarged, one per state. Idle is the logo's mark with its arcs dimmed, and direction B's rail shows that same idle mark. The accent appears only on the one primary button, a switch that is on, a selected radio and the logo's slash (direction B's rail mark is the logo's mark).

### Stills (`stills/`)

| Screen                  | Direction A                                              | Pencil frames (dark, light, Arabic) | Direction B                                              | Pencil frames (dark, light, Arabic) |
| ----------------------- | -------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------- | ----------------------------------- |
| 1. Home                 | `own-look-a-01-home-dark.png`, `-light`, `-arabic-dark`  | `ug8ym`, `VjMAu`, `wHfg5`           | `own-look-b-01-home-dark.png`, `-light`, `-arabic-dark`  | `W8wD7l`, `T3ljDk`, `q2vUN`         |
| 2. Recording pill       | `own-look-a-02-pill-dark.png`, `-light`                  | `y1d3zy`, `emKNG`                   | `own-look-b-02-pill-dark.png`, `-light`                  | `yPtyf`, `d9NQe`                    |
| 3. Words                | `own-look-a-03-words-dark.png`, `-light`, `-arabic-dark` | `VHtuB`, `p4VNB`, `kKUWW`           | `own-look-b-03-words-dark.png`, `-light`, `-arabic-dark` | `dBGKl`, `e4907`, `MiEa5`           |
| 4. Fix last dictation   | `own-look-a-04-fix-dark.png`, `-light`                   | `Drt3A`, `iVxRW`                    | `own-look-b-04-fix-dark.png`, `-light`                   | `d5pbV`, `K6ckJ`                    |
| 5. Preferences          | `own-look-a-05-preferences-dark.png`, `-light`           | `qsPOw`, `j5Zt5H`                   | `own-look-b-05-preferences-dark.png`, `-light`           | `faZKg`, `WRHRP`                    |
| 6. Last onboarding step | `own-look-a-06-onboarding-dark.png`, `-light`            | `D2lhna`, `Vc8fi`                   | `own-look-b-06-onboarding-dark.png`, `-light`            | `cy7q1`, `M4sOuP`                   |

### What the founder said (2026-11-15, after the second pass)

- **Direction B is preferred** for the app as a whole: the rail, Words, Preferences and the onboarding layout.
- **The recording pill is A's**: the capsule at the bottom of the screen (`own-look-a-02-pill-*`). B's tile beside the cursor is dropped.
- **Fix last dictation is A's**: the panel with the list of spellings (`own-look-a-04-fix-*`). B's one-line bar is dropped.
- **Home is not good enough in either direction.** Three new options were drawn for it in B's structure, dark only, and are waiting for his choice.

Because of the pill choice, B's last onboarding step no longer shows the mark tile in the try field; it now ends with A's capsule and a line saying where it sits (`own-look-b-06-onboarding-*` were re-exported).

| Home option           | Still                                  | Pencil frame | Idea                                                                                                                                                          |
| --------------------- | -------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. The shortcut leads | `own-look-b-01-home-option-1-dark.png` | `fruCF`      | The mark and "Hold ⌥ Space and speak" centred across the top; today's dictations and this week's words below, side by side                                    |
| 2. A sentence leads   | `own-look-b-01-home-option-2-dark.png` | `pIadR`      | One sentence about today, with the shortcut beside it; one log with the app and the corrected word on each row; this week's words in a strip along the bottom |
| 3. The instrument     | `own-look-b-01-home-option-3-dark.png` | `HHa94`      | A panel on the left with the mark, "Ready", the shortcut and the fix shortcut; today's dictations and this week's words on the right                          |

In options 1 and 3 the mark is large on the page, so the rail has no mark; if one of them is chosen, the rail on Words and Preferences loses its mark too. The sentence in option 2 ("14 dictations today. 6 words came out right because you taught them.") is sample text. The first Home stills (`own-look-a-01-home-*`, `own-look-b-01-home-dark/light/arabic-dark`) are kept for comparison. Light and Arabic are drawn after one option is chosen.

### Direction C: The sidebar (2026-11-16)

The founder then asked for one more option: keep the structure the app has today, which he finds good, improve it, and make sure nobody who sees it recognises Handy. Direction C is that.

**The founder chose direction C as the app's look on 2026-11-16 ("Yes, go with C").** Directions A and B above, and the three Home options, are superseded and kept only for the record: in direction C the app opens on History, so there is no Home page. From A, the fix-last-dictation panel still stands. The recording pill is the one in still 8 below. Nothing here is built in code. In the Pencil document it sits to the right of direction B, from x 6400, under the title card `l8A21`; dark in the left column, light in the right.

What it keeps from today's app: a sidebar of named pages on the left, one page on the right, settings as a label with its control.

What it changes:

|                        | Today's app (Handy's structure)                                                | Direction C                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Opens on               | General settings                                                               | History: today's dictations, grouped by day, each with the app it went into and the word it corrected     |
| Top of the sidebar     | The word logo                                                                  | A status block: the mark, its state ("Ready") and the shortcut, on every page                             |
| Sidebar order          | General, History, Models, Advanced, Post Process, About                        | History and Words first, then General, Models, Rewrite, Advanced; About at the foot with the version      |
| Foot of the window     | A bar across the bottom with the model, update state and version               | No bar. The model in use sits at the foot of the sidebar                                                  |
| Settings               | A small title above each group, an info button and a reset button on every row | The group's name and one line about it on the left, its rows on the right; no boxes, no info buttons      |
| Words                  | Custom words are one row inside Advanced                                       | Its own page: corrections as heard and typed, word packs with switches, your own words                    |
| Theme and app language | On the About page                                                              | On General, under Appearance                                                                              |
| Advanced               | One long page                                                                  | The same page, with its four groups as a jump control in the header                                       |
| History                | Cards with a player                                                            | A log: time, app, text, the correction under it; copy, save, play and delete on the row under the pointer |

**The recording pill (still 8) was redrawn on 2026-11-16 at the founder's word.** He does not like the mark with moving arcs as the recording sign, nor the rounded status boxes, and he likes the overlay the app has today: a dot, nine level bars and a cancel button, then a spinner with "Transcribing…". A first redraw leaned the nine bars at the angle of the logo's slash; he ruled that out too ("the slash is not a good idea"). Still 8 now keeps today's pill as it is in form: the dot (dim while the microphone gets ready), nine upright bars that follow the voice, the cancel button, the optional timer, and a spinner with "Transcribing…" or "Loading model…" while it works. "Needs attention" is an amber outline, a triangle and a line of words. Only the dress changes: Slash's surface and hairline, Onest for the words, JetBrains Mono for the timer. Ruled out for the pill: the mark with moving arcs, boxed rows of states, and leaning bars. The colour was settled after the options below.

He then asked for options that bring more of Slash into it, by colour or by a slash in place of the dot. Six are drawn in `own-look-c-08-pill-options-dark.png` (Pencil `mFe71`), dark only, each in three states (getting ready, speaking, transcribing) and all in today's form:

| Option                      | What changes                                                                     |
| --------------------------- | -------------------------------------------------------------------------------- |
| 1. As last drawn            | Nothing: white dot, white bars                                                   |
| 2. Orange dot               | The dot turns the accent when the microphone is listening                        |
| 3. Slash for the dot        | The logo's slash, in the text colour, stands where the dot was and does not move |
| 4. Orange slash for the dot | The same slash in the accent, as in the logo                                     |
| 5. Orange voice             | The dot stays white; the bars take the accent                                    |
| 6. Slash-cut pill           | The pill's two ends are cut at the slash's angle; dot and bars as today          |

**The founder chose option 2, the orange dot, and asked for the spinner to be orange as well (2026-11-16).** Still 8 (`own-look-c-08-pill-dark.png`, `-light`) now shows that in every state:

- The dot is grey while the microphone gets ready and the accent from the moment it is listening.
- The spinner is the accent while transcribing and while the model loads.
- The nine bars, the words and the timer stay in the text colour. "Needs attention" stays amber. Red is not used.

**This changes a rule and is not yet written where the rule lives.** The brief for these screens said recording and transcribing never use the accent, and `DESIGN.md` limits the accent to the primary button, a switch that is on, a selected radio and the logo's slash. The pill's dot and its spinner are two new uses, chosen by the founder. `DESIGN.md` at the project root needs that recorded; this session does not touch it. If he approves it, it replaces his earlier pick of A's capsule, and the capsule in B's last onboarding step and the status block at the top of C's sidebar need the same treatment; whether that block stays at all is an open question. The fix panel is not redrawn: it is A's.

| Page              | Stills                                                     | Pencil frames (dark, light, Arabic) |
| ----------------- | ---------------------------------------------------------- | ----------------------------------- |
| 1. History        | `own-look-c-01-history-dark.png`, `-light`, `-arabic-dark` | `X7D8eS`, `ZNRhh`, `nsq9a`          |
| 2. Words          | `own-look-c-02-words-dark.png`, `-light`, `-arabic-dark`   | `O86vK`, `h9F8tS`, `tQ1uR`          |
| 3. General        | `own-look-c-03-general-dark.png`, `-light`                 | `NESDV`, `Mp23y`                    |
| 4. Models         | `own-look-c-04-models-dark.png`, `-light`                  | `XGAo0`, `io3pt`                    |
| 5. Rewrite        | `own-look-c-05-rewrite-dark.png`, `-light`                 | `mKAOm`, `j3gYiF`                   |
| 6. Advanced       | `own-look-c-06-advanced-dark.png`, `-light`                | `YtUbp`, `H9XF6`                    |
| 7. About          | `own-look-c-07-about-dark.png`, `-light`                   | `eIZvf`, `FpTZ3`                    |
| 8. Recording pill | `own-look-c-08-pill-dark.png`, `-light`                    | `gU9p5`, `NZlxg`                    |

Open points in direction C, for the founder:

- **"Rewrite" as the page name.** The app calls it "Post Process" today; the design document calls the feature rewrite. The glossary does not settle it.
- **"Built on Handy" stays on About.** `AGENTS.md` and Handy's licence require the credit, so the look is not Handy's but the name appears once, there.
- **Model sizes and the download percentage are sample numbers.** The model names are from the catalogue; the one-line descriptions are the app's own text.
- **The status block at the top of the sidebar** (the mark, "Ready", the shortcut, in a rounded box). The founder ruled out the mark with moving arcs and boxed states for the pill; whether this block stays, and in what form, has been asked and not answered.
- **Arabic is drawn for History and Words only**, in dark, and its wording is an unreviewed draft. The dictations in it are Arabic with English technical words; the two that are shell commands stay in English.
- **Not drawn:** Arabic for the other pages, the Debug page, the last onboarding step in this look with the new pill, the remaining onboarding steps, and a Home page (in this direction History is what the app opens on).
- **`DESIGN.md` at the project root is not updated** with this choice or with the accent on the pill's dot and spinner. It is outside the paths this work was allowed to touch.

### What the stills assume

- **Sample content.** The dictations, counts (14 dictations, 1,284 words, pack sizes such as Spring 212), learned words, the shortcut for fixing (⌥ ⇧ Z) and the "two fixes before it applies on its own" rule are invented to show the screens. None is decided or measured.
- **Arabic wording is not reviewed.** Only "اليوم" (Today) and "حزمة" (Pack) come from the approved list in `../Slash/docs/06-ux.md` §8; every other Arabic phrase is a first draft for the founder to correct. Arabic is drawn in dark only.
- **Apps are shown with Lucide icons** (terminal, code, chat, globe) and their names, not their logos.
- **The light window colours** come from the brand, so the two known contrast misses in `DESIGN.md` (tertiary text, white on the accent) show here too.
- **Not drawn:** Windows window chrome, Arabic for the pill, fix panel, preferences and onboarding, and the screens listed under "Not drawn yet".

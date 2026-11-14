# Look contract: tokens

The values the app must use after this task. They are copied from `../Slash/DESIGN.md` on 2026-11-14 so the checks have something to compare against; that file stays the source of truth, and if it changes this table is corrected, not the other way round.

## Colours

| Role                                                  | Handy's token name (kept) | Dark                    | Light                  |
| ----------------------------------------------------- | ------------------------- | ----------------------- | ---------------------- |
| Window                                                | `background`              | `#121212`               | `#F5F5F3`              |
| Text, primary                                         | `text`                    | `#ECECEC`               | `#1A1A1A`              |
| Text, secondary                                       | `ink-2`                   | `#A6A6A6`               | `#5C5C5C`              |
| Text, tertiary                                        | `ink-3`                   | `#858585`               | `#767676`              |
| Hairline                                              | `line`                    | `#FFFFFF1F` (white 12%) | `#00000017` (black 9%) |
| Raised surface                                        | `wash`                    | `#FFFFFF16` (white 9%)  | `#0000000F` (black 6%) |
| Selected row                                          | `selected` (new)          | `#FFFFFF1F` (white 12%) | `#00000017` (black 9%) |
| Sunken area                                           | `sunken` (new)            | `#00000045` (black 27%) | `#0000000D` (black 5%) |
| Accent                                                | `accent` (new)            | `#F0532B`               | `#F0532B`              |
| Text on the accent                                    | `on-accent` (new)         | `#1B0A04`               | `#FFFFFF`              |
| Done, passed                                          | `moss`                    | `#4CC38A`               | `#1A7F4B`              |
| Failed                                                | `error`                   | `#E5484D`               | `#C62828`              |
| Waiting, attention                                    | `warning`                 | `#E2A336`               | `#9A6700`              |
| Information                                           | `info` (new)              | `#5B9DFF`               | `#1F6FEB`              |
| Hover, focus ring, chip (Handy's highlight)           | `logo-primary`            | same as text, primary   | same as text, primary  |
| Key caps                                              | `plum`                    | same as text, primary   | same as text, primary  |
| Handy's primary fill (progress, spinners, step marks) | `background-ui`           | same as text, primary   | same as text, primary  |

## Where the accent may appear

- The fill of the one primary button on a screen.
- A switch that is on.
- A selected radio.
- The slash in the logo.

Nowhere else. Recording and transcribing never use the accent or the failed red.

## Colours that must not appear

In the screens' source, the stylesheets and the artwork: Handy's pinks `#faa2ca`, `#f28cbb`, `#da5893`; the first build's purples `#8B7CFF`, `#7C6CF0`, `#6C5CE7`; any gradient or glow.

## Typefaces

| Use                                | Family                                  | Bundled from                          |
| ---------------------------------- | --------------------------------------- | ------------------------------------- |
| Interface                          | Onest                                   | `@fontsource-variable/onest`          |
| Code, paths, key caps, model names | JetBrains Mono                          | `@fontsource-variable/jetbrains-mono` |
| Arabic                             | IBM Plex Sans Arabic                    | `@fontsource/ibm-plex-sans-arabic`    |
| Chinese, Japanese, Korean          | Handy's bundled subset, then the system | already in the app                    |

Sizes: 13 body, 12 to 12.5 labels and metadata, 14 to 16 titles, 24 to 26 for a screen's one heading. Weights: 400 body, 500 row titles and labels, 600 buttons and emphasis, 700 screen titles.

## Corners

8 on controls, 7 on chips and tabs, 10 on cards, 12 on panels, 16 on dialogs.

## Contrast

| Pair                                 | Required          | Note                                                                                                                                                                              |
| ------------------------------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Text primary on window, both modes   | at least 4.5 to 1 |                                                                                                                                                                                   |
| Text secondary on window, both modes | at least 4.5 to 1 |                                                                                                                                                                                   |
| Text tertiary on window, dark        | at least 4.5 to 1 |                                                                                                                                                                                   |
| Text tertiary on window, light       | at least 3 to 1   | Known miss against 4.5: `#767676` on `#F5F5F3` is about 4.2. Tertiary is for labels and metadata only. Reported to the founder; the value is the brand's and is not changed here. |
| Text on the accent, dark             | at least 4.5 to 1 |                                                                                                                                                                                   |
| Text on the accent, light            | at least 3 to 1   | Known miss against 4.5: white on `#F0532B` is about 3.5. Reported to the founder; the value is the brand's and is not changed here.                                               |

`../Slash/DESIGN.md` says its values were matched by eye and are not contrast-tested. The two misses above are the first findings of testing them.

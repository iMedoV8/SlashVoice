# Implementation Plan: Our own look (direction C)

**Branch**: `task/008-own-look` | **Spec**: `spec.md`

## Summary

Rebuild the window's frame and the shared settings parts first, so every page changes at once, then each page to its still, then the recording pill. Delivered as one pull request.

## The frame

```text
App
├── Sidebar (new order)
│   ├── Logo
│   ├── StatusLine: state · dictation key        (new; reads the same state the bottom bar did)
│   ├── History, Words
│   ├── General, Models, Post Process, Advanced, (Debug, when on)
│   ├── About · version                          (foot)
│   └── ModelFoot: model in use, notices         (moved from the bottom bar)
└── Page
    ├── PageHeader: title, page actions          (search, transcribe file, add word, jump control)
    └── SettingsGroup: name + one line | rows    (new layout, used by every settings page)
```

- Opens on History instead of General.
- The bottom bar (`components/footer`) is no longer mounted. Its model picker, transcription status and notice chip move into `ModelFoot`. Its update state and version are dropped; the version is on About and at the sidebar's foot.
- `SettingContainer` loses the info and reset buttons; a row's description moves under its title only where the still shows one.

## Pages

| Page         | Built from today's                                                       | Change                                                                                              |
| ------------ | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| History      | `settings/history/HistorySettings.tsx`, `ui/AudioPlayer`                 | A log grouped by day; row actions on hover or focus; search added; the player opens inline on play  |
| Words        | `settings/CustomWords.tsx` (from Advanced)                               | New page; chips; add and search in the header                                                       |
| General      | `GeneralSettings.tsx`; `ThemeSelector`, `AppLanguageSelector` from About | Groups: Shortcut, Appearance, Languages, Sound; behaviour as a three-part switch                    |
| Models       | `settings/models/*`, `modelEntries.ts`                                   | The same grouping logic, shown as three groups; the radio marks the selected one                    |
| Post Process | `post-processing/PostProcessingSettings.tsx`                             | New layout only                                                                                     |
| Advanced     | `advanced/AdvancedSettings.tsx`                                          | New layout; jump control in the header; Custom Words leaves                                         |
| About        | `about/AboutSettings.tsx`                                                | Theme and language leave; credit, links and folders stay                                            |
| Pill         | `overlay/RecordingOverlay.tsx` and `.css`                                | Dress only: surface, hairline, Onest, JetBrains Mono timer, accent dot and spinner, amber attention |

New text goes into `src/i18n/locales/en` and `ar`; the other 24 languages get the English text where a key is new, as the translation check requires.

## Rules touched

- `RULES.md` §3: none. No data is added, nothing new is logged or sent. The app name per dictation is left out (spec, Story 2).
- `RULES.md` §4: memory with no model loaded is measured before and after.
- `DESIGN.md`: the accent's places grow by two (the pill's dot and spinner), as the founder decided. The look contract and `tests-look/banned.test.ts` are updated to allow exactly those two, in the same change.
- Handy's files are changed widely; that is the task. Internal names (component and file names) stay Handy's, so upstream merges stay possible where files are not rewritten.

## Tests (written first)

The screens cannot be rendered under test (`specs/001-slash-look/research.md`, R5), so checks read the source:

- the sidebar's order and the page it opens on;
- the bottom bar is not mounted, and its notice is shown in the sidebar's foot;
- no settings row renders an info or reset button;
- Custom Words is on Words and not on Advanced; theme and language are on General and not on About;
- the accent appears only in its allowed places, now including the pill's dot and spinner;
- every new text key exists in English and Arabic.

By eye: every page against its still, in dark and light, English and Arabic, on the founder's Mac, captured the way `specs/001-slash-look/evidence` was. Moving between pages for the captures is done with the accessibility scripting the earlier captures used; if that is refused, the founder is asked to turn on Computer use.

## Not in this task

The features the stills assume (app per dictation, corrections, word packs, fix last dictation); onboarding; the Debug page's own redesign; Windows window chrome.

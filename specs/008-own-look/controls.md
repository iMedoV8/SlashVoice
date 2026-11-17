# Controls before and after (T001, T017)

Every control the window has today (`main` at `0239dc7`), page by page, and where it is after this task. Read from the source, not from the running app. A row is ticked when the control is found on its new page and works the same way.

Ticked on 2026-11-18 against the source of `task/008-own-look` and the captures in `evidence/`, which come from the screens running in a browser with sample data (`AGENTS.md` notes the screens cannot run under test). Clicking each control in the installed app is not done; that needs the build installed and the founder's permissions granted again.

The only controls removed are the ones the spec names: the per-row reset buttons (dictation and cancel shortcuts, microphone, output device, volume, the model's language, the clamshell microphone and the Debug page's sliders) and the bottom bar's update state.

## Baseline

Memory of the main `slash-voice` process, the installed 0.1.0 release build, relaunched (quit, then `open`), read with `ps` on the founder's Mac (Apple M5, 16 GB), 2026-11-18. The web view's own processes are not counted, as in `specs/001-slash-look/baseline.md`.

| Measure                   | Before (0.1.0) | After  | Budget       |
| ------------------------- | -------------- | ------ | ------------ |
| Memory, 10 s after launch | 110 MB         | 118 MB | under 150 MB |
| Memory, 30 s after launch | 110 MB         | 101 MB | under 150 MB |

Not checked: whether the speech model loaded at launch. The figure is close to the 107 MB measured with no model downloaded.

After: the release build of this branch, launched from `src-tauri/target` the same way on 2026-11-18. Its new signature has no permissions yet, so it opened on the permissions screen rather than the main window; the two numbers are within launch-to-launch noise of each other and no change is claimed.

## The frame

| Control today                                   | Where today       | Where after                                | Done |
| ----------------------------------------------- | ----------------- | ------------------------------------------ | ---- |
| Sidebar page buttons                            | Sidebar           | Sidebar, new order                         | [x]  |
| Version                                         | Sidebar foot, bar | Sidebar foot beside About; About page      | [x]  |
| Model picker (choose, download state)           | Bottom bar        | Sidebar foot                               | [x]  |
| Background transcription status (opens History) | Bottom bar        | Sidebar foot                               | [x]  |
| Notice chip (opens the notice panel)            | Bottom bar        | Sidebar foot                               | [x]  |
| Update checker state                            | Bottom bar        | Dropped: self-update is off; About says so | [x]  |
| Debug mode, Cmd/Ctrl+Shift+D                    | Keyboard          | Unchanged                                  | [x]  |
| File drop onto the window                       | Window            | Unchanged, opens History                   | [x]  |
| Secure input warning                            | Above each page   | Unchanged                                  | [x]  |

## General

| Control today                                                        | Group today    | Group after                 | Done |
| -------------------------------------------------------------------- | -------------- | --------------------------- | ---- |
| Dictation shortcut; reset button removed (spec, Story 2)             | Shortcut       | Shortcut                    | [x]  |
| Shortcut behaviour (menu)                                            | Shortcut       | Shortcut, three-part switch | [x]  |
| Cancel shortcut (not on Linux); reset button removed (spec, Story 2) | Shortcut       | Shortcut                    | [x]  |
| Languages you speak (chips, add, remove)                             | Languages      | Languages                   | [x]  |
| Chinese script (only for Chinese speakers)                           | Languages      | Languages                   | [x]  |
| Model's language (models that offer it)                              | Model settings | Languages                   | [x]  |
| Translate to English (models that offer it)                          | Model settings | Languages                   | [x]  |
| Microphone; reset button removed (spec, Story 2)                     | Sound          | Sound                       | [x]  |
| Microphone channel                                                   | Sound          | Sound                       | [x]  |
| Mute while recording                                                 | Sound          | Sound                       | [x]  |
| Audio feedback                                                       | Sound          | Sound                       | [x]  |
| Output device; reset button removed (spec, Story 2)                  | Sound          | Sound                       | [x]  |
| Volume; reset button removed (spec, Story 2)                         | Sound          | Sound                       | [x]  |
| Theme                                                                | About          | Appearance                  | [x]  |
| App language                                                         | About          | Appearance                  | [x]  |

## History

| Control today                      | Done |
| ---------------------------------- | ---- |
| Transcribe file                    | [x]  |
| Open recordings folder             | [x]  |
| Copy an entry                      | [x]  |
| Save / unsave an entry             | [x]  |
| Retry transcription                | [x]  |
| Cancel a running transcription     | [x]  |
| Delete an entry                    | [x]  |
| Show more / show less on long text | [x]  |
| Play the recording (audio player)  | [x]  |
| Loading more on scroll             | [x]  |
| A file being read shows as a row   | [x]  |
| New: search the dictations         | [x]  |

## Words (new page)

| Control today                     | Where today | Done |
| --------------------------------- | ----------- | ---- |
| Add a custom word (field, button) | Advanced    | [x]  |
| Remove a custom word              | Advanced    | [x]  |
| Duplicate word notice             | Advanced    | [x]  |
| New: search your words            | none        | [x]  |

## Models

| Control today                         | Done |
| ------------------------------------- | ---- |
| Search and filters of the model table | [x]  |
| Pick a model (use, download then use) | [x]  |
| Cancel a download                     | [x]  |
| Delete a model                        | [x]  |
| Rescan for model files                | [x]  |
| Show more / fewer of your models      | [x]  |
| Change languages (goes to General)    | [x]  |
| Retired models notice                 | [x]  |
| Legend of the grades                  | [x]  |

## Advanced

| Control today                  | Group today   | Done           |
| ------------------------------ | ------------- | -------------- |
| Start hidden                   | App           | [x]            |
| Launch at login                | App           | [x]            |
| Show the tray icon             | App           | [x]            |
| Recording pill (overlay)       | App           | [x]            |
| Unload the model               | App           | [x]            |
| Experimental features          | App           | [x]            |
| Paste method                   | Output        | [x]            |
| Typing tool                    | Output        | [x]            |
| Clipboard handling             | Output        | [x]            |
| Auto submit                    | Output        | [x]            |
| Voice activity detection       | Transcription | [x]            |
| Long audio chunking            | Transcription | [x]            |
| Filler word removal            | Transcription | [x]            |
| Custom words                   | Transcription | moves to Words |
| Append trailing space          | Transcription | [x]            |
| History limit                  | History       | [x]            |
| Recording retention            | History       | [x]            |
| Post processing (experimental) | Experimental  | [x]            |
| Keyboard implementation (exp.) | Experimental  | [x]            |
| Acceleration (exp.)            | Experimental  | [x]            |
| Lazy stream close (exp.)       | Experimental  | [x]            |
| AirPods mode (exp.)            | Experimental  | [x]            |
| VAD backend (exp.)             | Experimental  | [x]            |
| Language detection (exp.)      | Experimental  | [x]            |
| New: jump to a group           | none          | [x]            |

## Post Process (shown when post processing is on)

| Control today                                               | Done |
| ----------------------------------------------------------- | ---- |
| Post-process shortcut; reset button removed (spec, Story 2) | [x]  |
| Provider, API format, base URL, API key, model, refresh     | [x]  |
| Prompt: select, create, edit, delete                        | [x]  |

## About

| Control today                      | Where after  | Done |
| ---------------------------------- | ------------ | ---- |
| App language                       | General      | [x]  |
| Theme                              | General      | [x]  |
| Version                            | About header | [x]  |
| Show what's new after an update    | About        | [x]  |
| Built on Handy, link to its source | About        | [x]  |
| App data folder, open              | About        | [x]  |
| Log folder, open                   | About        | [x]  |
| Acknowledgement: ggml              | About        | [x]  |

## Debug (shown in debug mode)

Its own layout is not redrawn in this task; it takes the shared parts. Every control stays: sound picker, log level, update checks, word correction threshold, paste delay, recording buffer, hold threshold, language detection window, reliable paste, always-on microphone, clamshell microphone, keyboard diagnostic, live log viewer, onboarding preview, what's new preview, debug run. [x]

# Controls before and after (T001, T017)

Every control the window has today (`main` at `0239dc7`), page by page, and where it is after this task. Read from the source, not from the running app. A row is ticked when the control is found on its new page and works the same way.

## Baseline

Memory of the main `slash-voice` process, the installed 0.1.0 release build, relaunched (quit, then `open`), read with `ps` on the founder's Mac (Apple M5, 16 GB), 2026-11-18. The web view's own processes are not counted, as in `specs/001-slash-look/baseline.md`.

| Measure                     | Before (0.1.0) | After | Budget       |
| --------------------------- | -------------- | ----- | ------------ |
| Memory, 10 s after launch   | 110 MB         |       | under 150 MB |
| Memory, 30 s after launch   | 110 MB         |       | under 150 MB |

Not checked: whether the speech model loaded at launch. The figure is close to the 107 MB measured with no model downloaded.

## The frame

| Control today                                  | Where today       | Where after                                   | Done |
| ---------------------------------------------- | ----------------- | --------------------------------------------- | ---- |
| Sidebar page buttons                           | Sidebar           | Sidebar, new order                            | [ ]  |
| Version                                        | Sidebar foot, bar | Sidebar foot beside About; About page         | [ ]  |
| Model picker (choose, download state)          | Bottom bar        | Sidebar foot                                  | [ ]  |
| Background transcription status (opens History) | Bottom bar        | Sidebar foot                                  | [ ]  |
| Notice chip (opens the notice panel)           | Bottom bar        | Sidebar foot                                  | [ ]  |
| Update checker state                           | Bottom bar        | Dropped: self-update is off; About says so    | [ ]  |
| Debug mode, Cmd/Ctrl+Shift+D                   | Keyboard          | Unchanged                                     | [ ]  |
| File drop onto the window                      | Window            | Unchanged, opens History                      | [ ]  |
| Secure input warning                           | Above each page   | Unchanged                                     | [ ]  |

## General

| Control today                               | Group today    | Group after  | Done |
| ------------------------------------------- | -------------- | ------------ | ---- |
| Dictation shortcut, with reset              | Shortcut       | Shortcut     | [ ]  |
| Shortcut behaviour (menu)                   | Shortcut       | Shortcut, three-part switch | [ ]  |
| Cancel shortcut (not on Linux), with reset  | Shortcut       | Shortcut     | [ ]  |
| Languages you speak (chips, add, remove)    | Languages      | Languages    | [ ]  |
| Chinese script (only for Chinese speakers)  | Languages      | Languages    | [ ]  |
| Model's language (models that offer it)     | Model settings | Languages    | [ ]  |
| Translate to English (models that offer it) | Model settings | Languages    | [ ]  |
| Microphone, with reset                      | Sound          | Sound        | [ ]  |
| Microphone channel                          | Sound          | Sound        | [ ]  |
| Mute while recording                        | Sound          | Sound        | [ ]  |
| Audio feedback                              | Sound          | Sound        | [ ]  |
| Output device, with reset                   | Sound          | Sound        | [ ]  |
| Volume, with reset                          | Sound          | Sound        | [ ]  |
| Theme                                       | About          | Appearance   | [ ]  |
| App language                                | About          | Appearance   | [ ]  |

## History

| Control today                          | Done |
| -------------------------------------- | ---- |
| Transcribe file                        | [ ]  |
| Open recordings folder                 | [ ]  |
| Copy an entry                          | [ ]  |
| Save / unsave an entry                 | [ ]  |
| Retry transcription                    | [ ]  |
| Cancel a running transcription         | [ ]  |
| Delete an entry                        | [ ]  |
| Show more / show less on long text     | [ ]  |
| Play the recording (audio player)      | [ ]  |
| Loading more on scroll                 | [ ]  |
| A file being read shows as a row       | [ ]  |
| New: search the dictations             | [ ]  |

## Words (new page)

| Control today                     | Where today | Done |
| --------------------------------- | ----------- | ---- |
| Add a custom word (field, button) | Advanced    | [ ]  |
| Remove a custom word              | Advanced    | [ ]  |
| Duplicate word notice             | Advanced    | [ ]  |
| New: search your words            | none        | [ ]  |

## Models

| Control today                                  | Done |
| ---------------------------------------------- | ---- |
| Search and filters of the model table          | [ ]  |
| Pick a model (use, download then use)          | [ ]  |
| Cancel a download                              | [ ]  |
| Delete a model                                 | [ ]  |
| Rescan for model files                         | [ ]  |
| Show more / fewer of your models               | [ ]  |
| Change languages (goes to General)             | [ ]  |
| Retired models notice                          | [ ]  |
| Legend of the grades                           | [ ]  |

## Advanced

| Control today                    | Group today   | Done |
| -------------------------------- | ------------- | ---- |
| Start hidden                     | App           | [ ]  |
| Launch at login                  | App           | [ ]  |
| Show the tray icon               | App           | [ ]  |
| Recording pill (overlay)         | App           | [ ]  |
| Unload the model                 | App           | [ ]  |
| Experimental features            | App           | [ ]  |
| Paste method                     | Output        | [ ]  |
| Typing tool                      | Output        | [ ]  |
| Clipboard handling               | Output        | [ ]  |
| Auto submit                      | Output        | [ ]  |
| Voice activity detection         | Transcription | [ ]  |
| Long audio chunking              | Transcription | [ ]  |
| Filler word removal              | Transcription | [ ]  |
| Custom words                     | Transcription | moves to Words |
| Append trailing space            | Transcription | [ ]  |
| History limit                    | History       | [ ]  |
| Recording retention              | History       | [ ]  |
| Post processing (experimental)   | Experimental  | [ ]  |
| Keyboard implementation (exp.)   | Experimental  | [ ]  |
| Acceleration (exp.)              | Experimental  | [ ]  |
| Lazy stream close (exp.)         | Experimental  | [ ]  |
| AirPods mode (exp.)              | Experimental  | [ ]  |
| VAD backend (exp.)               | Experimental  | [ ]  |
| Language detection (exp.)        | Experimental  | [ ]  |
| New: jump to a group             | none          | [ ]  |

## Post Process (shown when post processing is on)

| Control today                                         | Done |
| ----------------------------------------------------- | ---- |
| Post-process shortcut, with reset                     | [ ]  |
| Provider, API format, base URL, API key, model, refresh | [ ]  |
| Prompt: select, create, edit, delete                  | [ ]  |

## About

| Control today                         | Where after   | Done |
| ------------------------------------- | ------------- | ---- |
| App language                          | General       | [ ]  |
| Theme                                 | General       | [ ]  |
| Version                               | About header  | [ ]  |
| Show what's new after an update       | About         | [ ]  |
| Built on Handy, link to its source    | About         | [ ]  |
| App data folder, open                 | About         | [ ]  |
| Log folder, open                      | About         | [ ]  |
| Acknowledgement: ggml                 | About         | [ ]  |

## Debug (shown in debug mode)

Its own layout is not redrawn in this task; it takes the shared parts. Every control stays: sound picker, log level, update checks, word correction threshold, paste delay, recording buffer, hold threshold, language detection window, reliable paste, always-on microphone, clamshell microphone, keyboard diagnostic, live log viewer, onboarding preview, what's new preview, debug run. [ ]

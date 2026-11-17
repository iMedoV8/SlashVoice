# Review: the built pages against the stills (T018)

## How the captures were made

`evidence/` holds every page in dark and light, English and Arabic, and the recording pill in three states. They were taken on 2026-11-18 from the screens running in Chrome at 880 by 600, with Tauri's IPC replaced by sample data: the sample dictations are the ones in the stills, the models are the real catalogue, and none of the founder's own dictations or settings appear. This was done because a fresh build loses the founder's microphone and accessibility permissions and shows the permissions screen first.

What this does not show:

- The app's own web view on macOS (WebKit) rather than Chrome. Type and spacing can differ slightly.
- The macOS title bar. The window keeps its native title bar; the stills draw the window buttons inside the sidebar. That is unchanged by this task.
- Windows.
- The pill's "needs attention" and "loading model" states. The stylesheet for both is checked by `tests-look/banned.test.ts`.

## Differences, page by page

Differences that come from a decision are marked with it.

### Sidebar and frame (every still)

- The top is the logo, then a plain status line ("Ready", "Hold ⌥ Space"), not the boxed mark with the state. Founder, 2026-11-17.
- The page is named "Post Process", not "Rewrite". Founder, 2026-11-17. As today, it shows in the sidebar only when post-processing is turned on.
- The status line says "Press" instead of "Hold" when the behaviour is Toggle.

### History (still 1)

- No app column and no correction under a dictation: neither feature exists. Founder, 2026-11-17 ("only what works").
- An "Open recordings folder" button sits beside "Transcribe file": it is a control the page has today.
- Row actions are copy, save, play, retry and delete, as today; play opens the player on the row.
- A day's count is shown only once all of that day is loaded.
- Search looks through the dictations in history; it loads older pages as it goes.

### Words (still 2)

- Your words only. Corrections and word packs are left out. Founder, 2026-11-17.
- "Add word" opens a field at the top of the group; Enter adds, Escape closes.

### General (still 3)

- No "Fix last dictation" row: the feature does not exist.
- Rows the still does not draw are kept because they work today: the microphone channel (when the device has more than one), the output device and volume for the start and stop sound, and the model's own language and translate rows, now inside Languages.
- "Mute while recording" keeps today's wording.
- The language chips keep today's remove marks and a bare plus.

### Models (still 4)

- Today's model table is kept: grades per language, speed, size, filters and the legend. The still's three plain groups with a radio per model are not rebuilt. The table already has the same sections: on this computer, for your languages, and the untested ones behind search.
- The page's own title moved to the header; "Change languages" sits in the header where the still has search. Search is the table's own.

### Post Process (still 5)

- Today's settings in the new layout. Their own controls are unchanged.

### Advanced (still 6)

- "Show tray icon" keeps today's wording; the still says "Show the menu-bar icon", which would be wrong on Windows.
- The overlay's style and position are two rows, as today.
- "Experimental" joins the jump control when experimental features are on.

### About (still 7)

- No "Built on Handy" row and no "View Handy" button. Founder, 2026-11-18: Handy is credited in the README only. Its licence, with its copyright notice, ships inside the app (`src-tauri/resources/LICENSE.txt`), as MIT requires.
- No app icon beside the name: the logo is shown large instead.
- "Update checks are off" shows only when self-update is locked, which is the case in every build until Slash Voice has its own release feed.
- The ggml line keeps today's longer text.
- Recordings has no path shown: the app gives no command that returns it.

### Recording pill (still 8)

- Matches: the grey dot while the microphone gets ready, the accent dot once it listens, nine bars in the text colour, the accent spinner while transcribing. The dot breathes instead of sending out a ring, since the brand rules out glows.

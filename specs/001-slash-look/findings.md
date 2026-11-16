# Findings: test of the installed build (2026-11-15)

The build in `/Applications` (branch `task/002-keep-in-dock`), on the founder's Mac. Not rebuilt, so its permissions stayed.

## What was tested, and how

| Area                                                              | Tested                | How                                                                                                        |
| ----------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------- |
| General screen, dark and light, English and Arabic                | Yes                   | Theme and language set in the app's settings file, app reopened, window captured. `evidence/general-*.png` |
| Dock icon                                                         | Yes                   | `evidence/dock-icon.png`                                                                                   |
| Handy leftovers in every screen's source                          | Yes                   | Search of `src/`                                                                                           |
| History, Models, Advanced, About, the later onboarding steps      | **No**                | Reaching them needs clicks in the app. Desktop control was not available to the agent in this session.     |
| Every control used once                                           | **No**                | Same reason                                                                                                |
| A real dictation, English and Arabic with English                 | **No** (by the agent) | Same reason. The founder dictates with this build daily, which shows it works, but nothing was measured.   |
| Recording pill; menu-bar mark while idle, recording, transcribing | **No**                | Needs the shortcut pressed. The idle mark is not exposed to the capture tool either.                       |

The two English captures show a tooltip, because the pointer was resting on the Output Device row. It hides the Audio Feedback label.

## Findings

### The General screen does not match still 06

Task T018 was ticked, but the built screen differs from the approved still in these ways:

1. A native title bar with the words "Slash Voice" sits above the window. The still has none; the window buttons sit in the navigation column.
2. Shortcut keys are bold buttons reading "Right Option" and "Escape", each with a reset icon. The still shows small key caps in the code typeface.
3. Shortcut behaviour is a menu. The still shows a three-part switch: Auto, Hold, Toggle.
4. Every row has an information icon. The still has none.
5. Language chips carry a remove mark and a bare plus. The still shows plain chips and "+ Add".
6. There is no model row. The still shows the model's name in the code typeface with a Change button. The build has a "Qwen3-ASR 1.7B Settings" group and a model picker in a bar at the foot.
7. Menus are filled, bold and wide. The still shows light outlined menus sized to their text.
8. A bar at the foot reads "Update Checking Disabled • v0.10.0". The still has no such bar, and the version now shows twice.
9. Labels are in Title Case ("Shortcut Behavior"). The still uses sentence case.

In short: the colours and type are ours, the structure is still Handy's. This is the main reason the app reads as a copy.

### Works

- Dark and light both read well on the General screen. No pink, no gradient.
- Arabic mirrors correctly: the navigation column moves to the right, rows and switches flip, and Arabic text uses IBM Plex Sans Arabic.
- The Dock icon is the dark tile with the slash and arcs in the accent.

### Handy leftovers found in the source

| Where                                                                | What                                                                                      |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `src/components/SecureInputWarning.tsx`                              | Help link to `handy.computer`                                                             |
| `src/components/onboarding/LinuxGuide.tsx`                           | Help link to `handy.computer`                                                             |
| `src/components/update-checker/portableInstaller.ts`                 | Points at Handy's release page (unused while self-update is off)                          |
| `src/components/whats-new/`, `ShowWhatsNewOnUpdate.tsx`              | The "What's new" notes are Handy's                                                        |
| `src/components/onboarding/screens/TryIt.tsx`, `FileDropOverlay.tsx` | Still use the mascot tile                                                                 |
| `src/components/onboarding/screens/tryit.css`                        | A purple-tinted shadow (`rgb(40 20 50 / 0.16)`)                                           |
| `src/components/ui/AudioPlayer.tsx`                                  | A `linear-gradient` for the progress track (a two-colour fill, not a decorative gradient) |
| Footer                                                               | "Update Checking Disabled" reads as an internal state, not as text for a user             |
| About                                                                | The theme switch lives here; it belongs with the other preferences                        |

The "Built on Handy" credit on the About screen is correct and stays.

## Not done

T019 and T025 are complete for the General screen but its comparison with still 06 fails (above). T023 has the Dock icon only. T026 and T027 are not done. Light mode is ready for the founder to judge on three screens: welcome, permissions and General.

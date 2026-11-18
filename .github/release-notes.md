An early build of Slash Voice for testing. Dictation works. The features that will make it its own product are not built yet.

## Download

| System                   | File                                       |
| ------------------------ | ------------------------------------------ |
| Windows 10 or 11, 64-bit | the file ending in `windows-x64-setup.exe` |
| Mac with Apple Silicon   | the file ending in `macos-arm64.dmg`       |

## First launch

These builds are not signed with a paid certificate, so both systems warn you the first time you install by hand.

- **Windows** says "Windows protected your PC". Choose **More info**, then **Run anyway**.
- **macOS** says it cannot verify the app. Open **System Settings → Privacy & Security**, scroll down and choose **Open Anyway**.

macOS then asks for two permissions: the microphone, to hear you, and accessibility, to type the text into other apps.

The first time you dictate, the app downloads a speech model. That needs an internet connection once.

## Good to know

- Audio stays on your computer. Nothing is sent anywhere unless you turn on text clean-up by a language model, and then only text is sent.
- From this version the app updates itself. When a newer version is ready, the sidebar shows "Version … is ready" with a Restart button; if you never press it, it installs the next time you quit. You can turn update checks off on the About page.
- On a Mac you grant the two permissions once more for this version, and then not again: later versions keep them.
- To check a download, compare its SHA-256 with `SHA256SUMS.txt`.

Found a problem? Open an [issue](https://github.com/iMedoV8/SlashVoice/issues). Please do not paste dictation text or recordings.

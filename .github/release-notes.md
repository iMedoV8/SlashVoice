An early build of Slash Voice for testing. Dictation works. The features that will make it its own product are not built yet.

## Download

| System                   | File                                       |
| ------------------------ | ------------------------------------------ |
| Windows 10 or 11, 64-bit | the file ending in `windows-x64-setup.exe` |
| Mac with Apple Silicon   | the file ending in `macos-arm64.dmg`       |

## First launch

These builds are not signed with a paid certificate, so both systems warn you once.

- **Windows** says "Windows protected your PC". Choose **More info**, then **Run anyway**.
- **macOS** says it cannot verify the app. Open **System Settings → Privacy & Security**, scroll down and choose **Open Anyway**.

macOS then asks for two permissions: the microphone, to hear you, and accessibility, to type the text into other apps.

The first time you dictate, the app downloads a speech model. That needs an internet connection once.

## Good to know

- Audio stays on your computer. Nothing is sent anywhere unless you turn on text clean-up by a language model, and then only text is sent.
- The app does not update itself. To update, download the newer file here and install it over the old one.
- To check a download, compare its SHA-256 with `SHA256SUMS.txt`.

Slash Voice is built on [Handy](https://github.com/cjpais/Handy) by CJ Pais, under the MIT licence.

Found a problem? Open an [issue](https://github.com/iMedoV8/SlashVoice/issues). Please do not paste dictation text or recordings.

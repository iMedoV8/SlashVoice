# Security

Slash Voice listens to your microphone and types into other apps, so security reports are taken seriously.

## Reporting a problem

**Please do not open a public issue for a security problem.**

Report it privately through GitHub: open the repository's **Security** tab and choose **Report a vulnerability**. Only the maintainers can read the report.

Please include what you found, how to reproduce it, and which system and version you were on.

## What to expect

This is a small project with one maintainer. There is no promised response time. You will get an honest answer about whether the report is accepted and what will be done.

## What counts

- Audio, dictation text, clipboard contents or window titles leaving the computer when the user did not choose that.
- Text typed into an app other than the one that was in front when recording started.
- A model file being used without its checksum being checked.
- A secret, such as a model provider key, written to a log or a file it should not be in.
- Anything that lets a hostile audio file, model download or project folder run code or change what the app types.

The rules the project holds itself to are in [RULES.md](RULES.md) §3.

## Supported versions

Only the latest version. There are no published installers yet.

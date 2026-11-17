# Contract: the release feed

Address, fixed in `tauri.conf.json`:

```text
https://github.com/iMedoV8/SlashVoice/releases/latest/download/latest.json
```

Written by the release job and attached to each release as `latest.json`:

```json
{
  "version": "0.2.1",
  "notes": "See the release page.",
  "pub_date": "2026-11-20T12:00:00Z",
  "platforms": {
    "darwin-aarch64": {
      "url": "https://github.com/iMedoV8/SlashVoice/releases/download/v0.2.1/slash-voice_0.2.1_macos-arm64.app.tar.gz",
      "signature": "<contents of the .app.tar.gz.sig file>"
    },
    "windows-x86_64": {
      "url": "https://github.com/iMedoV8/SlashVoice/releases/download/v0.2.1/slash-voice_0.2.1_windows-x64-setup.exe",
      "signature": "<contents of the -setup.exe.sig file>"
    }
  }
}
```

Rules:

- Every `url` is on `github.com/iMedoV8/SlashVoice/releases/download/`.
- `version` equals the version in `tauri.conf.json` for that build.
- The release job refuses to write the feed if a `.sig` file is missing.

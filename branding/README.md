# App icons

The Mac and other non-Windows icons use `app-icon.svg`. The Windows ICO and Store tiles use `app-icon-windows.svg`, whose tile fills more of the square. To regenerate the Windows assets without changing the others, from the repository root:

```sh
bun run tauri icon branding/app-icon-windows.svg -o /private/tmp/slash-voice-windows-icon
cp /private/tmp/slash-voice-windows-icon/icon.ico /private/tmp/slash-voice-windows-icon/Square*Logo.png /private/tmp/slash-voice-windows-icon/StoreLogo.png src-tauri/icons/
```

Use a temporary path appropriate to the system if `/private/tmp` is unavailable.

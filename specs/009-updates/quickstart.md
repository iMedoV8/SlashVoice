# Quickstart: proving it works

## 1. The fixed signature keeps permissions (task T001, first)

1. With the certificate in the login keychain, build twice with a change between: `APPLE_SIGNING_IDENTITY="Slash Voice" bun run tauri build --bundles app`.
2. `codesign -dr - "Slash Voice.app"` shows `identifier "com.slashvoice.app" and certificate leaf = H"..."`, the same for both builds.
3. Install the first, grant microphone and accessibility, dictate.
4. Install the second. Expected: no permission prompt; dictation works.

If step 4 asks again, or the app does not start, stop: the fallback is Apple Developer ID, the founder's decision.

## 2. Wrong signatures are refused

`cargo test updates::` passes, including the test that offers a file signed with another key.

## 3. The release carries a feed

Start the release workflow by hand on `main`. Expected in the draft release: the two installers, `SHA256SUMS.txt`, the `.app.tar.gz` and its `.sig`, the setup's `.sig`, and `latest.json` matching `contracts/feed.md`.

## 4. An update on the Mac

Install 0.2.0. Publish 0.2.1. Within six hours, or at once by reopening the app, the sidebar's foot shows "Version 0.2.1 is ready". Start a recording and press Restart: refused. Stop, press Restart: the app reopens as 0.2.1 and dictates without a permission prompt.

## 5. Install at quit

With an update waiting, quit from the menu bar. Reopen: the new version.

## 6. An update on Windows

The same as step 4 on the founder's Windows PC. Note whether SmartScreen appears.

## 7. Checks off

Turn the switch off on About, reopen the app, and watch (Little Snitch, or the log) that no request goes to `github.com/.../latest.json`.

# Tasks: Keep the app in the Dock

- [x] T001 Write `keeps_dock_icon_when_window_hides_to_tray` in `src-tauri/src/lib.rs`, with `hides_dock_icon` keeping Handy's current answer, and see it fail
- [x] T002 Make `hides_dock_icon` say no, and route the two places that switch to accessory mode through it
- [x] T003 Run `bun run check` and `bun run security`
- [ ] T004 Build, install, close the window, confirm the Dock icon stays and a click reopens the window; measure memory

# Implementation Plan: Keep the app in the Dock

**Branch**: `task/002-keep-in-dock` | **Date**: 2026-11-15 | **Spec**: [spec.md](spec.md)

## Summary

Handy switches macOS to "accessory" mode (no Dock icon) in two places: at launch when it starts hidden with a menu-bar icon, and when the window is closed with a menu-bar icon. Both now go through one rule, `hides_dock_icon`, which says no. The existing Dock-click handler (`RunEvent::Reopen`) already opens the window, so nothing else is needed.

## Technical Context

Rust, `src-tauri/src/lib.rs` (Handy's file). One constant, one small function, two call sites, one unit test. No new dependency, no stored data, no change on Windows or Linux.

## Constitution Check

| Principle                 | Result                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| II. Tests first           | `keeps_dock_icon_when_window_hides_to_tray` written first and seen to fail                                          |
| III. Security and privacy | Not touched                                                                                                         |
| IV. Performance           | Not touched: an app in "regular" mode costs no measurable memory; checked against the 150 MB target after the build |
| V. Built on Handy         | One of Handy's files changes; the change and its reason go in the pull request                                      |

## Security: threats touched

None: the change only affects whether the app has a Dock icon.

**Second review needed**: no.

## Performance: targets touched

| Target                      | Measurement                                       | Baseline | Budget       |
| --------------------------- | ------------------------------------------------- | -------- | ------------ |
| Memory with no model loaded | Same method as `specs/001-slash-look/baseline.md` | 107 MB   | under 150 MB |

## Test levels used

- Unit: the Dock rule.
- Manual on the founder's Mac: close the window, look at the Dock, click the icon.

## Who does what

Orchestrator only.

## Project Structure

`src-tauri/src/lib.rs` only.

# Data model: an update's life

Held in memory by `src-tauri/src/updates.rs`; nothing is stored in settings except the existing `update_checks_enabled`.

```text
Idle ──check finds newer──▶ Downloading ──verified, written to cache──▶ Ready(version)
  ▲                            │                                          │
  │                        failed or                         Restart pressed, or app quit,
  └────── next check ◀──── unverified (notice) ◀─────────── and not recording/transcribing
                                                                          │
                                                                          ▼
                                                                     Installing ──▶ (app relaunches)
```

| State          | Shown in the window                                     | Notes                                       |
| -------------- | ------------------------------------------------------- | ------------------------------------------- |
| Idle           | Nothing; About says checks are on or off                | Checks every 6 hours while on               |
| Downloading    | Nothing                                                 | A failure is silent; the next check retries |
| Ready(version) | Sidebar's foot and About: "Version N is ready", Restart | The file is in the cache folder             |
| Installing     | Nothing; the app closes and reopens                     | Refused while recording or transcribing     |

An unverified download is deleted and raises one notice ("The update could not be verified"). A failed check raises none.

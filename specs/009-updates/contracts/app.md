# Contract: between the update module and the window

| Kind    | Name                | Payload                                                  | Meaning                                |
| ------- | ------------------- | -------------------------------------------------------- | -------------------------------------- |
| Event   | `update-ready`      | `{ version: string }`                                    | A verified update waits in the cache   |
| Event   | `update-failed`     | `{ reason: "unverified" \| "install" }`                  | Shown as one notice                    |
| Command | `get_update_state`  | returns `{ state: "idle" \| "ready", version?: string }` | For a window opened after the event    |
| Command | `restart_to_update` | returns `Result<(), "busy" \| "none" \| string>`         | `busy` while recording or transcribing |

The update check switch keeps the existing setting `update_checks_enabled` and the existing lock (`is_update_checks_locked`).

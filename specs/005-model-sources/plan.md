# Implementation Plan: Models download from Hugging Face only

**Branch**: `task/005-model-sources` | **Spec**: `spec.md`

## Summary

One new module of ours, `src-tauri/src/model_sources.rs`, says where model files may come from. Handy's code asks it in two places.

```text
model_sources.rs                      (ours)
  MIRROR_BASES = []                   fallback servers; none
  hugging_face_api()                  the download client, pinned to huggingface.co
  allows_direct_download(url) = false plain-URL downloads; none allowed

catalog/mod.rs                        (Handy's)
  mirror_files()  reads MIRROR_BASES  instead of its own list

managers/model.rs                     (Handy's)
  download_model()  for a plain-URL model: refuse unless allowed
```

With no fallback servers, Handy's existing code already ends a failed Hugging Face download with an error (`managers/model.rs`, "Hugging Face download failed after N attempt(s)"). Nothing there changes.

## Handy's files touched, and why

| File                              | Change                                                                | Why                                      |
| --------------------------------- | --------------------------------------------------------------------- | ---------------------------------------- |
| `src-tauri/src/catalog/mod.rs`    | The mirror list is read from our module; one test asserts no fallback | The decision                             |
| `src-tauri/src/managers/model.rs` | One guard in `download_model`; one test asserts no fallback           | Close the direct path to the same server |
| `src-tauri/src/lib.rs`            | `mod model_sources;`                                                  | Register the module                      |

Left alone: the five older entries and their addresses stay in the table, because they identify files already on a user's disk. `scripts/mirror_models.py` is Handy's tool for its own storage and is not used.

## Rules touched

- `RULES.md` §3, model downloads: this is the change. Second review required: Codex, then the founder.
- `RULES.md` §3, checksums: unchanged.
- `RULES.md` §2, tests: two of Handy's tests change under the decision recorded in the spec.
- `RULES.md` §4, performance: none. A failed download ends sooner.
- Attacker's view: the change removes a server from the trust boundary; it adds none. The guard fails closed: no URL is allowed.

## Tests (written first)

- `model_sources`: there are no fallback servers; a plain-URL download is refused for Handy's server and for any other address.
- `catalog`: no offered model, and not the language detector, has a fallback server.
- `managers/model`: a retired model's replacement is offered and has no fallback server.
- Added after the second review: with `HF_ENDPOINT` set to another server, the client's download address is still `huggingface.co`; every offered file, and the language detector, has a 64-character hash and a size.

# Second review: Models download from Hugging Face only

`RULES.md` §3 asks for a second review, by a different coding program and by the founder, of any change to model downloads.

## Codex (codex-cli 0.162.1), 2026-11-16, read-only

Verdict: **request changes**. It read the code and the download library's source; it did not compile or run tests, because its sandbox was read-only.

| Finding                                                                                                                                          | Severity | Checked here                                                                          | Answer                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The download library reads `HF_ENDPOINT`, so starting the app with it set to another server sends model downloads there, Handy's server included | Blocker  | Reproduced with a test: the download address became `https://blob.handy.computer/...` | Fixed. The client is built in `model_sources::hugging_face_api()` with the address pinned to `huggingface.co`. Test: `the_environment_cannot_redirect_hugging_face_downloads` |
| The changed catalogue test no longer checks that every offered file has a real hash and size                                                     | Nit      | True: the replacement checked a stand-in file                                         | Fixed. Test added: `every_offered_file_has_a_hash_and_a_size`                                                                                                                 |

Confirmed by its reading, with nothing to fix: no other path reaches the old server; an older model already on disk still loads; a failed download leaves no stuck state; checksum code is unchanged; nothing new is logged.

## The founder

Approved on 2026-11-16 ("Approve and merge"), after reading the two points put to him in pull request 2: `HF_ENDPOINT` is ignored, and two of Handy's tests are reversed.

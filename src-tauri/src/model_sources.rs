//! Where Slash Voice may fetch model files from (specs/005-model-sources).
//!
//! Catalog models come from Hugging Face, pinned to a revision and checked
//! against the hashes compiled into the app. Handy also fell back to its own
//! storage server when Hugging Face failed, and five older models downloaded
//! from that server directly. Slash Voice does neither: it has not asked to
//! use that server (founder, 2026-11-16).
//!
//! When Slash Voice hosts models itself, this is the one place that changes.

use hf_hub::api::tokio::ApiBuilder;

/// The Hugging Face address the app downloads from.
pub const HUGGING_FACE_ENDPOINT: &str = "https://huggingface.co";

/// A Hugging Face client builder for model downloads, pinned to
/// [`HUGGING_FACE_ENDPOINT`].
///
/// The library reads `HF_ENDPOINT` from the environment, which would let
/// whatever launched the app send downloads to any server, Handy's included.
/// The address is set here after the environment is read, so it wins. The
/// cache location (`HF_HOME`) still comes from the environment.
pub fn hugging_face_api() -> ApiBuilder {
    ApiBuilder::from_env().with_endpoint(HUGGING_FACE_ENDPOINT.to_string())
}

/// Servers tried in order when a Hugging Face download fails. The file URL is
/// `{base}/{repo_id}/{revision}/{filename}`. Empty: Slash Voice has no mirror,
/// so a failed Hugging Face download ends with an error.
pub const MIRROR_BASES: &[&str] = &[];

/// Whether a model may be downloaded from a plain URL, outside Hugging Face.
///
/// No address is allowed today. The only plain-URL models are five older
/// ones on Handy's storage server; one already on disk keeps working, but
/// none is downloaded. This fails closed: when Slash Voice hosts files of its
/// own, list the exact hosts here and compare the URL's host against them.
pub fn allows_direct_download(_url: &str) -> bool {
    false
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn there_are_no_fallback_servers() {
        assert!(MIRROR_BASES.is_empty(), "fallbacks: {MIRROR_BASES:?}");
    }

    #[test]
    fn the_environment_cannot_redirect_hugging_face_downloads() {
        // `HF_ENDPOINT` is process-wide; no other test in this crate sets it.
        let before = std::env::var_os("HF_ENDPOINT");
        std::env::set_var("HF_ENDPOINT", "https://blob.handy.computer");
        let api = hugging_face_api().build();
        match before {
            Some(value) => std::env::set_var("HF_ENDPOINT", value),
            None => std::env::remove_var("HF_ENDPOINT"),
        }
        let url = api
            .expect("client")
            .model("org/repo".to_string())
            .url("model.gguf");
        assert!(
            url.starts_with(&format!("{HUGGING_FACE_ENDPOINT}/")),
            "downloads from {url}"
        );
    }

    #[test]
    fn a_download_from_handys_server_is_refused() {
        assert!(!allows_direct_download(
            "https://blob.handy.computer/ggml-small.bin"
        ));
    }

    #[test]
    fn a_download_from_any_plain_url_is_refused() {
        for url in [
            "https://huggingface.co/some/repo/resolve/main/model.gguf",
            "https://example.com/model.bin",
            "http://127.0.0.1:8080/model.bin",
            "not a url",
            "",
        ] {
            assert!(!allows_direct_download(url), "allowed: {url:?}");
        }
    }
}

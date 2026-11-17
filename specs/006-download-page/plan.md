# Implementation Plan: A download page to share

**Branch**: `task/006-download-page` | **Spec**: `spec.md`

## Summary

A static page in `site/`, served by Vercel from that folder. No build step, no script, no framework.

```text
site/
├── index.html            # English
├── ar/index.html         # Arabic, right to left
├── styles.css            # the website's tokens and this page's layout
├── fonts/                # Mona Sans, Onest, Alexandria (Arabic letters only), with their licences
├── paper-grain-1.webp    # the website's paper tile
├── favicon.svg           # the app icon
└── vercel.json           # response headers: a strict content policy, no framing
```

## Design

The website's world, from its `DESIGN.md` and its drawn confirmation page: warm charcoal paper, Mona Sans, the `/Slash` logo in Onest with "Voice" beside it, hairline cards, and one red thread. Here the thread carries the three steps of getting started and ends in the link to the source. Brand red is used for the thread and the slash only; the two downloads are equal, so neither is a filled red button.

One moment of motion: the thread draws itself on load. It does not run under reduced motion.

## Rules touched

- `RULES.md` §3: no telemetry, tracker or analytics; no request to another host. The content policy allows the page's own styles, fonts and images and no script.
- `RULES.md` §4: none; the app is not changed.
- `RULES.md` §8: design approval, varied by the founder as recorded in the spec.
- Licences: Mona Sans, Onest and Alexandria are OFL-1.1; their notices go in `CREDITS.md`.

## Handy's files touched

None.

## Tests

`tests-look/site.test.ts`, written first: both pages exist with the right language and direction; each links to both installers and the checksums of the app's current version; no script, no outside stylesheet, font or image; the stylesheet carries the website's colour values; the content policy forbids scripts.

By eye, in a browser at 1440 and 390, English and Arabic: the layout, the thread, focus marks.

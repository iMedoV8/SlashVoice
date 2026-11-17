// Checks on the download page (specs/006-download-page).
// They read files only; nothing here starts a server or touches the network.
import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, read } from "./lib";

const VERSION = JSON.parse(read("src-tauri/tauri.conf.json")).version;
const RELEASE = `https://github.com/iMedoV8/slash-voice/releases/download/v${VERSION}`;
const PAGES = [
  { file: "site/index.html", lang: "en", dir: "ltr" },
  { file: "site/ar/index.html", lang: "ar", dir: "rtl" },
];

describe.each(PAGES)("$file", ({ file, lang, dir }) => {
  const html = () => read(file);

  test("exists, in its language and direction", () => {
    expect(existsSync(join(ROOT, file))).toBe(true);
    expect(html()).toMatch(new RegExp(`<html lang="${lang}" dir="${dir}"`));
  });

  test("links to both installers and the checksums of the current version", () => {
    for (const name of [
      `slash-voice_${VERSION}_windows-x64-setup.exe`,
      `slash-voice_${VERSION}_macos-arm64.dmg`,
      "SHA256SUMS.txt",
    ]) {
      expect(html()).toContain(`href="${RELEASE}/${name}"`);
    }
  });

  test("names the version it offers", () => {
    expect(html()).toContain(VERSION);
  });

  test("runs no script", () => {
    expect(html()).not.toMatch(/<script|\son\w+=|javascript:/i);
  });

  test("loads nothing from another host", () => {
    const loaded = [
      ...html().matchAll(/<(?:link|img|source|iframe|video|audio)\b[^>]*>/gi),
    ].map((m) => m[0]);
    expect(loaded.filter((tag) => /https?:\/\//i.test(tag))).toEqual([]);
    expect(html()).not.toMatch(/style="/);
  });

  test("links only to this project on GitHub and to the other language", () => {
    const hrefs = [...html().matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(
      (m) => m[1],
    );
    const outside = hrefs.filter(
      (h) =>
        /^https?:/.test(h) &&
        !h.startsWith("https://github.com/iMedoV8/slash-voice") &&
        h !== "https://github.com/cjpais/Handy",
    );
    expect(outside).toEqual([]);
  });

  test("offers the other language", () => {
    expect(html()).toMatch(lang === "en" ? /href="\/ar\/"/ : /href="\/"/);
  });
});

describe("the page's look", () => {
  test("uses the Slash website's colours", () => {
    const css = read("site/styles.css");
    for (const [token, value] of Object.entries({
      "--bg": "#1d1a17",
      "--panel": "#27231f",
      "--ink": "#f3ede4",
      "--ink-2": "#cfc6ba",
      "--muted": "#a0968a",
      "--rule": "#4b443c",
      "--brand": "#e5512a",
      "--ok": "#45b97c",
      "--focus": "#ffb499",
    })) {
      expect(css).toMatch(new RegExp(`${token}:\\s*${value};`));
    }
  });

  test("loads its typefaces and images from itself", () => {
    const css = read("site/styles.css");
    expect(css).not.toMatch(/https?:\/\//);
    for (const url of [...css.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(
      (m) => m[1],
    )) {
      expect(existsSync(join(ROOT, "site", url))).toBe(true);
    }
  });

  test("stops its motion under reduced motion", () => {
    expect(read("site/styles.css")).toMatch(
      /@media \(prefers-reduced-motion: no-preference\)/,
    );
  });
});

describe("the page's headers", () => {
  test("the content policy allows no script and no outside host", () => {
    const conf = JSON.parse(read("site/vercel.json"));
    const csp = conf.headers
      .flatMap((h: { headers: { key: string; value: string }[] }) => h.headers)
      .find((h: { key: string }) => h.key === "Content-Security-Policy")?.value;
    expect(csp).toContain("default-src 'none'");
    expect(csp).not.toMatch(/script-src|https?:|\*/);
    expect(csp).toContain("frame-ancestors 'none'");
  });
});

describe("the typefaces' licences", () => {
  test.each(["Mona Sans", "Alexandria"])("%s is credited", (face) => {
    expect(read("CREDITS.md")).toContain(face);
  });
});

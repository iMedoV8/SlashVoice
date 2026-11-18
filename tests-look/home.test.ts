// Home, and Appearance as pictures (specs/010-home-appearance). The screens
// cannot be rendered under test, so these read the source.
import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT, read } from "./lib";

const HOME = "src/components/settings/home/HomeSettings.tsx";
const home = () => (existsSync(join(ROOT, HOME)) ? read(HOME) : "");
const code = (source: string) =>
  source.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");

describe("Home", () => {
  test("is a page of its own, in its own folder", () => {
    expect(existsSync(join(ROOT, HOME))).toBe(true);
    expect(read("src/components/Sidebar.tsx")).toMatch(/HomeSettings/);
  });

  test("its numbers come from the counter on this computer", () => {
    expect(home()).toMatch(/commands\.getDictationTotals\(/);
  });

  test("speed is shown only from one minute of speech", () => {
    expect(home()).toMatch(/seconds\s*>=\s*60/);
  });

  test("time saved compares with typing at 40 words a minute, and says so", () => {
    expect(home()).toMatch(/TYPING_WORDS_PER_MINUTE\s*=\s*40\b/);
    expect(home()).toMatch(/wpm:\s*TYPING_WORDS_PER_MINUTE/);
    const en = JSON.parse(read("src/i18n/locales/en/translation.json"));
    expect(en.settings.home.howCounted).toMatch(/\{\{wpm\}\}/);
  });

  test("makes no network request", () => {
    expect(code(home())).not.toMatch(/\bfetch\(|XMLHttpRequest|plugin-http/);
  });

  test("what's new is read from the notes built into the app", () => {
    expect(home()).toMatch(/from\s+"[./]*\/whats-new\/releaseNotes"/);
    const notes = readdirSync(join(ROOT, "src/content/release-notes"));
    expect(notes.some((n) => /^\d+\.\d+\.\d+\.md$/.test(n))).toBe(true);
    expect(notes.some((n) => /^\d+\.\d+\.\d+\.ar\.md$/.test(n))).toBe(true);
  });

  test("what's new respects 'Show what's new after an update'", () => {
    expect(home()).toMatch(/show_whats_new_on_update/);
  });

  test("getting started ticks from what was done, and hiding it is remembered", () => {
    const h = home();
    expect(h).toMatch(/dictations\s*>\s*0/);
    expect(h).toMatch(/custom_words/);
    expect(h).toMatch(/\.missing\(/);
    expect(h).toMatch(/localStorage/);
  });
});

describe("text", () => {
  const en = JSON.parse(read("src/i18n/locales/en/translation.json"));
  const ar = JSON.parse(read("src/i18n/locales/ar/translation.json"));
  const has = (tree: any, key: string) =>
    key.split(".").reduce((node, k) => node?.[k], tree) !== undefined;

  const NEW_PARTS = [HOME, "src/components/settings/ThemeSelector.tsx"];

  test("every key Home and the cards use is in English and in Arabic", () => {
    const missing: string[] = [];
    for (const file of NEW_PARTS) {
      if (!existsSync(join(ROOT, file))) continue;
      for (const m of read(file).matchAll(/\bt\(\s*"([\w.]+)"/g)) {
        if (!has(en, m[1])) missing.push(`en: ${m[1]} (${file})`);
        if (!has(ar, m[1])) missing.push(`ar: ${m[1]} (${file})`);
      }
    }
    expect(missing).toEqual([]);
    expect(has(en, "sidebar.home") && has(ar, "sidebar.home")).toBe(true);
  });
});

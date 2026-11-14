// Nothing of Handy's look, and nothing the founder ruled out, is left.
import { describe, expect, test } from "bun:test";
import { read, walk } from "./lib";

const SCREEN_FILES = walk(
  "src",
  (n) =>
    /\.(tsx?|css)$/.test(n) && n !== "bindings.ts" && !n.endsWith(".test.ts"),
);
const ARTWORK = walk("branding", (n) => n.endsWith(".svg"));
const ALL = [
  ...SCREEN_FILES,
  ...ARTWORK,
  "index.html",
  "src/overlay/index.html",
];

// Handy's pinks, its plum, and the purples of the first build and of Handy's demo wallpaper.
const BANNED = [
  "faa2ca",
  "f28cbb",
  "da5893",
  "382731",
  "8b7cff",
  "7c6cf0",
  "6c5ce7",
  "c7b9ef",
  "7c68c0",
  "e9e1f3",
];

describe("banned colours", () => {
  for (const colour of BANNED) {
    test(`#${colour} appears nowhere`, () => {
      const hits = ALL.filter((f) =>
        read(f).toLowerCase().includes(`#${colour}`),
      );
      expect(hits).toEqual([]);
    });
  }
});

describe("gradients", () => {
  // Allowed: an edge fade (a mask) and a progress fill whose stops move with a value.
  const allowed = (statement: string) =>
    /mask-?image|maskImage|WebkitMaskImage/i.test(statement) ||
    (/linear-gradient\(\s*to right/.test(statement) &&
      statement.includes("${"));

  test("no gradient is used for decoration", () => {
    const hits: string[] = [];
    for (const f of SCREEN_FILES) {
      const text = read(f);
      for (const m of text.matchAll(/(linear|radial|conic)-gradient\(/g)) {
        const from = Math.max(
          text.lastIndexOf(";", m.index),
          text.lastIndexOf("\n\n", m.index),
          m.index - 400,
          0,
        );
        const statement = text.slice(from, m.index + 160);
        if (!allowed(statement)) hits.push(`${f}: ${m[0]}`);
      }
    }
    expect(hits).toEqual([]);
  });
});

describe("the accent", () => {
  // The accent may fill the primary button, a switch that is on, a selected radio, and the logo's slash.
  const MAY_USE = new Set([
    "src/styles/theme.css",
    "src/App.css",
    "src/components/ui/Button.tsx",
    "src/components/ui/Switch.tsx",
    "src/components/ui/Radio.tsx",
    "src/components/icons/HandyTextLogo.tsx",
  ]);

  test("is used only where the brand allows it", () => {
    const hits = SCREEN_FILES.filter(
      (f) =>
        !MAY_USE.has(f) &&
        /\b(bg|text|border|fill|stroke|ring|outline)-accent\b|--color-accent\b/.test(
          read(f),
        ),
    );
    expect(hits).toEqual([]);
  });
});

describe("the welcome screen", () => {
  test("has no mascot", () => {
    expect(read("src/components/onboarding/screens/Welcome.tsx")).not.toMatch(
      /Mascot/,
    );
  });
});

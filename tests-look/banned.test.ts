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
    // The recording pill's dot and spinner (founder, 2026-11-16); held to those two below.
    "src/overlay/RecordingOverlay.css",
    // A chosen picture card is a selected radio; its pill picture shows the pill's dot (still 10, approved 2026-11-18).
    "src/components/ui/PictureCards.tsx",
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

describe("the recording pill", () => {
  // Rules of the pill's stylesheet that name the accent, by selector.
  const css = read("src/overlay/RecordingOverlay.css").replace(
    /\/\*[\s\S]*?\*\//g,
    "",
  );
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
    selector: m[1].trim(),
    body: m[2],
  }));
  const accentRules = rules.filter((r) => /--color-accent\b/.test(r.body));

  test("the dot is the accent once the microphone is listening", () => {
    const dot = rules.find((r) => r.selector === ".sdot.ready");
    expect(dot?.body).toMatch(/background:\s*var\(--color-accent\)/);
  });

  test("the spinner is the accent", () => {
    const spinner = rules.find((r) => r.selector === ".sspinner");
    expect(spinner?.body).toMatch(/border-top-color:\s*var\(--color-accent\)/);
  });

  test("the accent is used on nothing else in the pill", () => {
    expect(accentRules.map((r) => r.selector).sort()).toEqual([
      ".sdot.ready",
      ".sspinner",
    ]);
    expect(read("src/overlay/RecordingOverlay.tsx")).not.toMatch(/accent/);
  });

  test("the bars and the getting-ready dot are not the accent", () => {
    for (const selector of [".swave i", ".sdot.arming"]) {
      const rule = rules.find((r) => r.selector === selector);
      expect(rule?.body ?? "").not.toMatch(/accent/);
    }
  });
});

describe("the welcome screen", () => {
  test("has no mascot", () => {
    expect(read("src/components/onboarding/screens/Welcome.tsx")).not.toMatch(
      /Mascot/,
    );
  });
});

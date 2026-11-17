// The app icon and the tray images (stills 02b and 03).
import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, read } from "./lib";

const TRAY = [
  "tray_idle",
  "tray_recording",
  "tray_transcribing",
  "tray_idle_warning",
  "tray_idle_dark",
  "tray_recording_dark",
  "tray_transcribing_dark",
  "tray_idle_warning_dark",
  "handy",
  "recording",
  "transcribing",
  "handy_warning",
];

const colours = (svg: string) =>
  new Set([...svg.matchAll(/#[0-9a-f]{6}\b/gi)].map((m) => m[0].toUpperCase()));

/** Width and height from a PNG's header. */
function pngSize(path: string) {
  const b = readFileSync(join(ROOT, path));
  expect(b.subarray(1, 4).toString()).toBe("PNG");
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

describe("app icon", () => {
  // Founder, 2026-11-18: the slash white, the two sound arcs in the accent.
  test("the shipped icon is the dark ground, a white slash and accent arcs", () => {
    const svg = read("branding/app-icon.svg");
    expect(colours(svg)).toEqual(new Set(["#1A1A1A", "#FFFFFF", "#F0532B"]));
    const slash = svg.match(/<path d="M[^"]*Z"[^>]*>/)?.[0] ?? "";
    expect(slash).toMatch(/fill="#FFFFFF"/);
    const arcs = [...svg.matchAll(/<path d="M[^"]*Q[^"]*"[^>]*>/g)];
    expect(arcs.length).toBe(2);
    for (const [arc] of arcs) expect(arc).toMatch(/stroke="#F0532B"/);
  });

  test("the light-mode icon is the accent ground with a white mark", () => {
    expect(colours(read("branding/app-icon-light.svg"))).toEqual(
      new Set(["#F0532B", "#FFFFFF"]),
    );
  });

  test("the generated icons exist", () => {
    for (const f of [
      "32x32.png",
      "128x128.png",
      "128x128@2x.png",
      "icon.icns",
      "icon.ico",
    ]) {
      expect(
        readFileSync(join(ROOT, "src-tauri/icons", f)).length,
      ).toBeGreaterThan(0);
    }
  });
});

describe("tray images", () => {
  for (const name of TRAY) {
    test(`${name} has a source and is 64 by 64`, () => {
      expect(read(`branding/tray/${name}.svg`)).toContain("<svg");
      expect(pngSize(`src-tauri/resources/${name}.png`)).toEqual({
        w: 64,
        h: 64,
      });
    });
  }

  test("recording and transcribing are never red or the accent", () => {
    const RED = ["#F0532B", "#E5484D", "#C62828"];
    for (const name of TRAY.filter((n) => /recording|transcribing/.test(n))) {
      const used = colours(read(`branding/tray/${name}.svg`));
      expect(RED.filter((c) => used.has(c))).toEqual([]);
    }
  });

  test("only the needs-attention images carry a colour, and it is amber", () => {
    const AMBER = new Set(["#E2A336", "#9A6700"]);
    const NEUTRAL = new Set(["#ECECEC", "#1A1A1A"]);
    for (const name of TRAY) {
      const used = [...colours(read(`branding/tray/${name}.svg`))];
      const warning = /warning/.test(name);
      expect(
        used.filter((c) => !NEUTRAL.has(c) && !(warning && AMBER.has(c))),
      ).toEqual([]);
      if (warning) expect(used.some((c) => AMBER.has(c))).toBe(true);
    }
  });
});

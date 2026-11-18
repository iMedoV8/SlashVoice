// The app icon and the tray images (stills 02b and 03).
import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { inflateSync } from "node:zlib";
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

/** Read alpha at the four edge midpoints of the largest PNG in an ICO. */
function icoEdgeAlphas(path: string) {
  const ico = readFileSync(join(ROOT, path));
  expect(ico.readUInt16LE(2)).toBe(1);
  const count = ico.readUInt16LE(4);
  expect(count).toBeGreaterThan(0);
  const entries = Array.from({ length: count }, (_, i) => {
    const p = 6 + i * 16;
    return {
      width: ico[p] || 256,
      height: ico[p + 1] || 256,
      size: ico.readUInt32LE(p + 8),
      offset: ico.readUInt32LE(p + 12),
    };
  });
  const entry = entries.sort(
    (a, b) => b.width * b.height - a.width * a.height,
  )[0];
  const png = ico.subarray(entry.offset, entry.offset + entry.size);
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(png.readUInt32BE(16)).toBe(entry.width);
  expect(png.readUInt32BE(20)).toBe(entry.height);
  expect(png[24]).toBe(8); // 8-bit RGBA
  expect(png[25]).toBe(6);
  expect(png[28]).toBe(0); // non-interlaced
  const chunks: Buffer[] = [];
  for (let p = 8; p < png.length; ) {
    const size = png.readUInt32BE(p);
    const type = png.toString("ascii", p + 4, p + 8);
    if (type === "IDAT") chunks.push(png.subarray(p + 8, p + 8 + size));
    p += size + 12;
    if (type === "IEND") break;
  }
  const raw = inflateSync(Buffer.concat(chunks));
  const stride = entry.width * 4;
  const pixels = Buffer.alloc(stride * entry.height);
  for (let y = 0; y < entry.height; y++) {
    const filter = raw[y * (stride + 1)];
    expect(filter).toBeLessThanOrEqual(4);
    for (let x = 0; x < stride; x++) {
      const left = x >= 4 ? pixels[y * stride + x - 4] : 0;
      const up = y ? pixels[(y - 1) * stride + x] : 0;
      const upperLeft = y && x >= 4 ? pixels[(y - 1) * stride + x - 4] : 0;
      const estimate = left + up - upperLeft;
      const distances = [
        Math.abs(estimate - left),
        Math.abs(estimate - up),
        Math.abs(estimate - upperLeft),
      ];
      const paeth =
        distances[0] <= distances[1] && distances[0] <= distances[2]
          ? left
          : distances[1] <= distances[2]
            ? up
            : upperLeft;
      const predictor = [0, left, up, Math.floor((left + up) / 2), paeth][
        filter
      ];
      pixels[y * stride + x] =
        (raw[y * (stride + 1) + 1 + x] + predictor) & 255;
    }
  }
  const near = Math.floor(entry.width * 0.04);
  const middle = Math.floor(entry.width / 2);
  return [
    [near, middle],
    [entry.width - 1 - near, middle],
    [middle, near],
    [middle, entry.height - 1 - near],
  ].map(([x, y]) => pixels[y * stride + x * 4 + 3]);
}

describe("app icon", () => {
  test("the Windows artwork uses the same colours and fills the canvas", () => {
    const svg = read("branding/app-icon-windows.svg");
    expect(colours(svg)).toEqual(colours(read("branding/app-icon.svg")));
    const tile = svg.match(/<rect\b[^>]*>/)?.[0] ?? "";
    const value = (name: string) =>
      Number(tile.match(new RegExp(`${name}="(\\d+)"`))?.[1]);
    expect(value("width")).toBeGreaterThanOrEqual(1024 * 0.95);
    expect(value("height")).toBeGreaterThanOrEqual(1024 * 0.95);
    expect(value("x")).toBeLessThanOrEqual(1024 * 0.05);
    expect(value("y")).toBeLessThanOrEqual(1024 * 0.05);
    expect(value("x") + value("width")).toBeGreaterThanOrEqual(1024 * 0.95);
    expect(value("y") + value("height")).toBeGreaterThanOrEqual(1024 * 0.95);
  });

  test("the largest Windows icon has opaque pixels near each edge midpoint", () => {
    for (const alpha of icoEdgeAlphas("src-tauri/icons/icon.ico"))
      expect(alpha).toBe(255);
  });

  test("the Mac icon remains unchanged", () => {
    const icns = readFileSync(join(ROOT, "src-tauri/icons/icon.icns"));
    expect(createHash("sha256").update(icns).digest("hex")).toBe(
      "533580a4260d9fb6007e1d2fd20bc641b642ca5d4dfae6589d05474150ee02f0",
    );
  });
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

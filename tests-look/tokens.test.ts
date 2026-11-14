// The palette, typefaces and corners match specs/001-slash-look/contracts/look-tokens.md.
import { describe, expect, test } from "bun:test";
import { block, palette, read, resolve } from "./lib";

// [role, dark, light]. Values from ../Slash/DESIGN.md, copied into the contract.
const EXPECTED: [string, string, string][] = [
  ["background", "#121212", "#F5F5F3"],
  ["text", "#ECECEC", "#1A1A1A"],
  ["ink-2", "#A6A6A6", "#5C5C5C"],
  ["ink-3", "#858585", "#767676"],
  ["line", "#FFFFFF1F", "#00000017"],
  ["wash", "#FFFFFF16", "#0000000F"],
  ["selected", "#FFFFFF1F", "#00000017"],
  ["sunken", "#00000045", "#0000000D"],
  ["accent", "#F0532B", "#F0532B"],
  ["on-accent", "#1B0A04", "#FFFFFF"],
  ["moss", "#4CC38A", "#1A7F4B"],
  ["error", "#E5484D", "#C62828"],
  ["warning", "#E2A336", "#9A6700"],
  ["info", "#5B9DFF", "#1F6FEB"],
];

// Handy's highlight, key-cap ink and old primary fill are neutral now: the text colour.
const SAME_AS_TEXT = ["logo-primary", "plum", "background-ui"];

const { light, dark, media } = palette();
const up = (v: string) => v.toUpperCase();

describe("the palette", () => {
  for (const [role, d, l] of EXPECTED) {
    test(`${role} is ${d} in dark and ${l} in light`, () => {
      expect(up(resolve(dark, `--color-${role}`))).toBe(d);
      expect(up(resolve(light, `--color-${role}`))).toBe(l);
    });
    test(`${role} follows the system's dark mode too`, () => {
      expect(up(resolve(media, `--color-${role}`))).toBe(d);
    });
  }

  for (const role of SAME_AS_TEXT) {
    test(`${role} is the primary text colour in both modes`, () => {
      expect(up(resolve(dark, `--color-${role}`))).toBe("#ECECEC");
      expect(up(resolve(light, `--color-${role}`))).toBe("#1A1A1A");
    });
  }

  test("the new roles are available to the screens as utilities", () => {
    const registered = block(read("src/App.css"), "@theme inline {");
    for (const role of ["accent", "on-accent", "selected", "sunken", "info"]) {
      expect(registered).toContain(`--color-${role}: var(--color-${role})`);
    }
  });
});

describe("typefaces and corners", () => {
  const theme = block(read("src/App.css"), "@theme {");
  const stack = (name: string) =>
    theme.match(new RegExp(`--font-${name}:([^;]+);`))?.[1] ?? "";

  test("the interface is set in Onest, with IBM Plex Sans Arabic for Arabic", () => {
    for (const name of ["ui", "display"]) {
      const s = stack(name);
      expect(s.trim().startsWith('"Onest Variable"')).toBe(true);
      expect(s).toContain('"IBM Plex Sans Arabic"');
    }
  });

  test("code and key caps are set in JetBrains Mono", () => {
    expect(stack("mono").trim().startsWith('"JetBrains Mono Variable"')).toBe(
      true,
    );
  });

  test("controls have 8-point corners, panels 12, dialogs 16", () => {
    expect(theme).toMatch(/--radius-control:\s*8px/);
    expect(theme).toMatch(/--radius-panel:\s*12px/);
    expect(theme).toMatch(/--radius-dialog:\s*16px/);
  });
});

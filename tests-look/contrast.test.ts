// Text contrast, from the table in specs/001-slash-look/contracts/look-tokens.md.
// Two pairs carry a lower floor: they are the brand's own light values, which
// fall short of 4.5 to 1 and are reported to the founder, not changed here.
import { describe, expect, test } from "bun:test";
import { contrast, hex, over, palette, resolve } from "./lib";

const { light, dark } = palette();
const colour = (mode: Map<string, string>, role: string) =>
  hex(resolve(mode, `--color-${role}`));

// [foreground, background, mode, minimum]
const PAIRS: [string, string, "dark" | "light", number][] = [
  ["text", "background", "dark", 4.5],
  ["text", "background", "light", 4.5],
  ["ink-2", "background", "dark", 4.5],
  ["ink-2", "background", "light", 4.5],
  ["ink-3", "background", "dark", 4.5],
  ["ink-3", "background", "light", 3],
  ["on-accent", "accent", "dark", 4.5],
  ["on-accent", "accent", "light", 3],
  ["text", "selected", "dark", 4.5],
  ["text", "selected", "light", 4.5],
  ["ink-2", "wash", "dark", 4.5],
  ["ink-2", "wash", "light", 4.5],
];

describe("contrast", () => {
  for (const [fg, bg, mode, min] of PAIRS) {
    test(`${fg} on ${bg} in ${mode} is at least ${min} to 1`, () => {
      const m = mode === "dark" ? dark : light;
      const window = colour(m, "background");
      const back = over(colour(m, bg), window);
      const front = over(colour(m, fg), back);
      expect(contrast(front, back)).toBeGreaterThanOrEqual(min);
    });
  }
});

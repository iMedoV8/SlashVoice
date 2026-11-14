// Shared helpers for the look checks (specs/001-slash-look).
// They read files only; nothing here starts the app or touches the network.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export const ROOT = join(import.meta.dir, "..");

export const read = (path: string) => readFileSync(join(ROOT, path), "utf8");

/** Every file under `dir` (relative to the repo root) whose name passes `keep`. */
export function walk(dir: string, keep: (name: string) => boolean): string[] {
  const out: string[] = [];
  const visit = (abs: string) => {
    for (const name of readdirSync(abs)) {
      const p = join(abs, name);
      if (statSync(p).isDirectory()) visit(p);
      else if (keep(name)) out.push(relative(ROOT, p));
    }
  };
  visit(join(ROOT, dir));
  return out;
}

/** The text between the braces that follow the first match of `opener`. */
export function block(css: string, opener: string): string {
  const start = css.indexOf(opener);
  if (start < 0) throw new Error(`no block starting with ${opener}`);
  let depth = 0;
  for (let i = css.indexOf("{", start); i < css.length; i++) {
    if (css[i] === "{") depth++;
    if (css[i] === "}" && --depth === 0) {
      return css.slice(css.indexOf("{", start) + 1, i);
    }
  }
  throw new Error(`unclosed block ${opener}`);
}

/** Custom properties declared directly in a block, nested blocks excluded. */
export function declarations(text: string): Map<string, string> {
  let flat = "";
  let depth = 0;
  for (const ch of text) {
    if (ch === "{") depth++;
    if (depth === 0) flat += ch;
    if (ch === "}") depth--;
  }
  const out = new Map<string, string>();
  for (const m of flat
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    out.set(m[1], m[2].replace(/\s+/g, " ").trim());
  }
  return out;
}

/** Follows `var(--x)` references within one map until a plain value is left. */
export function resolve(
  vars: Map<string, string>,
  name: string,
  seen = new Set<string>(),
): string {
  const value = vars.get(name);
  if (value === undefined) throw new Error(`${name} is not declared`);
  const ref = value.match(/^var\((--[\w-]+)\)$/);
  if (!ref) return value;
  if (seen.has(name)) throw new Error(`${name} refers to itself`);
  seen.add(name);
  return resolve(vars, ref[1], seen);
}

export type Rgba = { r: number; g: number; b: number; a: number };

/** Parses #RGB, #RRGGBB or #RRGGBBAA. */
export function hex(value: string): Rgba {
  const h = value.trim().replace(/^#/, "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  if (!/^([0-9a-f]{6}|[0-9a-f]{8})$/i.test(full))
    throw new Error(`not a hex colour: ${value}`);
  const n = (i: number) => parseInt(full.slice(i, i + 2), 16);
  return { r: n(0), g: n(2), b: n(4), a: full.length === 8 ? n(6) / 255 : 1 };
}

/** A translucent colour drawn over an opaque one. */
export function over(top: Rgba, under: Rgba): Rgba {
  const mix = (t: number, u: number) => t * top.a + u * (1 - top.a);
  return {
    r: mix(top.r, under.r),
    g: mix(top.g, under.g),
    b: mix(top.b, under.b),
    a: 1,
  };
}

/** WCAG 2.2 contrast ratio between two opaque colours. */
export function contrast(a: Rgba, b: Rgba): number {
  const lum = ({ r, g, b }: Rgba) => {
    const ch = (v: number) => {
      const s = v / 255;
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** The palette as the app resolves it in each mode. */
export function palette() {
  const css = read("src/styles/theme.css");
  const root = declarations(block(css, ":root {"));
  const light = new Map(root);
  for (const [k, v] of declarations(block(css, ':root[data-theme="light"] {')))
    light.set(k, v);
  const dark = new Map(root);
  for (const [k, v] of declarations(block(css, ':root[data-theme="dark"] {')))
    dark.set(k, v);
  const media = new Map(root);
  for (const [k, v] of declarations(
    block(block(css, "@media (prefers-color-scheme: dark) {"), ":root {"),
  )) {
    media.set(k, v);
  }
  return { css, light, dark, media };
}

// The look loads nothing from the network (RULES.md §3): typefaces are bundled.
import { describe, expect, test } from "bun:test";
import { read, walk } from "./lib";

const FONTS = [
  "@fontsource-variable/onest",
  "@fontsource-variable/jetbrains-mono",
  "@fontsource/ibm-plex-sans-arabic",
];

describe("offline look", () => {
  test("no stylesheet names a web address", () => {
    const hits = walk("src", (n) => n.endsWith(".css")).filter((f) =>
      /https?:\/\//.test(read(f)),
    );
    expect(hits).toEqual([]);
  });

  test("no page loads a style, font or script from the web", () => {
    for (const page of ["index.html", "src/overlay/index.html"]) {
      expect(read(page)).not.toMatch(
        /<(link|script)[^>]+(href|src)=["']https?:/i,
      );
    }
  });

  test("the three typefaces are imported by both windows", () => {
    for (const entry of ["src/main.tsx", "src/overlay/main.tsx"]) {
      const text = read(entry);
      for (const pkg of FONTS) expect(text).toContain(`"${pkg}`);
    }
  });

  test("the bundled typefaces point at their own files only", () => {
    for (const entry of ["src/main.tsx", "src/overlay/main.tsx"]) {
      for (const m of read(entry).matchAll(/import "(@fontsource[^"]+)";/g)) {
        const path = m[1].endsWith(".css") ? m[1] : `${m[1]}/index.css`;
        const css = read(`node_modules/${path}`);
        const urls = [...css.matchAll(/url\(([^)]+)\)/g)].map((u) => u[1]);
        expect(urls.length).toBeGreaterThan(0);
        expect(urls.filter((u) => !u.startsWith("./"))).toEqual([]);
      }
    }
  });
});

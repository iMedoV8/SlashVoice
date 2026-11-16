// Checks that the repository is fit to be public (specs/003-open-source).
// They read tracked files only; nothing here starts the app or the network.
import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT, read, walk } from "./lib";

const tracked = Bun.spawnSync(["git", "ls-files"], { cwd: ROOT })
  .stdout.toString()
  .split("\n")
  .filter(Boolean);

const TEXT = /\.(md|ts|tsx|js|json|rs|toml|ya?ml|css|html|sh|nix|nsi|txt)$/;
// The checks name what they forbid, so they are not searched themselves.
const SELF = "tests-look/public.test.ts";

describe("the front page is ours", () => {
  test("the readme is titled Slash Voice", () => {
    expect(read("README.md").split("\n")[0]).toBe("# Slash Voice");
  });

  test("the readme credits Handy and links to it", () => {
    const readme = read("README.md");
    expect(readme).toContain("Built on Handy");
    expect(readme).toContain("https://github.com/cjpais/Handy");
  });

  test("the readme names Handy only in its closing credit", () => {
    const lines = read("README.md").split("\n");
    const credit = lines.indexOf("## Built on Handy");
    expect(credit).toBeGreaterThan(0);
    const early = lines.slice(0, credit).filter((l) => /handy/i.test(l));
    expect(early).toEqual([]);
  });

  test("the readme carries no Handy community or sponsor link", () => {
    expect(read("README.md")).not.toMatch(
      /discord|handy\.computer\/donate|sponsor-images/i,
    );
  });

  test("the licence is MIT and names both copyright holders", () => {
    const licence = read("LICENSE");
    expect(licence).toContain("MIT License");
    expect(licence).toContain("Copyright (c) 2025 CJ Pais");
    expect(licence).toContain("Slash Voice contributors");
  });

  test("credits and a security policy exist", () => {
    expect(existsSync(join(ROOT, "CREDITS.md"))).toBe(true);
    expect(existsSync(join(ROOT, "SECURITY.md"))).toBe(true);
  });
});

describe("nothing private or borrowed is published", () => {
  test.each([
    "research",
    "HANDOFF.md",
    "docs/2026-11-11-slash-voice-design.md",
    "sponsor-images",
    ".github/FUNDING.yml",
  ])("%s is not in the repository", (path) => {
    expect(
      tracked.filter((f) => f === path || f.startsWith(`${path}/`)),
    ).toEqual([]);
  });

  test("no tracked file names a personal folder or address", () => {
    const personal = new RegExp(
      ["/Users/" + "imedo", "@" + "gmail\\.com"].join("|"),
    );
    const hits = tracked
      .filter((f) => TEXT.test(f) && f !== SELF && existsSync(join(ROOT, f)))
      .filter((f) => personal.test(read(f)));
    expect(hits).toEqual([]);
  });

  test("only our own workflows are present", () => {
    const allowed = ["checks.yml", "release.yml"];
    const found = readdirSync(join(ROOT, ".github/workflows"));
    expect(found.filter((f) => !allowed.includes(f))).toEqual([]);
  });

  test("Handy's release notes are not bundled", () => {
    const notes = readdirSync(join(ROOT, "src/content/release-notes")).filter(
      (f) => f !== "README.md",
    );
    expect(notes).toEqual([]);
    expect(existsSync(join(ROOT, "public/release-notes"))).toBe(false);
  });
});

describe("links lead to this repository", () => {
  test("no screen links to Handy's website", () => {
    const hits = walk("src", (n) => /\.(ts|tsx)$/.test(n))
      .filter((f) => !f.endsWith("bindings.ts"))
      .filter((f) => /https?:\/\/handy\.computer/.test(read(f)));
    expect(hits).toEqual([]);
  });

  test("guides and forms do not send people to Handy's tracker", () => {
    const files = [
      "README.md",
      "CONTRIBUTING.md",
      "CONTRIBUTING_TRANSLATIONS.md",
      "BUILD.md",
      "SECURITY.md",
      ...walk(".github", (n) => /\.(md|ya?ml)$/.test(n)),
    ];
    const hits = files.filter((f) =>
      /cjpais\/Handy\/(issues|discussions|pulls)|contact@handy\.computer|discord\.com/.test(
        read(f),
      ),
    );
    expect(hits).toEqual([]);
  });
});

describe("the version is ours", () => {
  test("the three version fields agree and are not Handy's", () => {
    const pkg = JSON.parse(read("package.json")).version;
    const conf = JSON.parse(read("src-tauri/tauri.conf.json")).version;
    const cargo = read("src-tauri/Cargo.toml").match(
      /^version = "([^"]+)"/m,
    )?.[1];
    expect(conf).toBe(pkg);
    expect(cargo).toBe(pkg);
    expect(pkg).not.toBe("0.10.0");
  });
});

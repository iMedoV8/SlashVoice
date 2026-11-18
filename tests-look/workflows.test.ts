// Checks on the pipeline's own files (specs/004-installers).
// They read files only; nothing here starts a build or touches the network.
import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT, read } from "./lib";

const DIR = ".github/workflows";
const workflows = readdirSync(join(ROOT, DIR)).map((f) => `${DIR}/${f}`);
const RELEASE = `${DIR}/release.yml`;
const release = () => read(RELEASE);

/** The lines of one top-level job, by its key. */
function job(text: string, name: string): string {
  const lines = text.split("\n");
  const start = lines.findIndex((l) => l === `  ${name}:`);
  if (start < 0) throw new Error(`no job named ${name}`);
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((l) => /^ {2}\S/.test(l));
  return rest.slice(0, end < 0 ? undefined : end).join("\n");
}

describe("every workflow", () => {
  test.each(workflows)("%s pins each action to a full commit", (file) => {
    const uses = [...read(file).matchAll(/^\s*-?\s*uses:\s*(\S+)/gm)].map(
      (m) => m[1],
    );
    expect(uses.filter((u) => !/@[0-9a-f]{40}$/.test(u))).toEqual([]);
  });

  test.each(workflows)("%s gives its token read access by default", (file) => {
    expect(read(file)).toMatch(/^permissions:\n {2}contents: read$/m);
  });
});

describe("the release workflow", () => {
  test("exists", () => {
    expect(existsSync(join(ROOT, RELEASE))).toBe(true);
  });

  test("starts only by hand or from a pull request that changes it", () => {
    const on = release().match(/^on:\n((?: {2}.*\n|\n)+)/m)?.[1] ?? "";
    const triggers = [...on.matchAll(/^ {2}(\w+):/gm)].map((m) => m[1]);
    expect(triggers.sort()).toEqual(["pull_request", "workflow_dispatch"]);
    expect(on).toMatch(
      /pull_request:\n {4}paths:\n {6}- "?\.github\/workflows\/release\.yml"?/,
    );
  });

  // Since specs/009-updates (founder, 2026-11-18): the four signing secrets,
  // and no other.
  test("names only the four signing secrets", () => {
    const named = new Set(
      [...release().matchAll(/secrets\.(\w+)/g)].map((m) => m[1]),
    );
    expect([...named].sort()).toEqual([
      "APPLE_CERTIFICATE",
      "APPLE_CERTIFICATE_PASSWORD",
      "TAURI_SIGNING_PRIVATE_KEY",
      "TAURI_SIGNING_PRIVATE_KEY_PASSWORD",
    ]);
  });

  test("only the release job may write, and only when started by hand", () => {
    const text = release();
    const writers = [...text.matchAll(/^ {2}(\w[\w-]*):$/gm)]
      .map((m) => m[1])
      .filter((name) => /contents: write/.test(job(text, name)));
    expect(writers).toEqual(["release"]);
    expect(job(text, "release")).toMatch(
      /if: github\.event_name == 'workflow_dispatch'/,
    );
  });

  // A draft until the founder publishes it; an ordinary release, because the
  // update feed's "latest" address skips pre-releases (specs/009-updates, R4).
  test("creates the release as a draft, not a pre-release", () => {
    const create = release().match(
      /gh release create[^\n]*(\n\s+[^\n]*)*/,
    )?.[0];
    expect(create).toContain("--draft");
    expect(create).not.toContain("--prerelease");
  });

  test("never replaces the files of a published release", () => {
    expect(job(release(), "release")).toMatch(/isDraft/);
  });

  // Since specs/009-updates: update files are built and signed, but only
  // with the founder's keys, only when started by hand, and never with
  // Windows (Azure) signing, which this project does not have.
  test("signs update files only when started by hand, with no Azure key", () => {
    const conf = JSON.parse(read("src-tauri/tauri.conf.json"));
    expect(conf.bundle.createUpdaterArtifacts).toBe(true);
    expect(release()).not.toMatch(/AZURE_/);
    for (const line of release().split("\n")) {
      if (/secrets\./.test(line))
        expect(line).toContain("github.event_name == 'workflow_dispatch'");
    }
  });
});

describe("the model inside the installers", () => {
  test("the bundled silence detector matches the catalogue's checksum", () => {
    const catalog = JSON.parse(read("src-tauri/src/catalog/catalog.json"));
    const entry = catalog.models.find(
      (m: { id: string }) => m.id === "silero-vad-v6.2",
    );
    const file = entry.files[entry.quant];
    const bytes = readFileSync(
      join(ROOT, "src-tauri/resources/models", file.filename),
    );
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(file.sha256);
  });

  test("its licence notice is in the credits", () => {
    expect(read("CREDITS.md")).toContain("Silero Team");
  });
});

// Updates (specs/009-updates). These read the configuration, the switch and
// the release workflow; the update logic itself is tested in updates.rs.
import { describe, expect, test } from "bun:test";
import { read } from "./lib";

const conf = JSON.parse(read("src-tauri/tauri.conf.json"));
const updates = read("src-tauri/src/updates.rs");
const workflow = read(".github/workflows/release.yml");
const keyId = (b64: string) => Buffer.from(b64, "base64").toString("utf8");

describe("the app's updater", () => {
  test("reads one feed, on our repository", () => {
    expect(conf.plugins.updater.endpoints).toEqual([
      "https://github.com/iMedoV8/SlashVoice/releases/latest/download/latest.json",
    ]);
    expect(updates).toContain(conf.plugins.updater.endpoints[0]);
  });

  test("trusts Slash Voice's key, not Handy's", () => {
    const key = conf.plugins.updater.pubkey;
    expect(keyId(key)).toContain("6105EBE0FEE4F9D1");
    expect(keyId(key)).not.toContain("BAB72095206601F9");
    expect(updates).toContain(`"${key}"`);
  });

  test("builds update files", () => {
    expect(conf.bundle.createUpdaterArtifacts).toBe(true);
  });

  test("self-update is switched on now that the feed is ours", () => {
    expect(read("src-tauri/src/settings.rs")).toMatch(
      /const SLASH_VOICE_HAS_RELEASE_FEED: bool = true;/,
    );
  });

  test("the exit hook calls the install-at-quit path (source check)", () => {
    expect(read("src-tauri/src/lib.rs")).toMatch(
      /RunEvent::Exit\b[\s\S]{0,200}updates::install_on_quit/,
    );
  });
});

describe("the release workflow", () => {
  const SECRETS = [
    "APPLE_CERTIFICATE",
    "APPLE_CERTIFICATE_PASSWORD",
    "TAURI_SIGNING_PRIVATE_KEY",
    "TAURI_SIGNING_PRIVATE_KEY_PASSWORD",
  ];

  test("signs with the four secrets", () => {
    for (const s of SECRETS) expect(workflow).toContain(`secrets.${s}`);
  });

  test("reads secrets only when started by hand on main", () => {
    for (const line of workflow.split("\n")) {
      if (!/secrets\.(APPLE_|TAURI_SIGNING)/.test(line)) continue;
      expect(line).toMatch(
        /github\.event_name == 'workflow_dispatch' && github\.ref == 'refs\/heads\/main'/,
      );
    }
  });

  test("releases only from main", () => {
    expect(workflow).toMatch(
      /release:\n(?:.*\n){1,3}\s+if: github\.event_name == 'workflow_dispatch' && github\.ref == 'refs\/heads\/main'/,
    );
  });

  // A source check: no echo of a secret's value. It cannot prove a build
  // script never prints one; the run's own masking covers that.
  test("does not echo a secret", () => {
    expect(workflow).not.toMatch(/echo[^\n]*\$\{\{\s*secrets\./);
    expect(workflow).not.toMatch(
      /echo[^\n]*\$(APPLE_CERTIFICATE|TAURI_SIGNING)/,
    );
  });

  test("writes the feed and attaches the signatures", () => {
    expect(workflow).toContain("latest.json");
    expect(workflow).toContain(".sig");
    expect(workflow).toContain("darwin-aarch64");
    expect(workflow).toContain("windows-x86_64");
  });
});

describe("the window", () => {
  const imports = (file: string, what: string) =>
    new RegExp(`import[^;]*\\b${what}\\b[^;]*from`).test(read(file));

  test("a waiting update shows in the sidebar's foot with Restart", () => {
    expect(imports("src/components/ModelFoot.tsx", "UpdateNotice")).toBe(true);
    const notice = read("src/components/UpdateNotice.tsx");
    expect(notice).toContain("restartToUpdate");
    expect(notice).toContain('"update-ready"');
    expect(notice).toContain('"update-failed"');
  });

  test("the update check switch is on About, not on Debug", () => {
    const about = "src/components/settings/about/AboutSettings.tsx";
    const debug = "src/components/settings/debug/DebugSettings.tsx";
    expect(imports(about, "UpdateChecksToggle")).toBe(true);
    expect(imports(debug, "UpdateChecksToggle")).toBe(false);
  });

  test("its text is in English and Arabic", () => {
    const has = (lang: string, key: string) =>
      key
        .split(".")
        .reduce(
          (n: any, k) => n?.[k],
          JSON.parse(read(`src/i18n/locales/${lang}/translation.json`)),
        ) !== undefined;
    const keys = [
      ...read("src/components/UpdateNotice.tsx").matchAll(
        /\bt\(\s*"([\w.]+)"/g,
      ),
    ].map((m) => m[1]);
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) {
      expect(has("en", key)).toBe(true);
      expect(has("ar", key)).toBe(true);
    }
  });
});

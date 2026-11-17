// Our own look, direction C (specs/008-own-look). The screens cannot be
// rendered under test (specs/001-slash-look/research.md, R5), so these read the
// source.
import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, read, walk } from "./lib";

const sidebar = read("src/components/Sidebar.tsx");
const app = read("src/App.tsx");

/** The keys of SECTIONS_CONFIG, in the order they are written. */
const sectionOrder = () => {
  const start = sidebar.indexOf("export const SECTIONS_CONFIG = {");
  const end = sidebar.indexOf("} as const", start);
  return [...sidebar.slice(start, end).matchAll(/^ {2}(\w+): \{/gm)].map(
    (m) => m[1],
  );
};

const imports = (source: string, what: string) =>
  new RegExp(`import[^;]*\\b${what}\\b[^;]*from`).test(source);

describe("the frame", () => {
  test("the pages are History and Words, then the settings, then About", () => {
    expect(sectionOrder()).toEqual([
      "history",
      "words",
      "general",
      "models",
      "postprocessing",
      "advanced",
      "debug",
      "about",
    ]);
  });

  test("the window opens on History", () => {
    expect(app).toMatch(/useState<SidebarSection>\(\s*"history"\s*\)/);
  });

  test("the sidebar starts with the logo, then the status line", () => {
    const logo = sidebar.indexOf("<HandyTextLogo");
    const status = sidebar.indexOf("<StatusLine");
    expect(logo).toBeGreaterThan(0);
    expect(status).toBeGreaterThan(logo);
  });

  test("About sits at the sidebar's foot with the version", () => {
    expect(sidebar).toMatch(/footSection/);
    expect(sidebar).toMatch(/version/);
  });

  test("the bottom bar is not mounted", () => {
    expect(imports(app, "Footer")).toBe(false);
    expect(app).not.toMatch(/<Footer\b/);
  });

  test("the model in use, the transcription status and the notices sit in the sidebar's foot", () => {
    const foot = read("src/components/ModelFoot.tsx");
    for (const part of ["ModelSelector", "TranscriptionStatus", "NoticeChip"]) {
      expect(imports(foot, part)).toBe(true);
    }
    expect(sidebar).toMatch(/<ModelFoot\b/);
  });

  test("a settings row has no info button and no reset button", () => {
    const row = read("src/components/ui/SettingContainer.tsx");
    expect(imports(row, "InfoTooltip")).toBe(false);
    const settingsFiles = walk("src/components", (n) => n.endsWith(".tsx"));
    const withReset = settingsFiles.filter((f) =>
      imports(read(f), "ResetButton"),
    );
    expect(withReset).toEqual([]);
  });

  test("a settings group puts its name and one line beside its rows", () => {
    const group = read("src/components/ui/SettingsGroup.tsx");
    expect(group).toMatch(/grid-cols-\[/);
    expect(group).toMatch(/description/);
  });

  test("every page has a header with its title and room for actions", () => {
    expect(existsSync(join(ROOT, "src/components/ui/PageHeader.tsx"))).toBe(
      true,
    );
    expect(app).toMatch(/<PageHeader\b/);
  });
});

describe("the pages", () => {
  test("Words has its own page, with your words, and Advanced no longer does", () => {
    const words = read("src/components/settings/words/WordsSettings.tsx");
    expect(imports(words, "CustomWords")).toBe(true);
    expect(
      imports(
        read("src/components/settings/advanced/AdvancedSettings.tsx"),
        "CustomWords",
      ),
    ).toBe(false);
  });

  test("theme and app language are on General, not on About", () => {
    const general = read("src/components/settings/general/GeneralSettings.tsx");
    const about = read("src/components/settings/about/AboutSettings.tsx");
    for (const part of ["ThemeSelector", "AppLanguageSelector"]) {
      expect(imports(general, part)).toBe(true);
      expect(imports(about, part)).toBe(false);
    }
  });

  test("shortcut behaviour is a three-part switch, not a menu", () => {
    const behaviour = read("src/components/settings/ShortcutActivation.tsx");
    expect(imports(behaviour, "SegmentedControl")).toBe(true);
    expect(imports(behaviour, "Dropdown")).toBe(false);
  });

  test("History can be searched", () => {
    const history = read("src/components/settings/history/HistorySettings.tsx");
    expect(history).toMatch(/settings\.history\.search/);
  });

  test("Advanced has a control that jumps to each group", () => {
    const advanced = read(
      "src/components/settings/advanced/AdvancedSettings.tsx",
    );
    expect(advanced).toMatch(/scrollIntoView/);
  });

  test("About keeps the credit to Handy", () => {
    const about = read("src/components/settings/about/AboutSettings.tsx");
    expect(about).toMatch(/github\.com\/cjpais\/Handy/);
    expect(about).toMatch(/settings\.about\.sourceCode/);
  });
});

describe("text", () => {
  const en = JSON.parse(read("src/i18n/locales/en/translation.json"));
  const ar = JSON.parse(read("src/i18n/locales/ar/translation.json"));
  const has = (tree: any, key: string) =>
    key.split(".").reduce((node, k) => node?.[k], tree) !== undefined;

  // Every key the new and reshaped parts ask for.
  const NEW_PARTS = [
    "src/components/Sidebar.tsx",
    "src/components/StatusLine.tsx",
    "src/components/ModelFoot.tsx",
    "src/components/settings/words/WordsSettings.tsx",
    "src/components/settings/history/HistorySettings.tsx",
    "src/components/settings/general/GeneralSettings.tsx",
    "src/components/settings/advanced/AdvancedSettings.tsx",
    "src/components/settings/about/AboutSettings.tsx",
  ];

  test("every key they use is in English and in Arabic", () => {
    const missing: string[] = [];
    for (const file of NEW_PARTS) {
      for (const m of read(file).matchAll(/\bt\(\s*"([\w.]+)"/g)) {
        if (!has(en, m[1])) missing.push(`en: ${m[1]} (${file})`);
        if (!has(ar, m[1])) missing.push(`ar: ${m[1]} (${file})`);
      }
    }
    expect(missing).toEqual([]);
  });
});

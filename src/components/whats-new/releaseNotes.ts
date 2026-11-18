export interface ReleaseNote {
  version: string;
  markdown: string;
}

interface ReleaseNoteRecord {
  version: string;
  markdown: string;
  /** The same note in other languages, by language code (`0.2.0.ar.md`). */
  translations: Map<string, string>;
}

interface FindReleaseNoteOptions {
  currentVersion: string;
  lastSeenVersion: string;
  /** The app's language; the English note when it has no translation. */
  language?: string;
}

const releaseNoteModules = import.meta.glob<string>(
  "../../content/release-notes/*.md",
  {
    eager: true,
    import: "default",
    query: "?raw",
  },
);

const releaseNotesByVersion = new Map<string, ReleaseNoteRecord>();

const parseVersion = (version: string): [number, number, number] | null => {
  const normalized = version.trim().replace(/^v/i, "");
  const match = normalized.match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) return null;

  return [Number(match[1]), Number(match[2]), Number(match[3])];
};

const translated = new Map<string, Map<string, string>>();

// `0.2.0.md` is the note in English; `0.2.0.ar.md` the same note in Arabic.
for (const [path, markdown] of Object.entries(releaseNoteModules)) {
  const match = path.match(
    /release-notes\/(\d+\.\d+\.\d+)(?:\.([a-z]{2}(?:-[A-Za-z]{2})?))?\.md$/,
  );
  if (!match) continue;

  const [, version, language] = match;
  if (language) {
    const byLanguage = translated.get(version) ?? new Map<string, string>();
    byLanguage.set(language, markdown);
    translated.set(version, byLanguage);
    continue;
  }

  releaseNotesByVersion.set(version, {
    version,
    markdown,
    translations: new Map(),
  });
}

for (const [version, byLanguage] of translated) {
  const record = releaseNotesByVersion.get(version);
  if (record) record.translations = byLanguage;
}

const inLanguage = (
  record: ReleaseNoteRecord,
  language?: string,
): ReleaseNote => {
  const base = language?.split("-")[0];
  const markdown =
    (language && record.translations.get(language)) ??
    (base && record.translations.get(base)) ??
    record.markdown;
  return { version: record.version, markdown };
};

const compareVersions = (a: string, b: string) => {
  const parsedA = parseVersion(a);
  const parsedB = parseVersion(b);

  if (!parsedA || !parsedB) return 0;

  for (let index = 0; index < parsedA.length; index += 1) {
    if (parsedA[index] !== parsedB[index]) {
      return parsedA[index] - parsedB[index];
    }
  }

  return 0;
};

export const findReleaseNoteToShow = ({
  currentVersion,
  lastSeenVersion,
  language,
}: FindReleaseNoteOptions): ReleaseNote | null => {
  if (!parseVersion(currentVersion)) return null;

  const hasValidLastSeenVersion = parseVersion(lastSeenVersion) !== null;
  const candidate = Array.from(releaseNotesByVersion.values())
    .filter((note) => compareVersions(note.version, currentVersion) <= 0)
    .filter(
      (note) =>
        !hasValidLastSeenVersion ||
        compareVersions(note.version, lastSeenVersion) > 0,
    )
    .sort((a, b) => compareVersions(b.version, a.version))[0];

  if (!candidate) return null;

  return inLanguage(candidate, language);
};

/** The newest note not newer than the running version, for Home. */
export const findCurrentReleaseNote = (
  currentVersion: string,
  language?: string,
): ReleaseNote | null => {
  if (!parseVersion(currentVersion)) return null;
  const candidate = Array.from(releaseNotesByVersion.values())
    .filter((note) => compareVersions(note.version, currentVersion) <= 0)
    .sort((a, b) => compareVersions(b.version, a.version))[0];
  return candidate ? inLanguage(candidate, language) : null;
};

export const findLatestReleaseNote = (): ReleaseNote | null => {
  const candidate = Array.from(releaseNotesByVersion.values()).sort((a, b) =>
    compareVersions(b.version, a.version),
  )[0];

  if (!candidate) return null;

  return candidate;
};

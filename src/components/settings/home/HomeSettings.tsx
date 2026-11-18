import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getVersion } from "@tauri-apps/api/app";
import { openUrl } from "@tauri-apps/plugin-opener";
import {
  ArrowUpRight,
  ChevronRight,
  CircleCheck,
  Circle,
  Info,
} from "lucide-react";
import {
  commands,
  events,
  type DictationTotals,
  type HistoryEntry,
} from "@/bindings";
import { useSettings } from "../../../hooks/useSettings";
import { useModelStore } from "../../../stores/modelStore";
import { useModelEntries } from "../models/modelEntries";
import { languageList } from "../../../lib/constants/languages";
import { findCurrentReleaseNote } from "../../whats-new/releaseNotes";
import type { SidebarSection } from "../../Sidebar";

/** Time saved compares with typing at this speed, and Home says so. */
const TYPING_WORDS_PER_MINUTE = 40;
const RECENT_COUNT = 3;
const HIDE_KEY = "slashvoice.home.gettingStartedHidden";
const RELEASES_URL = "https://github.com/iMedoV8/SlashVoice/releases/tag/v";

/** Speed and time saved from the counts; nothing else is known. */
export const workedOut = (t: DictationTotals) => {
  const minutes = t.seconds / 60;
  return {
    allWords: t.words + t.file_words,
    // Under a minute of speech the speed means little, so it waits.
    speed: t.seconds >= 60 ? Math.round(t.words / minutes) : null,
    savedMinutes: Math.max(
      0,
      Math.round(t.words / TYPING_WORDS_PER_MINUTE - minutes),
    ),
  };
};

const readHidden = () => {
  try {
    return localStorage.getItem(HIDE_KEY) === "1";
  } catch {
    return false;
  }
};

const writeHidden = () => {
  try {
    localStorage.setItem(HIDE_KEY, "1");
  } catch {
    // Not remembered; it hides for this session only.
  }
};

/** The notes' list items as plain lines. */
const noteLines = (markdown: string) =>
  markdown
    .split("\n")
    .map((line) => line.match(/^\s*[-*]\s+(.*)$/)?.[1]?.trim())
    .filter((line): line is string => !!line);

const LinkButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, children, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex cursor-pointer items-center gap-1 rounded-control text-[12.5px] text-ink-2 transition-colors hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-logo-primary/40 ${className}`}
  >
    {children}
  </button>
);

const Stat: React.FC<{ value: string; label: string; title?: string }> = ({
  value,
  label,
  title,
}) => (
  <div
    title={title}
    className="min-w-0 border-line ps-5 first:ps-0 [&:not(:first-child)]:border-s"
  >
    <div
      dir="ltr"
      className="truncate text-[26px] leading-[1.15] font-semibold tracking-[-0.01em] text-text tabular-nums rtl:text-right"
    >
      {value}
    </div>
    <div className="mt-1 truncate text-[12.5px] text-ink-2">{label}</div>
  </div>
);

/**
 * Home (still 9): what dictation has done on this computer, a short list to
 * get started, what's new in this version, and the last few dictations.
 * Every number comes from the counter (`stats.rs`); none is estimated beyond
 * the typing speed it names.
 */
export const HomeSettings: React.FC<{
  onNavigate?: (section: SidebarSection) => void;
}> = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const { getSetting } = useSettings();
  const currentModel = useModelStore((s) => s.currentModel);
  const { facts, lists } = useModelEntries();

  const [totals, setTotals] = useState<DictationTotals | null>(null);
  const [recent, setRecent] = useState<HistoryEntry[]>([]);
  const [version, setVersion] = useState("");
  const [hidden, setHidden] = useState(readHidden);

  const load = useCallback(async () => {
    try {
      setTotals(await commands.getDictationTotals());
      const result = await commands.getHistoryEntries(null, RECENT_COUNT);
      if (result.status === "ok") setRecent(result.data.entries);
    } catch (error) {
      console.error("Failed to load Home:", error);
    }
  }, []);

  useEffect(() => {
    void load();
    const unlisten = events.historyUpdatePayload.listen(() => void load());
    return () => {
      unlisten.then((fn) => fn());
    };
  }, [load]);

  useEffect(() => {
    getVersion()
      .then(setVersion)
      .catch(() => setVersion(""));
  }, []);

  // Western digits in every language, as on the rest of the page.
  const locale = `${i18n.language}-u-nu-latn`;
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const go = (section: SidebarSection) => onNavigate?.(section);

  const counts = totals && workedOut(totals);
  const zero = number.format(0);
  const duration = (minutes: number) =>
    minutes >= 60
      ? t("settings.home.hoursMinutes", {
          hours: number.format(Math.floor(minutes / 60)),
          minutes: number.format(minutes % 60),
        })
      : t("settings.home.minutes", { minutes: number.format(minutes) });

  const since = totals
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long" }).format(
        new Date(totals.since * 1000),
      )
    : "";

  // Getting started: each step ticks only from what was done.
  const spoken = getSetting("spoken_languages") ?? [];
  const inUse = lists.yours.find((e) => e.id === currentModel);
  const missing = inUse ? facts.missing(inUse.model) : spoken;
  const steps = [
    {
      key: "shortcut",
      label: t("settings.home.steps.tryShortcut"),
      done: (totals ? totals.dictations > 0 : false) || recent.length > 0,
      to: "general" as SidebarSection,
    },
    {
      key: "words",
      label: t("settings.home.steps.addNames"),
      done: (getSetting("custom_words") ?? []).length > 0,
      to: "words" as SidebarSection,
    },
    {
      key: "model",
      label:
        missing.length > 0
          ? t("settings.home.steps.pickModelFor", {
              languages: languageList(missing, i18n.language),
            })
          : t("settings.home.steps.pickModel"),
      done: !!currentModel && missing.length === 0,
      to: "models" as SidebarSection,
    },
  ];
  const showSteps = !hidden && steps.some((s) => !s.done);

  const showNotes = getSetting("show_whats_new_on_update") ?? true;
  const note =
    showNotes && version
      ? findCurrentReleaseNote(version, i18n.language)
      : null;
  const lines = note ? noteLines(note.markdown) : [];

  const time = (entry: HistoryEntry) =>
    new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(new Date(entry.timestamp * 1000));

  return (
    <div className="flex w-full flex-col">
      {/* What dictation has done, counted on this computer. */}
      <section
        aria-label={t("settings.home.totals")}
        className="border-b border-line pt-5 pb-5"
      >
        <div className="grid grid-cols-4 gap-5">
          <Stat
            value={counts ? number.format(counts.allWords) : zero}
            label={t("settings.home.words")}
            title={
              totals
                ? t("settings.home.wordsHow", {
                    spoken: number.format(totals.words),
                    files: number.format(totals.file_words),
                  })
                : undefined
            }
          />
          <Stat
            value={totals ? number.format(totals.dictations) : zero}
            label={t("settings.home.dictations")}
          />
          <Stat
            value={
              counts?.speed != null
                ? number.format(counts.speed)
                : t("settings.home.notYet")
            }
            label={t("settings.home.speed")}
            title={t("settings.home.speedHow")}
          />
          <Stat
            value={duration(counts?.savedMinutes ?? 0)}
            label={t("settings.home.saved")}
            title={t("settings.home.savedHow", {
              wpm: TYPING_WORDS_PER_MINUTE,
            })}
          />
        </div>
        {totals && (
          <p className="mt-4 mb-0 flex items-start gap-2 text-[12px] leading-[1.5] text-ink-3">
            <Info
              width={13}
              height={13}
              className="mt-[2px] shrink-0"
              aria-hidden="true"
            />
            <span>
              {t("settings.home.howCounted", {
                date: since,
                wpm: TYPING_WORDS_PER_MINUTE,
              })}
            </span>
          </p>
        )}
      </section>

      {(showSteps || lines.length > 0) && (
        <div className="grid grid-cols-2 gap-x-10 border-b border-line py-5">
          {showSteps ? (
            <section aria-label={t("settings.home.gettingStarted")}>
              <div className="flex items-center justify-between">
                <h2 className="m-0 text-[13px] font-semibold text-text">
                  {t("settings.home.gettingStarted")}
                </h2>
                <LinkButton
                  onClick={() => {
                    writeHidden();
                    setHidden(true);
                  }}
                >
                  {t("settings.home.hide")}
                </LinkButton>
              </div>
              <ul className="m-0 mt-3 flex list-none flex-col gap-[6px] p-0">
                {steps.map((step) => (
                  <li
                    key={step.key}
                    className="flex min-h-[28px] items-center gap-[10px]"
                  >
                    {step.done ? (
                      <CircleCheck
                        width={15}
                        height={15}
                        className="shrink-0 text-moss"
                        aria-label={t("settings.home.done")}
                      />
                    ) : (
                      <Circle
                        width={15}
                        height={15}
                        className="shrink-0 text-ink-3"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`min-w-0 flex-1 text-[13px] ${step.done ? "text-ink-3" : "text-text"}`}
                    >
                      {step.label}
                    </span>
                    {!step.done && (
                      <LinkButton onClick={() => go(step.to)}>
                        {t(`sidebar.${step.to}`)}
                        <ChevronRight
                          width={13}
                          height={13}
                          className="rtl:-scale-x-100"
                          aria-hidden="true"
                        />
                      </LinkButton>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <div />
          )}

          {note && lines.length > 0 && (
            <section aria-label={t("settings.home.whatsNew")}>
              <h2 className="m-0 flex items-baseline gap-2 text-[13px] font-semibold text-text">
                {t("settings.home.whatsNew")}
                <span
                  dir="ltr"
                  className="font-mono text-[11.5px] font-normal text-ink-3"
                >
                  {note.version}
                </span>
              </h2>
              <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
                {lines.map((line) => (
                  <li
                    key={line}
                    className="relative ps-4 text-[12.5px] leading-[1.5] text-ink-2 before:absolute before:start-0 before:text-ink-3 before:content-['·']"
                  >
                    {line}
                  </li>
                ))}
              </ul>
              <LinkButton
                onClick={() => void openUrl(`${RELEASES_URL}${note.version}`)}
                className="mt-3 text-text"
              >
                {t("settings.home.releaseNotes")}
                <ArrowUpRight
                  width={13}
                  height={13}
                  className="rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </LinkButton>
            </section>
          )}
        </div>
      )}

      <section aria-label={t("settings.home.recent")} className="py-5">
        <div className="flex items-center justify-between">
          <h2 className="m-0 text-[13px] font-semibold text-text">
            {t("settings.home.recent")}
          </h2>
          <LinkButton onClick={() => go("history")}>
            {t("settings.home.allHistory")}
            <ChevronRight
              width={13}
              height={13}
              className="rtl:-scale-x-100"
              aria-hidden="true"
            />
          </LinkButton>
        </div>
        {recent.length === 0 ? (
          <p className="mt-3 mb-0 text-[12.5px] text-ink-3">
            {t("settings.home.noRecent")}
          </p>
        ) : (
          <ul className="m-0 mt-2 flex list-none flex-col p-0">
            {recent.map((entry) => (
              <li
                key={entry.id}
                className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-3 py-[7px]"
              >
                <span
                  dir="ltr"
                  className="pt-[1px] font-mono text-[12px] leading-[20px] text-ink-3"
                >
                  {time(entry)}
                </span>
                <span
                  dir="auto"
                  className="truncate text-[13px] leading-[20px] text-text"
                >
                  {entry.post_processed_text ||
                    entry.transcription_text ||
                    entry.source_name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

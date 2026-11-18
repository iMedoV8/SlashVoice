import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModelUnloadTimeoutSetting } from "../ModelUnloadTimeout";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { PageActions } from "../../ui/PageHeader";
import { StartHidden } from "../StartHidden";
import { AutostartToggle } from "../AutostartToggle";
import { ShowTrayIcon } from "../ShowTrayIcon";
import { PasteMethodSetting } from "../PasteMethod";
import { TypingToolSetting } from "../TypingTool";
import { ClipboardHandlingSetting } from "../ClipboardHandling";
import { AutoSubmit } from "../AutoSubmit";
import { PostProcessingToggle } from "../PostProcessingToggle";
import { AppendTrailingSpace } from "../AppendTrailingSpace";
import { HistoryLimit } from "../HistoryLimit";
import { RecordingRetentionPeriodSelector } from "../RecordingRetentionPeriod";
import { ExperimentalToggle } from "../ExperimentalToggle";
import { useSettings } from "../../../hooks/useSettings";
import { KeyboardImplementationSelector } from "../debug/KeyboardImplementationSelector";
import { VoiceActivityDetection } from "../VoiceActivityDetection";
import { LongFormChunking } from "../LongFormChunking";
import { LanguageDetection } from "../LanguageDetection";
import { AccelerationSelector } from "../AccelerationSelector";
import { LazyStreamClose } from "../LazyStreamClose";
import { AirPodsMode } from "../AirPodsMode";
import { FillerWordRemoval } from "../FillerWordRemoval";
import { VadBackendSelector } from "../VadBackendSelector";

const GROUPS = [
  "app",
  "output",
  "transcription",
  "history",
  "experimental",
] as const;
type Group = (typeof GROUPS)[number];

const anchor = (group: Group) => `advanced-${group}`;

/**
 * Still 6: the page's groups as a jump control in its header. The group in
 * view is marked; pressing one scrolls to it.
 */
const JumpControl: React.FC<{ groups: readonly Group[] }> = ({ groups }) => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState<Group>(groups[0]);

  useEffect(() => {
    const seen = new Map<Group, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const group = entry.target.id.replace("advanced-", "") as Group;
          seen.set(group, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        const top = groups.find((g) => (seen.get(g) ?? 0) > 0);
        if (top) setCurrent(top);
      },
      { threshold: [0, 0.25, 0.5, 1] },
    );
    for (const g of groups) {
      const el = document.getElementById(anchor(g));
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [groups]);

  const jump = (group: Group) => {
    setCurrent(group);
    document
      .getElementById(anchor(group))
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label={t("settings.advanced.jumpTo")}
      className="flex items-center gap-[2px] rounded-control bg-sunken p-[2px]"
    >
      {groups.map((group) => (
        <button
          key={group}
          type="button"
          aria-current={current === group ? "true" : undefined}
          onClick={() => jump(group)}
          className={`h-[26px] cursor-pointer rounded-[6px] border px-[10px] text-[12.5px] whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-logo-primary/40 ${
            current === group
              ? "border-line bg-background font-medium text-text"
              : "border-transparent text-ink-2 hover:text-text"
          }`}
        >
          {t(`settings.advanced.groups.${group}`)}
        </button>
      ))}
    </nav>
  );
};

export const AdvancedSettings: React.FC = () => {
  const { t } = useTranslation();
  const { getSetting } = useSettings();
  const experimentalEnabled = getSetting("experimental_enabled") || false;
  const groups = useMemo(
    () => GROUPS.filter((g) => g !== "experimental" || experimentalEnabled),
    [experimentalEnabled],
  );

  return (
    <div className="w-full">
      <PageActions>
        <JumpControl groups={groups} />
      </PageActions>
      <SettingsGroup
        id={anchor("app")}
        title={t("settings.advanced.groups.app")}
      >
        <StartHidden descriptionMode="tooltip" grouped={true} />
        <AutostartToggle descriptionMode="tooltip" grouped={true} />
        <ShowTrayIcon descriptionMode="tooltip" grouped={true} />
        <ModelUnloadTimeoutSetting descriptionMode="tooltip" grouped={true} />
        <ExperimentalToggle descriptionMode="tooltip" grouped={true} />
      </SettingsGroup>

      <SettingsGroup
        id={anchor("output")}
        title={t("settings.advanced.groups.output")}
      >
        <PasteMethodSetting descriptionMode="tooltip" grouped={true} />
        <TypingToolSetting descriptionMode="tooltip" grouped={true} />
        <ClipboardHandlingSetting descriptionMode="tooltip" grouped={true} />
        <AutoSubmit descriptionMode="tooltip" grouped={true} />
      </SettingsGroup>

      <SettingsGroup
        id={anchor("transcription")}
        title={t("settings.advanced.groups.transcription")}
      >
        <VoiceActivityDetection descriptionMode="tooltip" grouped={true} />
        <LongFormChunking descriptionMode="tooltip" grouped={true} />
        <FillerWordRemoval descriptionMode="tooltip" grouped={true} />
        <AppendTrailingSpace descriptionMode="tooltip" grouped={true} />
      </SettingsGroup>

      <SettingsGroup
        id={anchor("history")}
        title={t("settings.advanced.groups.history")}
      >
        <HistoryLimit descriptionMode="tooltip" grouped={true} />
        <RecordingRetentionPeriodSelector
          descriptionMode="tooltip"
          grouped={true}
        />
      </SettingsGroup>

      {experimentalEnabled && (
        <SettingsGroup
          id={anchor("experimental")}
          title={t("settings.advanced.groups.experimental")}
        >
          <PostProcessingToggle descriptionMode="tooltip" grouped={true} />
          <KeyboardImplementationSelector
            descriptionMode="tooltip"
            grouped={true}
          />
          <AccelerationSelector descriptionMode="tooltip" grouped={true} />
          <LazyStreamClose descriptionMode="tooltip" grouped={true} />
          <AirPodsMode descriptionMode="tooltip" grouped={true} />
          <VadBackendSelector descriptionMode="tooltip" grouped={true} />
          <LanguageDetection descriptionMode="tooltip" grouped={true} />
        </SettingsGroup>
      )}
    </div>
  );
};

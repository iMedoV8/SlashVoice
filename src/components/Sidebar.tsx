import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getVersion } from "@tauri-apps/api/app";
import {
  BookA,
  Box,
  FlaskConical,
  History,
  Info,
  PenLine,
  SlidersHorizontal,
  Wrench,
} from "lucide-react";
import HandyTextLogo from "./icons/HandyTextLogo";
import { StatusLine } from "./StatusLine";
import { ModelFoot } from "./ModelFoot";
import { useSettings } from "../hooks/useSettings";
import {
  GeneralSettings,
  AdvancedSettings,
  HistorySettings,
  AboutSettings,
  PostProcessingSettings,
  ModelsSettings,
  WordsSettings,
} from "./settings";

export type SidebarSection = keyof typeof SECTIONS_CONFIG;

interface IconProps {
  width?: number | string;
  height?: number | string;
  size?: number | string;
  className?: string;
  [key: string]: any;
}

interface SectionConfig {
  labelKey: string;
  icon: React.ComponentType<IconProps>;
  /** `null` when App renders the section itself (Debug, with its handlers). */
  component: React.ComponentType | null;
  enabled: (settings: any) => boolean;
  /** log: what you said; settings: how it works; foot: About, at the bottom. */
  place: "log" | "settings" | "foot";
}

// Direction C (still 1): History and Words first, then the settings, About at
// the foot with the version.
export const SECTIONS_CONFIG = {
  history: {
    labelKey: "sidebar.history",
    icon: History,
    component: HistorySettings,
    enabled: () => true,
    place: "log",
  },
  words: {
    labelKey: "sidebar.words",
    icon: BookA,
    component: WordsSettings,
    enabled: () => true,
    place: "log",
  },
  general: {
    labelKey: "sidebar.general",
    icon: SlidersHorizontal,
    component: GeneralSettings,
    enabled: () => true,
    place: "settings",
  },
  models: {
    labelKey: "sidebar.models",
    icon: Box,
    component: ModelsSettings,
    enabled: () => true,
    place: "settings",
  },
  postprocessing: {
    labelKey: "sidebar.postProcessing",
    icon: PenLine,
    component: PostProcessingSettings,
    enabled: (settings) => settings?.post_process_enabled ?? false,
    place: "settings",
  },
  advanced: {
    labelKey: "sidebar.advanced",
    icon: Wrench,
    component: AdvancedSettings,
    enabled: () => true,
    place: "settings",
  },
  debug: {
    labelKey: "sidebar.debug",
    icon: FlaskConical,
    component: null,
    enabled: (settings) => settings?.debug_mode ?? false,
    place: "settings",
  },
  about: {
    labelKey: "sidebar.about",
    icon: Info,
    component: AboutSettings,
    enabled: () => true,
    place: "foot",
  },
} as const satisfies Record<string, SectionConfig>;

interface SidebarProps {
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
}

const NavButton: React.FC<{
  id: SidebarSection;
  active: boolean;
  onSelect: (id: SidebarSection) => void;
  trailing?: React.ReactNode;
}> = ({ id, active, onSelect, trailing }) => {
  const { t } = useTranslation();
  const config = SECTIONS_CONFIG[id];
  const Icon = config.icon;
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={() => onSelect(id)}
      className={`flex h-[32px] w-full cursor-pointer items-center gap-[10px] rounded-control px-2 text-start transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-logo-primary/40 ${
        active
          ? "bg-selected font-medium text-text"
          : "text-ink-2 hover:bg-wash hover:text-text"
      }`}
    >
      <Icon width={15} height={15} size={15} className="shrink-0" />
      <span className="min-w-0 flex-1 truncate text-[13px]">
        {t(config.labelKey)}
      </span>
      {trailing}
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const { t } = useTranslation();
  const { settings } = useSettings();

  const [version, setVersion] = useState("");
  useEffect(() => {
    getVersion()
      .then(setVersion)
      .catch(() => setVersion(""));
  }, []);

  const shown = (Object.keys(SECTIONS_CONFIG) as SidebarSection[]).filter(
    (id) => SECTIONS_CONFIG[id].enabled(settings),
  );
  const inPlace = (place: SectionConfig["place"]) =>
    shown.filter((id) => SECTIONS_CONFIG[id].place === place);
  const footSection = inPlace("foot")[0];

  const button = (id: SidebarSection, trailing?: React.ReactNode) => (
    <NavButton
      key={id}
      id={id}
      active={activeSection === id}
      onSelect={onSectionChange}
      trailing={trailing}
    />
  );

  return (
    <nav
      aria-label={t("sidebar.label")}
      className="flex h-full w-[212px] shrink-0 flex-col border-e border-line bg-sunken px-[10px] pt-4 pb-[10px]"
    >
      <HandyTextLogo size={16} className="px-2" />
      <div className="mt-[14px]">
        <StatusLine />
      </div>
      <div className="mt-5 flex flex-col gap-[2px]">
        {inPlace("log").map((id) => button(id))}
      </div>
      <div className="mt-4 flex flex-col gap-[2px]">
        {inPlace("settings").map((id) => button(id))}
      </div>
      <div className="flex-1" />
      {footSection &&
        button(
          footSection,
          version && (
            <span className="font-mono text-[11.5px] text-ink-3">
              {version}
            </span>
          ),
        )}
      <div className="mt-2">
        <ModelFoot onShowHistory={() => onSectionChange("history")} />
      </div>
    </nav>
  );
};

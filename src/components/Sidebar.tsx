import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getVersion } from "@tauri-apps/api/app";
import {
  Cog,
  Cpu,
  FlaskConical,
  History,
  Info,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import HandyTextLogo from "./icons/HandyTextLogo";
import { useSettings } from "../hooks/useSettings";
import {
  GeneralSettings,
  AdvancedSettings,
  HistorySettings,
  AboutSettings,
  PostProcessingSettings,
  ModelsSettings,
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
}

export const SECTIONS_CONFIG = {
  general: {
    labelKey: "sidebar.general",
    icon: SlidersHorizontal,
    component: GeneralSettings,
    enabled: () => true,
  },
  history: {
    labelKey: "sidebar.history",
    icon: History,
    component: HistorySettings,
    enabled: () => true,
  },
  models: {
    labelKey: "sidebar.models",
    icon: Cpu,
    component: ModelsSettings,
    enabled: () => true,
  },
  advanced: {
    labelKey: "sidebar.advanced",
    icon: Cog,
    component: AdvancedSettings,
    enabled: () => true,
  },
  postprocessing: {
    labelKey: "sidebar.postProcessing",
    icon: Sparkles,
    component: PostProcessingSettings,
    enabled: (settings) => settings?.post_process_enabled ?? false,
  },
  debug: {
    labelKey: "sidebar.debug",
    icon: FlaskConical,
    component: null,
    enabled: (settings) => settings?.debug_mode ?? false,
  },
  about: {
    labelKey: "sidebar.about",
    icon: Info,
    component: AboutSettings,
    enabled: () => true,
  },
} as const satisfies Record<string, SectionConfig>;

interface SidebarProps {
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
}

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

  const availableSections = Object.entries(SECTIONS_CONFIG)
    .filter(([_, config]) => config.enabled(settings))
    .map(([id, config]) => ({ id: id as SidebarSection, ...config }));

  // Slash navigation column (still 06): the logo, quiet rows, the selected row
  // in the selected tint, the version at the foot.
  return (
    <nav className="flex h-full w-[196px] shrink-0 flex-col justify-between border-e border-line px-2 py-3">
      <div className="flex flex-col gap-[2px]">
        <HandyTextLogo size={15} className="px-2 pt-1 pb-3" />
        {availableSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              type="button"
              key={section.id}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-[30px] w-full cursor-pointer items-center gap-[9px] rounded-control px-2 text-start transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-logo-primary/40 ${
                isActive
                  ? "bg-selected font-medium text-text"
                  : "text-ink-2 hover:bg-wash hover:text-text"
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              <Icon width={14} height={14} size={14} className="shrink-0" />
              <span
                className="truncate text-[13px]"
                title={t(section.labelKey)}
              >
                {t(section.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
      {version && (
        <span className="px-2 font-mono text-[11.5px] text-ink-3">
          {`v${version}`}
        </span>
      )}
    </nav>
  );
};

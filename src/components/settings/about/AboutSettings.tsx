import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getVersion } from "@tauri-apps/api/app";
import { openUrl } from "@tauri-apps/plugin-opener";
import { ExternalLink } from "lucide-react";
import { commands } from "@/bindings";
import HandyTextLogo from "../../icons/HandyTextLogo";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { SettingContainer } from "../../ui/SettingContainer";
import { PathDisplay } from "../../ui/PathDisplay";
import { Button } from "../../ui/Button";
import { AppDataDirectory } from "../AppDataDirectory";
import { ShowWhatsNewOnUpdate } from "../ShowWhatsNewOnUpdate";
import { LogDirectory } from "../debug";

/** About (still 7): the name and version, credits, folders, updates. */
export const AboutSettings: React.FC = () => {
  const { t } = useTranslation();
  const [version, setVersion] = useState("");
  // Self-update is off until Slash Voice has its own signed feed (AGENTS.md).
  const [updatesLocked, setUpdatesLocked] = useState(false);

  useEffect(() => {
    getVersion()
      .then(setVersion)
      .catch((error) => console.error("Failed to get app version:", error));
    commands
      .isUpdateChecksLocked()
      .then(setUpdatesLocked)
      .catch(() => setUpdatesLocked(false));
  }, []);

  const openRecordingsFolder = async () => {
    try {
      const result = await commands.openRecordingsFolder();
      if (result.status !== "ok") throw new Error(String(result.error));
    } catch (error) {
      console.error("Failed to open recordings folder:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-4 border-b border-line pt-4 pb-6">
        <div className="flex flex-col gap-[10px]">
          <HandyTextLogo size={26} />
          {version && (
            <span className="font-mono text-[12px] text-ink-2">
              {t("settings.about.versionLine", { version })}
            </span>
          )}
        </div>
        {updatesLocked && (
          <span className="pb-[2px] text-[12.5px] text-ink-2">
            {t("settings.about.updateChecksOff")}
          </span>
        )}
      </div>

      <SettingsGroup title={t("settings.about.credits")}>
        {/* Credit required by Handy's MIT licence: Slash Voice is built on it. */}
        <SettingContainer
          title={t("settings.about.sourceCode.title")}
          description={t("settings.about.sourceCode.description")}
          descriptionMode="inline"
          grouped={true}
        >
          <Button
            variant="secondary"
            size="md"
            onClick={() => openUrl("https://github.com/cjpais/Handy")}
            className="flex items-center gap-[6px]"
          >
            <ExternalLink width={13} height={13} aria-hidden="true" />
            {t("settings.about.sourceCode.button")}
          </Button>
        </SettingContainer>
        <SettingContainer
          title={t("settings.about.acknowledgments.ggml.title")}
          description={t("settings.about.acknowledgments.ggml.details")}
          descriptionMode="inline"
          grouped={true}
        >
          {null}
        </SettingContainer>
      </SettingsGroup>

      <SettingsGroup title={t("settings.about.folders")}>
        <AppDataDirectory descriptionMode="tooltip" grouped={true} />
        <LogDirectory grouped={true} />
        <SettingContainer
          title={t("settings.about.recordings")}
          description={t("settings.history.openFolder")}
          grouped={true}
        >
          <PathDisplay path="" onOpen={openRecordingsFolder} />
        </SettingContainer>
      </SettingsGroup>

      <SettingsGroup title={t("settings.about.updates")}>
        <ShowWhatsNewOnUpdate descriptionMode="tooltip" grouped={true} />
      </SettingsGroup>
    </div>
  );
};

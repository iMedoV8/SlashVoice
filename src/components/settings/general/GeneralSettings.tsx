import React from "react";
import { useTranslation } from "react-i18next";
import { type } from "@tauri-apps/plugin-os";
import { MicrophoneSelector } from "../MicrophoneSelector";
import { ChannelSelector } from "../ChannelSelector";
import { ShortcutInput } from "../ShortcutInput";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { OutputDeviceSelector } from "../OutputDeviceSelector";
import { ShortcutActivationSetting } from "../ShortcutActivation";
import { AudioFeedback } from "../AudioFeedback";
import { useSettings } from "../../../hooks/useSettings";
import { VolumeSlider } from "../VolumeSlider";
import { MuteWhileRecording } from "../MuteWhileRecording";
import { ModelLanguageRows } from "./ModelSettingsCard";
import { PreferredLanguages } from "../PreferredLanguages";
import { ChineseScriptSetting } from "../ChineseScript";
import { ThemeSelector } from "../ThemeSelector";
import { AppLanguageSelector } from "../AppLanguageSelector";
import { isChinese } from "@/lib/utils/languageSuggestions";

/** General (still 3): Shortcut, Appearance, Languages, Sound. */
export const GeneralSettings: React.FC = () => {
  const { t } = useTranslation();
  const { audioFeedbackEnabled, getSetting } = useSettings();
  const isLinux = type() === "linux";
  // Only for Chinese speakers, or anyone who already picked a script.
  const speaksChinese =
    (getSetting("spoken_languages") ?? []).some(isChinese) ||
    (getSetting("chinese_script") ?? "as_transcribed") !== "as_transcribed";
  return (
    <div className="w-full">
      <SettingsGroup
        title={t("settings.general.groups.shortcut.title")}
        description={t("settings.general.groups.shortcut.description")}
      >
        <ShortcutInput shortcutId="transcribe" grouped={true} />
        <ShortcutActivationSetting descriptionMode="tooltip" grouped={true} />
        {/* Cancel shortcut remains hidden on Linux because of dynamic shortcut instability. */}
        {!isLinux && <ShortcutInput shortcutId="cancel" grouped={true} />}
      </SettingsGroup>
      <SettingsGroup title={t("settings.general.groups.appearance.title")}>
        <ThemeSelector descriptionMode="tooltip" grouped={true} />
        <AppLanguageSelector descriptionMode="tooltip" grouped={true} />
      </SettingsGroup>
      <SettingsGroup
        title={t("settings.general.groups.languages.title")}
        description={t("settings.general.groups.languages.description")}
      >
        <PreferredLanguages descriptionMode="tooltip" grouped={true} />
        {speaksChinese && (
          <ChineseScriptSetting descriptionMode="tooltip" grouped={true} />
        )}
        <ModelLanguageRows />
      </SettingsGroup>
      <SettingsGroup title={t("settings.general.groups.sound.title")}>
        <MicrophoneSelector descriptionMode="tooltip" grouped={true} />
        <ChannelSelector descriptionMode="tooltip" grouped={true} />
        <MuteWhileRecording descriptionMode="tooltip" grouped={true} />
        <AudioFeedback descriptionMode="tooltip" grouped={true} />
        <OutputDeviceSelector
          descriptionMode="tooltip"
          grouped={true}
          disabled={!audioFeedbackEnabled}
        />
        <VolumeSlider disabled={!audioFeedbackEnabled} />
      </SettingsGroup>
    </div>
  );
};

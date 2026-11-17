import React from "react";
import { useTranslation } from "react-i18next";
import { SegmentedControl } from "../ui/SegmentedControl";
import { SettingContainer } from "../ui/SettingContainer";
import { useSettings } from "../../hooks/useSettings";
import type { ShortcutActivation } from "@/bindings";

interface ShortcutActivationProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const ShortcutActivationSetting: React.FC<ShortcutActivationProps> =
  React.memo(({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const options = [
      {
        value: "hold_or_toggle",
        label: t("settings.general.shortcutActivation.options.holdOrToggle"),
        description: t(
          "settings.general.shortcutActivation.descriptions.hold_or_toggle",
        ),
      },
      {
        value: "push_to_talk",
        label: t("settings.general.shortcutActivation.options.pushToTalk"),
        description: t(
          "settings.general.shortcutActivation.descriptions.push_to_talk",
        ),
      },
      {
        value: "toggle",
        label: t("settings.general.shortcutActivation.options.toggle"),
        description: t(
          "settings.general.shortcutActivation.descriptions.toggle",
        ),
      },
    ];

    const selected = (getSetting("shortcut_activation") ||
      "hold_or_toggle") as ShortcutActivation;

    return (
      <SettingContainer
        title={t("settings.general.shortcutActivation.title")}
        description={t("settings.general.shortcutActivation.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
      >
        <SegmentedControl
          label={t("settings.general.shortcutActivation.title")}
          options={options.map((o) => ({
            value: o.value as ShortcutActivation,
            label: <span title={o.description}>{o.label}</span>,
          }))}
          value={selected}
          onChange={(value) => updateSetting("shortcut_activation", value)}
          disabled={isUpdating("shortcut_activation")}
        />
      </SettingContainer>
    );
  });

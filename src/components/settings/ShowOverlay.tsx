import React from "react";
import { useTranslation } from "react-i18next";
import { PictureCards, PillPicture } from "../ui/PictureCards";
import { SegmentedControl } from "../ui/SegmentedControl";
import { SettingContainer } from "../ui/SettingContainer";
import { useSettings } from "../../hooks/useSettings";
import type { OverlayPosition, OverlayStyle } from "@/bindings";

interface ShowOverlayProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

/**
 * The recording pill on General (still 10): Live, Minimal and None as small
 * pictures of our own pill, and where it sits as a plain choice beside them.
 */
export const ShowOverlay: React.FC<ShowOverlayProps> = React.memo(
  ({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const styles: OverlayStyle[] = ["live", "minimal", "none"];
    const styleOptions = [
      {
        value: "live",
        label: t("settings.advanced.overlay.style.options.live"),
      },
      {
        value: "minimal",
        label: t("settings.advanced.overlay.style.options.minimal"),
      },
      {
        value: "none",
        label: t("settings.advanced.overlay.style.options.none"),
      },
    ].map((o, i) => ({
      ...o,
      value: styles[i],
      picture: <PillPicture style={styles[i]} />,
    }));

    const positionOptions: { value: OverlayPosition; label: string }[] = [
      {
        value: "bottom",
        label: t("settings.advanced.overlay.position.options.bottom"),
      },
      {
        value: "top",
        label: t("settings.advanced.overlay.position.options.top"),
      },
    ];

    const selectedStyle = (getSetting("overlay_style") ||
      "live") as OverlayStyle;
    // Only "top" and "bottom" are selectable; anything else (empty, or a legacy
    // "none" from before the position was retired) falls back to "bottom".
    const selectedPosition: OverlayPosition =
      getSetting("overlay_position") === "top" ? "top" : "bottom";

    return (
      <>
        <SettingContainer
          title={t("settings.general.appearance.pill")}
          description={t("settings.advanced.overlay.style.description")}
          descriptionMode={descriptionMode}
          grouped={grouped}
          layout="stacked"
        >
          <PictureCards
            label={t("settings.general.appearance.pill")}
            options={styleOptions}
            value={selectedStyle}
            onChange={(value) => updateSetting("overlay_style", value)}
            disabled={isUpdating("overlay_style")}
          />
        </SettingContainer>

        {selectedStyle !== "none" && (
          <SettingContainer
            title={t("settings.general.appearance.pillPosition")}
            description={t("settings.advanced.overlay.position.description")}
            descriptionMode={descriptionMode}
            grouped={grouped}
          >
            <SegmentedControl
              label={t("settings.general.appearance.pillPosition")}
              options={positionOptions}
              value={selectedPosition}
              onChange={(value) => updateSetting("overlay_position", value)}
              disabled={isUpdating("overlay_position")}
            />
          </SettingContainer>
        )}
      </>
    );
  },
);

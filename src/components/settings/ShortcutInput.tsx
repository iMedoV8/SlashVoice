import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { formatKeyCombination } from "../../lib/utils/keyboard";
import { QuietKeys } from "../ui/QuietKeys";
import { SettingContainer } from "../ui/SettingContainer";
import { useSettings } from "../../hooks/useSettings";
import { useOsType } from "../../hooks/useOsType";
import { useShortcutCapture } from "../../hooks/useShortcutCapture";
import { usePressAway } from "../../hooks/usePressAway";

interface ShortcutInputProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
  shortcutId: string;
  disabled?: boolean;
}

/**
 * A binding's shortcut; click to record a new one. Clicking elsewhere cancels;
 * Escape is recorded like any key (Cancel's default is Escape).
 */
export const ShortcutInput: React.FC<ShortcutInputProps> = ({
  descriptionMode = "tooltip",
  grouped = false,
  shortcutId,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const { getSetting, isUpdating, isLoading } = useSettings();
  const osType = useOsType();
  const { capturing, partial, start, cancel } = useShortcutCapture(
    shortcutId,
    osType,
  );
  const shortcutRef = useRef<HTMLDivElement | null>(null);

  const bindings = getSetting("bindings") || {};

  usePressAway(capturing, shortcutRef, cancel);

  // If still loading, show loading state
  if (isLoading) {
    return (
      <SettingContainer
        title={t("settings.general.shortcut.title")}
        description={t("settings.general.shortcut.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
      >
        <div className="text-sm text-ink-3">
          {t("settings.general.shortcut.loading")}
        </div>
      </SettingContainer>
    );
  }

  // If no bindings are loaded, show empty state
  if (Object.keys(bindings).length === 0) {
    return (
      <SettingContainer
        title={t("settings.general.shortcut.title")}
        description={t("settings.general.shortcut.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
      >
        <div className="text-sm text-ink-3">
          {t("settings.general.shortcut.none")}
        </div>
      </SettingContainer>
    );
  }

  const binding = bindings[shortcutId];
  if (!binding) {
    return (
      <SettingContainer
        title={t("settings.general.shortcut.title")}
        description={t("settings.general.shortcut.notFound")}
        descriptionMode={descriptionMode}
        grouped={grouped}
      >
        <div className="text-sm text-ink-3">
          {t("settings.general.shortcut.none")}
        </div>
      </SettingContainer>
    );
  }

  // Get translated name and description for the binding
  const translatedName = t(
    `settings.general.shortcut.bindings.${shortcutId}.name`,
    binding.name,
  );
  const translatedDescription = t(
    `settings.general.shortcut.bindings.${shortcutId}.description`,
    binding.description,
  );

  return (
    <SettingContainer
      title={translatedName}
      description={translatedDescription}
      descriptionMode={descriptionMode}
      grouped={grouped}
      disabled={disabled}
      layout="horizontal"
    >
      {/* Pressing away cancels a capture; the Change button is inside. */}
      <div ref={shortcutRef} className="flex items-center gap-2">
        {capturing ? (
          <div
            dir="ltr"
            aria-live="polite"
            className="flex h-[26px] items-center rounded-[6px] border border-dashed border-line-strong px-[9px] font-mono text-[12px] text-text"
          >
            {partial
              ? formatKeyCombination(partial, osType)
              : t("settings.general.shortcut.pressKeys")}
          </div>
        ) : (
          <QuietKeys binding={binding.current_binding} osType={osType} />
        )}
        <button
          type="button"
          onClick={(e) => {
            if (capturing) return cancel();
            // Space or Enter must reach the capture, not press this again.
            e.currentTarget.blur();
            start();
          }}
          disabled={disabled || isUpdating(`binding_${shortcutId}`)}
          className="h-[26px] cursor-pointer rounded-[6px] px-2 text-[12.5px] text-ink-2 transition-colors hover:bg-wash hover:text-text disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-logo-primary/40"
        >
          {capturing
            ? t("settings.general.shortcut.cancelChange")
            : t("settings.general.shortcut.change")}
        </button>
      </div>
    </SettingContainer>
  );
};

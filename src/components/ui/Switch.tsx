import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  /** Names the switch for assistive tech when no visible label points at it. */
  ariaLabel?: string;
  /** The id of a visible label that names the switch. */
  ariaLabelledBy?: string;
}

/** The on/off switch on its own; ToggleSwitch puts it in a settings row. */
export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  ariaLabel,
  ariaLabelledBy,
}) => {
  return (
    <label
      className={`flex items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      <input
        type="checkbox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        value=""
        className="sr-only peer"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      {/* Slash switch (still 06): 30 by 18; on is the accent, off a raised tint. */}
      <div className="relative h-[18px] w-[30px] shrink-0 rounded-full bg-selected transition-colors peer-checked:bg-accent peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-logo-primary/40 peer-disabled:opacity-50 after:absolute after:start-[2px] after:top-[2px] after:size-[14px] after:rounded-full after:bg-ink-2 after:transition-all after:content-[''] peer-checked:after:translate-x-[12px] peer-checked:after:bg-white rtl:peer-checked:after:-translate-x-[12px]"></div>
    </label>
  );
};

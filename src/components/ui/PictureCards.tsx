import React from "react";
import { EyeOff } from "lucide-react";
import type { OverlayStyle, Theme } from "@/bindings";

interface PictureCardsProps<T extends string> {
  options: { value: T; label: string; picture: React.ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  /** Names the group for screen readers. */
  label: string;
  disabled?: boolean;
}

/**
 * A choice shown as small pictures, each named under it (still 10). One
 * radio group: Tab reaches the chosen card, arrow keys move between them,
 * mirrored in right-to-left text. The chosen card has the accent's border,
 * as a selected radio does.
 */
export function PictureCards<T extends string>({
  options,
  value,
  onChange,
  label,
  disabled = false,
}: PictureCardsProps<T>) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const move = (from: number, step: number) => {
    const next = (from + step + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="grid grid-cols-[repeat(3,minmax(0,116px))] gap-[14px]"
    >
      {options.map((option, i) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={option.label}
            tabIndex={checked ? 0 : -1}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => {
              const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                move(i, rtl && e.key === "ArrowRight" ? -1 : 1);
              } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                move(i, rtl && e.key === "ArrowLeft" ? 1 : -1);
              }
            }}
            className="group flex cursor-pointer flex-col items-center gap-[7px] rounded-control focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span
              aria-hidden="true"
              className={`block h-[70px] w-full overflow-hidden rounded-[8px] border-2 transition-colors group-focus-visible:ring-2 group-focus-visible:ring-logo-primary/40 ${
                checked
                  ? "border-accent"
                  : "border-line group-hover:border-line-strong"
              }`}
            >
              {option.picture}
            </span>
            <span
              className={`text-[12.5px] ${checked ? "font-medium text-text" : "text-ink-2"}`}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- the pictures ---------------- */

type Palette = "light" | "dark";

/** A window in one theme: sidebar strip, title bar and three lines. */
const Window: React.FC<{ palette: Palette; className?: string }> = ({
  palette,
  className = "",
}) => {
  const c = (token: string) => `var(--${palette}-color-${token})`;
  return (
    <span
      className={`flex h-full ${className}`}
      style={{ background: c("background") }}
    >
      <span
        className="flex w-[28%] flex-col gap-[3px] px-[5px] pt-[8px]"
        style={{ background: c("sunken") }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-[3px] w-[11px] rounded-full"
            style={{ background: c("ink-3") }}
          />
        ))}
      </span>
      <span className="flex flex-1 flex-col gap-[4px] px-[8px] pt-[8px]">
        <span
          className="block h-[4px] w-[45%] rounded-full"
          style={{ background: c("text") }}
        />
        {[80, 66, 74].map((w) => (
          <span
            key={w}
            className="block h-[3px] rounded-full"
            style={{ width: `${w}%`, background: c("line-strong") }}
          />
        ))}
      </span>
    </span>
  );
};

/** System is light and dark side by side, as the computer decides. */
export const ThemePicture: React.FC<{ theme: Theme }> = ({ theme }) =>
  theme === "system" ? (
    <span className="flex h-full">
      <span className="w-1/2 overflow-hidden">
        <Window palette="light" className="w-[200%]" />
      </span>
      <span className="w-1/2 overflow-hidden">
        <Window palette="dark" className="w-[200%]" />
      </span>
    </span>
  ) : (
    <Window palette={theme} />
  );

/** Our recording pill, small: the accent dot and the bars, as in the pill. */
const Bars: React.FC = () => (
  <span className="flex items-center gap-[2px]">
    <span className="block size-[4px] rounded-full bg-accent" />
    {[6, 10, 13, 8, 4, 3, 3, 3].map((h, i) => (
      <span
        key={i}
        className="block w-[2px] rounded-full bg-text"
        style={{ height: h }}
      />
    ))}
  </span>
);

export const PillPicture: React.FC<{ style: OverlayStyle }> = ({ style }) => (
  <span
    className={`flex h-full justify-center bg-selected ${style === "none" ? "items-center" : "items-end pb-[10px]"}`}
  >
    {style === "live" && (
      <span className="mb-[2px] flex w-[78%] flex-col gap-[4px] rounded-[8px] border border-line bg-background px-[8px] py-[6px]">
        <span className="block h-[3px] w-[90%] rounded-full bg-ink-2" />
        <span className="block h-[3px] w-[60%] rounded-full bg-ink-2" />
        <Bars />
      </span>
    )}
    {style === "minimal" && (
      <span className="flex items-center gap-[6px] rounded-full border border-line bg-background px-[8px] py-[5px]">
        <Bars />
        <span className="block size-[7px] rounded-full bg-ink-3" />
      </span>
    )}
    {style === "none" && (
      <EyeOff width={18} height={18} className="text-ink-3" />
    )}
  </span>
);

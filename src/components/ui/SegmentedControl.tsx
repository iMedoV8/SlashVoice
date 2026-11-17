import React from "react";

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: React.ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  /** Names the group for screen readers. */
  label: string;
  disabled?: boolean;
}

/**
 * A choice of two to four, all in view (still 3: Auto, Hold, Toggle). The
 * chosen one is raised on a sunken track; arrow keys move between them.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  disabled = false,
}: SegmentedControlProps<T>) {
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
      className="inline-flex items-center gap-[2px] rounded-control bg-sunken p-[2px]"
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
            className={`h-[26px] cursor-pointer rounded-[6px] border px-[10px] text-[12.5px] whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-logo-primary/40 disabled:cursor-not-allowed disabled:opacity-50 ${
              checked
                ? "border-line bg-background font-medium text-text"
                : "border-transparent text-ink-2 hover:text-text"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

import React from "react";
import { keycapLabel, keycapLabels, type OSType } from "@/lib/utils/keyboard";

interface QuietKeysProps {
  /** The binding to draw, e.g. "option+space". */
  binding: string;
  osType: OSType;
  /** sm: in a settings row; xs: in the sidebar's status line. */
  size?: "sm" | "xs";
  className?: string;
}

const SIZES = {
  sm: "h-[24px] min-w-[24px] px-[7px] text-[12px]",
  xs: "h-[20px] min-w-[20px] px-[5px] text-[11px]",
};

/**
 * A shortcut as small key caps in the code typeface (still 3). Keys stay left
 * to right in Arabic too.
 */
export const QuietKeys: React.FC<QuietKeysProps> = ({
  binding,
  osType,
  size = "sm",
  className = "",
}) => (
  <span
    dir="ltr"
    role="img"
    aria-label={keycapLabel(binding, osType)}
    className={`inline-flex items-center gap-[4px] align-middle ${className}`}
  >
    {keycapLabels(binding, osType).map((label, i) => (
      <span
        key={i}
        aria-hidden="true"
        className={`inline-flex items-center justify-center rounded-[6px] border border-line bg-wash font-mono leading-none text-text select-none ${SIZES[size]}`}
      >
        {label}
      </span>
    ))}
  </span>
);

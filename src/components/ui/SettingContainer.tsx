import React from "react";

interface SettingContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  /**
   * inline: the description shows under the title. tooltip: it is kept as the
   * label's hover text only; direction C has no info buttons on rows.
   */
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
  layout?: "horizontal" | "stacked";
  disabled?: boolean;
  /** Kept for callers; the row no longer shows a tooltip button. */
  tooltipPosition?: "top" | "bottom";
  /** Horizontal only: the control takes the row's free width, for content that fits itself to it. */
  grow?: boolean;
}

/**
 * One settings row (direction C, still 3): the label on one side, its control
 * on the other, 40 high, no box, no info or reset button.
 */
export const SettingContainer: React.FC<SettingContainerProps> = ({
  title,
  description,
  children,
  descriptionMode = "tooltip",
  grouped = false,
  layout = "horizontal",
  disabled = false,
  grow = false,
}) => {
  const box = grouped ? "" : " px-3 rounded-card border border-line";
  const dim = disabled ? " opacity-50" : "";
  const label = (
    <>
      <h3
        className={`m-0 text-[13px] leading-[1.4] font-normal text-text${dim}`}
        title={descriptionMode === "tooltip" ? description : undefined}
      >
        {title}
      </h3>
      {descriptionMode === "inline" && description && (
        <p
          className={`m-0 mt-[2px] text-[12.5px] leading-[1.45] text-ink-2${dim}`}
        >
          {description}
        </p>
      )}
    </>
  );

  if (layout === "stacked") {
    return (
      <div className={`py-[10px]${box}`}>
        <div className="mb-2">{label}</div>
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-[44px] items-center justify-between gap-4 py-[7px]${box}`}
    >
      <div className={grow ? "max-w-2/3 shrink-0" : "min-w-0"}>{label}</div>
      <div
        className={
          grow
            ? "relative flex min-w-0 flex-1 justify-end"
            : "relative shrink-0"
        }
      >
        {children}
      </div>
    </div>
  );
};

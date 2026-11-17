import React from "react";

type ModelStatus =
  | "ready"
  | "loading"
  | "downloading"
  | "verifying"
  | "error"
  | "unloaded"
  | "none";

interface ModelStatusButtonProps {
  status: ModelStatus;
  displayText: string;
  isDropdownOpen: boolean;
  /** Ready, and transcribing in the background. */
  busy?: boolean;
  onClick: () => void;
  className?: string;
}

const ModelStatusButton: React.FC<ModelStatusButtonProps> = ({
  status,
  displayText,
  isDropdownOpen,
  busy = false,
  onClick,
  className = "",
}) => {
  const getStatusColor = (status: ModelStatus): string => {
    switch (status) {
      case "ready":
        return busy
          ? "bg-moss animate-pulse motion-reduce:animate-none"
          : "bg-moss";
      case "loading":
        return "bg-warning animate-pulse";
      case "downloading":
        return "bg-logo-primary animate-pulse";
      case "verifying":
        return "bg-background-ui animate-pulse";
      case "error":
        return "bg-error";
      case "unloaded":
        return "bg-ink-3";
      case "none":
        return "bg-error";
      default:
        return "bg-ink-3";
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      aria-expanded={isDropdownOpen}
      className={`flex w-full cursor-pointer items-center gap-2 text-[12.5px] text-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-logo-primary/40 rounded-[4px] ${className}`}
      title={`Model status: ${displayText}`}
    >
      <div
        className={`size-[7px] shrink-0 rounded-full ${getStatusColor(status)}`}
      />
      <span dir="auto" className="min-w-0 flex-1 truncate text-start">
        {displayText}
      </span>
      <svg
        className="h-[13px] w-[13px] shrink-0 text-ink-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 9.5l5-5 5 5M7 14.5l5 5 5-5"
        />
      </svg>
    </button>
  );
};

export default ModelStatusButton;

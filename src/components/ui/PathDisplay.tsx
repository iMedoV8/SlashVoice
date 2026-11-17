import React from "react";
import { useTranslation } from "react-i18next";
import { FolderOpen } from "lucide-react";

interface PathDisplayProps {
  path: string;
  onOpen: () => void;
  disabled?: boolean;
}

/** The home folder shown as ~, so a path reads short and names nobody. */
const shorten = (path: string) =>
  path
    .replace(/^\/Users\/[^/]+/, "~")
    .replace(/^\/home\/[^/]+/, "~")
    .replace(/^[A-Za-z]:\\Users\\[^\\]+/, "~");

/** A folder (still 7): its path in the code typeface, and Open. */
export const PathDisplay: React.FC<PathDisplayProps> = ({
  path,
  onOpen,
  disabled = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex min-w-0 items-center gap-3">
      {path && (
        <span
          dir="ltr"
          title={path}
          className="min-w-0 truncate font-mono text-[12px] text-ink-3 select-text"
        >
          {shorten(path)}
        </span>
      )}
      <button
        type="button"
        onClick={onOpen}
        disabled={disabled}
        className="flex h-[28px] shrink-0 cursor-pointer items-center gap-[6px] rounded-[6px] px-2 text-[12.5px] text-text transition-colors hover:bg-wash disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-logo-primary/40"
      >
        <FolderOpen width={14} height={14} aria-hidden="true" />
        {t("common.open")}
      </button>
    </div>
  );
};

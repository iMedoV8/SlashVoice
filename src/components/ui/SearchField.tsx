import React from "react";
import { Search, X } from "lucide-react";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  /** Read out for the clear button. */
  clearLabel: string;
  className?: string;
}

/** A page's search, in its header (stills 1, 2, 4). */
export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder,
  clearLabel,
  className = "",
}) => (
  <label
    className={`flex h-[32px] min-w-0 items-center gap-2 rounded-control border border-line px-[10px] text-ink-3 transition-colors focus-within:border-line-strong hover:border-line-strong ${className}`}
  >
    <Search width={14} height={14} className="shrink-0" aria-hidden="true" />
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && value) {
          e.preventDefault();
          onChange("");
        }
      }}
      placeholder={placeholder}
      aria-label={placeholder}
      className="min-w-0 flex-1 bg-transparent text-[13px] text-text placeholder:text-ink-3 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
    />
    {value && (
      <button
        type="button"
        onClick={() => onChange("")}
        aria-label={clearLabel}
        className="grid size-[18px] shrink-0 cursor-pointer place-items-center rounded-full text-ink-3 hover:text-text"
      >
        <X width={12} height={12} aria-hidden="true" />
      </button>
    )}
  </label>
);

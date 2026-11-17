import React from "react";

interface SettingsGroupProps {
  title?: string;
  description?: string;
  /** An anchor for the page's jump control (Advanced). */
  id?: string;
  children: React.ReactNode;
}

/**
 * Direction C (still 3): the group's name and one line about it on the left,
 * its rows on the right, divided by hairlines; a hairline between groups.
 */
export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  description,
  id,
  children,
}) => (
  <section
    id={id}
    aria-label={title}
    className="grid scroll-mt-4 grid-cols-[minmax(0,148px)_minmax(0,1fr)] gap-x-7 border-b border-line py-5 last:border-b-0"
  >
    {title ? (
      <div className="pt-[9px]">
        <h2 className="m-0 text-[13px] leading-[1.4] font-semibold text-text">
          {title}
        </h2>
        {description && (
          <p className="mt-[6px] mb-0 text-[12.5px] leading-[1.5] text-ink-2">
            {description}
          </p>
        )}
      </div>
    ) : (
      <div />
    )}
    <div className="min-w-0 divide-y divide-line overflow-visible">
      {children}
    </div>
  </section>
);

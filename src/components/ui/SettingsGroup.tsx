import React from "react";

interface SettingsGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  description,
  children,
}) => {
  // Slash settings (still 06): a plain label over rows divided by hairlines.
  return (
    <div className="space-y-1">
      {title && (
        <div className="px-1">
          <h2 className="m-0 text-xs font-medium text-ink-3">{title}</h2>
          {description && (
            <p className="mt-1 mb-0 text-xs text-ink-3">{description}</p>
          )}
        </div>
      )}
      <div className="overflow-visible divide-y divide-line">{children}</div>
    </div>
  );
};

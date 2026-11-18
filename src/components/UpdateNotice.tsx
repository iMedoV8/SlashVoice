import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { listen } from "@tauri-apps/api/event";
import { RotateCw } from "lucide-react";
import { commands } from "@/bindings";
import { notify } from "@/stores/noticeStore";

interface UpdateNoticeProps {
  /** foot: a line in the sidebar's foot. row: About's Updates group. */
  variant?: "foot" | "row";
  /** Shows a notice when an update fails. Set on one instance only. */
  announce?: boolean;
}

/**
 * A downloaded, verified update waiting to be installed (specs/009-updates):
 * "Version N is ready" and Restart. Nothing is shown when none waits.
 */
export const UpdateNotice: React.FC<UpdateNoticeProps> = ({
  variant = "foot",
  announce = false,
}) => {
  const { t } = useTranslation();
  const [version, setVersion] = useState<string | null>(null);
  const [restarting, setRestarting] = useState(false);

  useEffect(() => {
    commands
      .getUpdateState()
      .then((s) => setVersion(s.state === "ready" ? s.version : null))
      .catch(() => setVersion(null));
    const ready = listen<{ version: string }>("update-ready", (e) =>
      setVersion(e.payload.version),
    );
    const failed = listen<"unverified" | "install">("update-failed", (e) => {
      setVersion(null);
      setRestarting(false);
      if (announce) {
        notify({
          title:
            e.payload === "unverified"
              ? t("updates.unverified")
              : t("updates.installFailed"),
        });
      }
    });
    return () => {
      ready.then((fn) => fn());
      failed.then((fn) => fn());
    };
  }, [announce, t]);

  if (!version) return null;

  const restart = async () => {
    setRestarting(true);
    const result = await commands.restartToUpdate();
    // On success the app closes and reopens; otherwise say why.
    if (result.status === "error") {
      setRestarting(false);
      if (result.error === "busy") notify({ title: t("updates.busy") });
    }
  };

  const button = (
    <button
      type="button"
      onClick={restart}
      disabled={restarting}
      className="flex h-[26px] shrink-0 cursor-pointer items-center gap-[5px] rounded-[6px] border border-line px-2 text-[12px] font-medium text-text transition-colors hover:bg-wash disabled:cursor-default disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-logo-primary/40"
    >
      <RotateCw width={12} height={12} aria-hidden="true" />
      {t("updates.restart")}
    </button>
  );

  if (variant === "row") {
    return (
      <div className="flex min-h-[44px] items-center justify-between gap-4 py-[7px]">
        <span className="text-[13px] text-text">
          {t("updates.ready", { version })}
        </span>
        {button}
      </div>
    );
  }

  return (
    <div
      role="status"
      className="flex items-center justify-between gap-2 px-2 text-[12px] text-text"
    >
      <span className="min-w-0 truncate">
        {t("updates.ready", { version })}
      </span>
      {button}
    </div>
  );
};

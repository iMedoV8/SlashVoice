import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { listen } from "@tauri-apps/api/event";
import { useSettings } from "@/hooks/useSettings";
import { useOsType } from "@/hooks/useOsType";
import { useModelStore } from "@/stores/modelStore";
import type { ModelStateEvent } from "@/lib/types/events";
import { QuietKeys } from "./ui/QuietKeys";

type State = "ready" | "loading" | "downloading" | "failed" | "noModel";

/** Whether dictation can start now, from the model in use and its load events. */
const useDictationState = (): State => {
  const currentModel = useModelStore((s) => s.currentModel);
  const onDisk = useModelStore(
    (s) => !!s.models.find((m) => m.id === s.currentModel)?.is_downloaded,
  );
  const downloading = useModelStore(
    (s) =>
      Object.keys(s.downloadProgress).length > 0 ||
      Object.keys(s.verifyingModels).length > 0,
  );
  const [load, setLoad] = useState<"idle" | "loading" | "failed">("idle");

  useEffect(() => {
    const unlisten = listen<ModelStateEvent>("model-state-changed", (e) => {
      const kind = e.payload.event_type;
      if (kind === "loading_started") setLoad("loading");
      else if (kind === "loading_failed") setLoad("failed");
      else setLoad("idle");
    });
    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  if (!currentModel || !onDisk) return downloading ? "downloading" : "noModel";
  if (load === "loading") return "loading";
  if (load === "failed") return "failed";
  return "ready";
};

/**
 * The sidebar's second line (founder, 2026-11-17): whether dictation is ready,
 * and the key to hold. Plain text, no box; the state is never colour alone.
 */
export const StatusLine: React.FC = () => {
  const { t } = useTranslation();
  const { getSetting } = useSettings();
  const osType = useOsType();
  const state = useDictationState();
  const binding = getSetting("bindings")?.transcribe?.current_binding;
  const toggle = getSetting("shortcut_activation") === "toggle";

  const label = {
    ready: t("statusLine.ready"),
    loading: t("statusLine.loading"),
    downloading: t("statusLine.downloading"),
    failed: t("statusLine.failed"),
    noModel: t("statusLine.noModel"),
  }[state];

  return (
    <div className="flex flex-col gap-[6px] px-2" aria-live="polite">
      <span
        className={`text-[13px] font-medium ${state === "ready" ? "text-text" : "text-ink-2"}`}
      >
        {label}
      </span>
      {binding && (
        <span className="flex items-center gap-[6px] text-[12px] text-ink-3">
          {toggle ? t("statusLine.press") : t("statusLine.hold")}
          <QuietKeys binding={binding} osType={osType} size="xs" />
        </span>
      )}
    </div>
  );
};

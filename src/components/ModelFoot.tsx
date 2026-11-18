import React from "react";
import ModelSelector from "./model-selector";
import NoticeChip from "./footer/NoticeChip";
import TranscriptionStatus from "./footer/TranscriptionStatus";
import { UpdateNotice } from "./UpdateNotice";

interface ModelFootProps {
  /** Where background transcriptions are listed. */
  onShowHistory: () => void;
}

/**
 * The sidebar's foot (still 1): the model in use and its picker, background
 * transcription, and the notices, which the bottom bar used to carry.
 */
export const ModelFoot: React.FC<ModelFootProps> = ({ onShowHistory }) => (
  <div className="flex flex-col gap-2 text-[12px] text-ink-2">
    <UpdateNotice announce />
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-2 empty:hidden">
      <TranscriptionStatus onShowHistory={onShowHistory} />
      <NoticeChip />
    </div>
    <div className="rounded-control border border-line px-[10px] py-[7px]">
      <ModelSelector />
    </div>
  </div>
);

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { notify } from "@/stores/noticeStore";
import { useSettings } from "../../hooks/useSettings";
import { isComposingKeyEvent } from "../../lib/utils/keyboard";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface CustomWordsProps {
  /** Shows only the words that contain this text. */
  query?: string;
  /** The add field is open. */
  adding: boolean;
  onAddingChange: (adding: boolean) => void;
}

const normalizeCustomWord = (word: string) =>
  word
    .replace(/[<>"']/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Your own words (still 2): names in the code typeface, each with a remove
 * button, and a field to add one. They help supported models spell them.
 */
export const CustomWords: React.FC<CustomWordsProps> = ({
  query = "",
  adding,
  onAddingChange,
}) => {
  const { t } = useTranslation();
  const { getSetting, updateSetting, isUpdating } = useSettings();
  const [newWord, setNewWord] = useState("");
  const fieldRef = useRef<HTMLInputElement>(null);
  const customWords = getSetting("custom_words") || [];
  const normalizedWord = normalizeCustomWord(newWord);
  const busy = isUpdating("custom_words");

  useEffect(() => {
    if (adding) fieldRef.current?.focus();
  }, [adding]);

  const handleAddWord = () => {
    if (!normalizedWord || normalizedWord.length > 50) return;
    if (customWords.includes(normalizedWord)) {
      notify({
        title: t("settings.advanced.customWords.duplicate", {
          word: normalizedWord,
        }),
      });
      return;
    }
    updateSetting("custom_words", [...customWords, normalizedWord]);
    setNewWord("");
  };

  const handleRemoveWord = (wordToRemove: string) => {
    updateSetting(
      "custom_words",
      customWords.filter((word) => word !== wordToRemove),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isComposingKeyEvent(e.nativeEvent)) return;
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddWord();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setNewWord("");
      onAddingChange(false);
    }
  };

  const needle = query.trim().toLowerCase();
  const shown = needle
    ? customWords.filter((w) => w.toLowerCase().includes(needle))
    : customWords;

  return (
    <div className="flex flex-col gap-3 py-[7px]">
      {adding && (
        <div className="flex items-center gap-2">
          <Input
            ref={fieldRef}
            type="text"
            className="min-w-0 flex-1 font-mono"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("settings.advanced.customWords.placeholder")}
            aria-label={t("settings.advanced.customWords.placeholder")}
            variant="compact"
            disabled={busy}
            maxLength={50}
          />
          <Button
            onClick={handleAddWord}
            disabled={!normalizedWord || normalizedWord.length > 50 || busy}
            variant="secondary"
            size="md"
          >
            {t("settings.advanced.customWords.add")}
          </Button>
        </div>
      )}
      {shown.length > 0 ? (
        <ul className="m-0 flex list-none flex-wrap gap-[6px] p-0">
          {shown.map((word) => (
            <li
              key={word}
              className="inline-flex h-[28px] items-center gap-[6px] rounded-chip border border-line bg-wash ps-[9px] pe-[4px] font-mono text-[12.5px] text-text"
            >
              <span dir="ltr">{word}</span>
              <button
                type="button"
                onClick={() => handleRemoveWord(word)}
                disabled={busy}
                aria-label={t("settings.advanced.customWords.remove", { word })}
                className="grid size-[20px] cursor-pointer place-items-center rounded-[5px] text-ink-3 hover:bg-selected hover:text-text disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-logo-primary/40"
              >
                <X width={12} height={12} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 text-[12.5px] text-ink-2">
          {needle ? t("settings.words.noMatches") : t("settings.words.empty")}
        </p>
      )}
    </div>
  );
};

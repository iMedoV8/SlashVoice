import React from "react";
import { LanguageSelector } from "../LanguageSelector";
import { TranslateToEnglish } from "../TranslateToEnglish";
import { useModelStore } from "../../../stores/modelStore";
import type { ModelInfo } from "@/bindings";

/**
 * The model in use's own language rows (its language, translate to English),
 * shown in General's Languages group when the model offers them.
 */
export const ModelLanguageRows: React.FC = () => {
  const { currentModel, models } = useModelStore();
  const info = models.find((m: ModelInfo) => m.id === currentModel);
  if (!info) return null;

  return (
    <>
      {info.supports_language_selection && (
        <LanguageSelector
          descriptionMode="tooltip"
          grouped={true}
          modelId={info.id}
          supportedLanguages={info.supported_languages}
        />
      )}
      {info.supports_translation && (
        <TranslateToEnglish descriptionMode="tooltip" grouped={true} />
      )}
    </>
  );
};

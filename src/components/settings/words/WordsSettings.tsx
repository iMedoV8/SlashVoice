import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { PageActions } from "../../ui/PageHeader";
import { SearchField } from "../../ui/SearchField";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { Button } from "../../ui/Button";
import { CustomWords } from "../CustomWords";

/**
 * Words (still 2), your words only: corrections and word packs are left out
 * until they are built (founder, 2026-11-17).
 */
export const WordsSettings: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);

  return (
    <div className="w-full">
      <PageActions>
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder={t("settings.words.search")}
          clearLabel={t("common.clear")}
          className="w-[200px]"
        />
        <Button
          variant="primary"
          size="lg"
          onClick={() => setAdding(true)}
          className="flex shrink-0 items-center gap-[6px]"
        >
          <Plus width={14} height={14} aria-hidden="true" />
          {t("settings.words.add")}
        </Button>
      </PageActions>
      <SettingsGroup
        title={t("settings.words.yours.title")}
        description={t("settings.words.yours.description")}
      >
        <CustomWords query={query} adding={adding} onAddingChange={setAdding} />
      </SettingsGroup>
    </div>
  );
};

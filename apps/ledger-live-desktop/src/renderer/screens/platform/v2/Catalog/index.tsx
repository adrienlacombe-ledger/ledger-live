import React from "react";
import TrackPage from "~/renderer/analytics/TrackPage";
import { Text, Flex } from "@ledgerhq/react-ui";
import { useCategories, useRecentlyUsed, useSearch } from "@ledgerhq/live-common/wallet-api/react";
import { BROWSE_SEARCH_OPTIONS } from "@ledgerhq/live-common/wallet-api/constants";
import { useDisclaimer, usePlatformState } from "../hooks";
import { RecentlyUsed } from "./RecentlyUsed";
import { Browse } from "./Browse";
import { useTranslation } from "react-i18next";

export function Catalog() {
  const { t } = useTranslation();
  const state = usePlatformState();
  const { manifests, categories, selected, setSelected } = useCategories();
  const { data, append } = useRecentlyUsed(manifests, state);
  const { input, onChange, result } = useSearch({
    list: manifests,
    options: BROWSE_SEARCH_OPTIONS,
    filter: item => (selected === "all" ? true : item.categories.includes(selected)),
  });
  const { onSelect } = useDisclaimer(append);

  return (
    <Flex flexDirection="column" paddingBottom={100}>
      <TrackPage category="Platform" name="Catalog" />

      <Text variant="h3" style={{ fontSize: 28 }}>
        {t("platform.catalog.title")}
      </Text>

      {data.length ? <RecentlyUsed data={data} /> : null}

      <Browse
        categories={categories}
        setSelected={setSelected}
        input={input}
        onChange={onChange}
        result={result}
        onSelect={onSelect}
      />
    </Flex>
  );
}

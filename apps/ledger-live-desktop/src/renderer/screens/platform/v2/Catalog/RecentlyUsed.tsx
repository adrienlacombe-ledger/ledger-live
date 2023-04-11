import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Text } from "@ledgerhq/react-ui";
import { useRecentlyUsed } from "@ledgerhq/live-common/wallet-api/react";
import { SectionHeader } from "./SectionHeader";
import { Card } from "./Card";
import styled from "styled-components";

export function RecentlyUsed({ data }: Pick<ReturnType<typeof useRecentlyUsed>, "data">) {
  const { t } = useTranslation();

  const onClear = useCallback(() => {
    console.log("TODO: clear all");
  }, []);

  const onSelect = useCallback(() => {
    console.log("TODO: select handler");
  }, []);

  return (
    <Flex flexDirection="column">
      <SectionHeader iconLeft="Clock" Right={() => <ClearAll onClick={onClear} />}>
        {t("platform.catalog.section.recentlyUsed")}
      </SectionHeader>

      {data.map(m => (
        <Flex key={m.id}>
          <Card manifest={m} size="small" onClick={onSelect} />
        </Flex>
      ))}
    </Flex>
  );
}

function ClearAll({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();

  return (
    <ClearAllContainer onClick={onClick} padding={2}>
      <Text color="primary.c80">{t("common.clearAll")}</Text>
    </ClearAllContainer>
  );
}

const ClearAllContainer = styled(Flex).attrs({ padding: 2 })`
  cursor: pointer;
`;

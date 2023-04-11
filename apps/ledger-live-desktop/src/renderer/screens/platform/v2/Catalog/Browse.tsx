import React, { useCallback, useMemo } from "react";
import { shell } from "electron";
import { Flex, Grid, SearchInput, Text, SelectInput } from "@ledgerhq/react-ui";
import { useCategories, useSearch, Disclaimer } from "@ledgerhq/live-common/wallet-api/react";
import { HTTP_REGEX } from "@ledgerhq/live-common/wallet-api/constants";
import { AppManifest } from "@ledgerhq/live-common/wallet-api/types";
import { Card } from "./Card";
import { SectionHeader } from "./SectionHeader";
import { useTranslation, Trans } from "react-i18next";

type Props = Pick<ReturnType<typeof useCategories>, "categories" | "setSelected"> &
  // eslint-disable-next-line prettier/prettier
  Pick<ReturnType<typeof useSearch<AppManifest, undefined>>, "input" | "onChange" | "result"> & {onSelect: Disclaimer["onSelect"]};

export function Browse({
  categories,
  input,
  onChange,
  setSelected,
  result,
  onSelect,
}: Props) {
  const { t } = useTranslation();

  return (
    <Flex flexDirection="column">
      <SectionHeader iconLeft="Globe">{t("platform.catalog.section.browse")}</SectionHeader>

      <Search categories={categories} input={input} onChange={onChange} setSelected={setSelected} />
      <Result manifests={result} input={input} onSelect={onSelect} />
    </Flex>
  );
}

type SearchProps = Pick<ReturnType<typeof useCategories>, "categories" | "setSelected"> &
  Pick<ReturnType<typeof useSearch>, "input" | "onChange">;

function Search({ categories, input, onChange: onChangeInput, setSelected }: SearchProps) {
  const { t } = useTranslation();

  const options = useMemo(
    () => categories.map(value => ({ value: value, label: value.toUpperCase() })),
    [categories],
  );

  const onChange = useCallback(
    ({ value }) => {
      setSelected(value);
    },
    [setSelected],
  );

  return (
    <Flex marginY={4}>
      {" "}
      <SearchInput placeholder={t("common.search")} value={input} onChange={onChangeInput} />
      <Flex alignItems="center" justifyContent="flex-end" flex={1}>
        <Text paddingX={2} color="neutral.c70">
          {t("platform.catalog.filter.categories")}
        </Text>

        <Flex>
          <SelectInput
            options={options}
            defaultValue={options[0]}
            onChange={onChange}
            styles={{ container: baseStyles => ({ ...baseStyles, width: 240 }) }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

function Result({ manifests, input, onSelect }: { manifests: AppManifest[]; input: string; onSelect: Disclaimer["onSelect"]}) {
  if (!manifests.length) {
    return <NoResult input={input} />;
  }

  return (
    <Grid columns={3} gridGap={4}>
      {manifests.map(m => (
        <Card key={m.id} manifest={m} onClick={onSelect} />
      ))}
    </Grid>
  );
}

// TODO: Styling
function NoResult({ input }: Pick<SearchProps, "input">) {
  const { t } = useTranslation();

  const onClickLink = useCallback(() => {
    shell.openExternal(input);
  }, [input]);

  return (
    <Flex flexDirection="column" alignItems="center" padding={4}>
      <Text>{t("platform.catalog.warnings.notFound")}</Text>
      <Text>
        {input.match(HTTP_REGEX) ? (
          <Trans
            i18nKey="platform.catalog.warnings.retrySearchKeywordAndUrl"
            values={{ search: input }}
            components={{
              Link: (
                <Text
                  color="primary.c70"
                  onClick={onClickLink}
                  style={{ textDecoration: "underline" }}
                >
                  {""}
                </Text>
              ),
            }}
          />
        ) : (
          t("platform.catalog.warnings.retrySearchKeyword")
        )}
      </Text>
    </Flex>
  );
}

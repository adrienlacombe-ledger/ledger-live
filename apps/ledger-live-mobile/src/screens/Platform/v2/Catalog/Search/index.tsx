import React from "react";
import { Linking, TouchableOpacity, TextInput } from "react-native";
import { useTheme } from "styled-components/native";
import * as Animatable from "react-native-animatable";
import { Flex, Text, InfiniteLoader } from "@ledgerhq/native-ui";
import { Trans, useTranslation } from "react-i18next";
import { LiveAppManifest } from "@ledgerhq/live-common/platform/types";
import { SearchBarValues } from "@ledgerhq/live-common/wallet-api/react";
import { HTTP_REGEX } from "@ledgerhq/live-common/wallet-api/constants";
import ArrowLeft from "../../../../../icons/ArrowLeft";
import { TAB_BAR_SAFE_HEIGHT } from "../../../../../components/TabBar/TabBarSafeAreaView";
import { Layout } from "../Layout";
import Illustration from "../../../../../images/illustration/Illustration";
import { ManifestList } from "../ManifestList";
import { SearchBar } from "./SearchBar";

export * from "./SearchBar";

const noResultIllustration = {
  dark: require("../../../../../images/illustration/Dark/_051.png"),
  light: require("../../../../../images/illustration/Light/_051.png"),
};

const AnimatedView = Animatable.View;

type Props = {
  manifests: LiveAppManifest[];
  recentlyUsed: LiveAppManifest[];
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  listTitle?: React.ReactNode;
  backAction?: () => void;
  onSelect: (manifest: LiveAppManifest) => void;
} & Omit<SearchBarValues<LiveAppManifest, TextInput>, "onCancel">;

export function Search({
  manifests,
  title,
  onSelect,
  input,
  inputRef,
  result,
  isSearching,
  backAction,
  onChange,
  onFocus,
}: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const noResultFoundComponent = (
    <Flex flexDirection={"column"} padding={4} marginTop={100}>
      <Flex alignItems="center">
        <Illustration
          size={164}
          lightSource={noResultIllustration.light}
          darkSource={noResultIllustration.dark}
        />
      </Flex>
      <Text textAlign="center" variant="h4" my={3}>
        {t("browseWeb3.catalog.warnings.notFound")}
      </Text>
      <Text textAlign="center" variant="body" color="neutral.c70">
        {input.match(HTTP_REGEX) ? (
          <Trans
            i18nKey="browseWeb3.catalog.warnings.retrySearchKeywordAndUrl"
            values={{
              search: input,
            }}
            components={{
              Link: (
                <Text
                  style={{ textDecorationLine: "underline" }}
                  onPress={() => Linking.openURL("http://" + input)}
                >
                  {""}
                </Text>
              ),
            }}
          />
        ) : (
          t("browseWeb3.category.warnings.retrySearchKeyword")
        )}
      </Text>
    </Flex>
  );
  return (
    <>
      <Layout
        isTitleVisible={true}
        title={title}
        topHeaderContent={
          <TouchableOpacity
            hitSlop={{
              bottom: 10,
              left: 24,
              right: 24,
              top: 10,
            }}
            style={{ paddingVertical: 16 }}
            onPress={backAction}
          >
            <ArrowLeft size={18} color={colors.neutral.c100} />
          </TouchableOpacity>
        }
        searchContent={
          <SearchBar
            input={input}
            inputRef={inputRef}
            onChange={onChange}
            onFocus={onFocus}
          />
        }
        bodyContent={
          isSearching ? (
            <Flex marginTop={100}>
              <InfiniteLoader size={40} />
            </Flex>
          ) : (
            <AnimatedView animation="fadeInUp" delay={50} duration={300}>
              <Flex paddingTop={4} paddingBottom={TAB_BAR_SAFE_HEIGHT + 50}>
                {result.length ? (
                  <ManifestList onSelect={onSelect} manifests={manifests} />
                ) : (
                  noResultFoundComponent
                )}
              </Flex>
            </AnimatedView>
          )
        }
      />
    </>
  );
}

import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import * as Animatable from "react-native-animatable";
import { Flex, Text } from "@ledgerhq/native-ui";
import { useTranslation } from "react-i18next";
import {
  useCategories,
  useSearch,
  useRecentlyUsed,
} from "@ledgerhq/live-common/wallet-api/react";
import { BROWSE_SEARCH_OPTIONS } from "@ledgerhq/live-common/wallet-api/constants";
import ArrowLeft from "../../../../icons/ArrowLeft";
import TabBarSafeAreaView, {
  TAB_BAR_SAFE_HEIGHT,
} from "../../../../components/TabBar/TabBarSafeAreaView";
import { Layout } from "./Layout";
import { useDeeplinkEffect, useDisclaimer, usePlatformState } from "../hooks";
import TrackScreen from "../../../../analytics/TrackScreen";
import { Search, SearchBar } from "./Search";
import { ManifestList } from "./ManifestList";
import { RecentlyUsed } from "./RecentlyUsed";
import { CatalogSection } from "./CatalogSection";
import { DAppDisclaimer } from "./DAppDisclaimer";
import { Props } from "../../Catalog";

const AnimatedView = Animatable.View;

export function Catalog({ navigation }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const title = t("browseWeb3.catalog.title");

  const state = usePlatformState();
  const {
    manifestsByCategories,
    manifests,
    categories,
    selected,
    setSelected,
    initialSelectedState,
  } = useCategories();
  const { data, append, clear } = useRecentlyUsed(manifests, state);

  const {
    input,
    inputRef,
    onChange,
    onCancel,
    onFocus,
    isActive,
    isSearching,
    result,
  } = useSearch({
    list: manifests,
    options: BROWSE_SEARCH_OPTIONS,
  });

  // TODO: Move inside the custom hook
  useEffect(() => {
    isActive && setSelected(initialSelectedState);
  }, [isActive, setSelected, initialSelectedState]);

  const {
    name,
    icon,
    isOpened,
    onClose,
    isChecked,
    toggleCheck,
    onSelect,
    openApp,
    onConfirm,
  } = useDisclaimer(append);

  useDeeplinkEffect(manifests, openApp);

  return (
    <TabBarSafeAreaView edges={["bottom", "left", "right"]}>
      {/* TODO: put under the animation header and style  */}
      <TrackScreen category="Platform" name="Catalog" />
      <DAppDisclaimer
        name={name}
        icon={icon}
        isOpened={isOpened}
        onClose={onClose}
        isChecked={isChecked}
        toggleCheck={toggleCheck}
        onConfirm={onConfirm}
      />

      {isActive ? (
        <Search
          manifests={manifests}
          recentlyUsed={data}
          title={title}
          input={input}
          // TODO: type error (TextInput generics)
          inputRef={inputRef}
          backAction={onCancel}
          onChange={onChange}
          onFocus={onFocus}
          result={result}
          isSearching={isSearching}
          isActive={isActive}
          onSelect={onSelect}
        />
      ) : (
        <>
          <Layout
            title={title}
            listStickyElement={[3]}
            topHeaderContent={
              <TouchableOpacity
                hitSlop={{
                  bottom: 10,
                  left: 24,
                  right: 24,
                  top: 10,
                }}
                style={{ paddingVertical: 16 }}
                onPress={navigation.goBack}
              >
                <ArrowLeft size={18} color={colors.neutral.c100} />
              </TouchableOpacity>
            }
            titleHeaderContent={
              <Flex marginBottom={16}>
                <Text fontWeight="bold" variant="h1Inter">
                  {title}
                </Text>
                <Text variant="large">{t("browseWeb3.catalog.subtitle")}</Text>
              </Flex>
            }
            middleHeaderContent={
              <SearchBar
                input={input}
                inputRef={inputRef}
                onChange={onChange}
                onFocus={onFocus}
              />
            }
            disableStyleBottomHeader
            bottomHeaderContent={
              <RecentlyUsed
                recentlyUsed={data}
                onSelect={onSelect}
                onClear={clear}
              />
            }
            disableStyleSubBottomHeader
            subBottomHeaderContent={
              <CatalogSection
                categories={categories}
                selected={selected}
                setSelected={setSelected}
              />
            }
            bodyContent={
              <AnimatedView animation="fadeInUp" delay={50} duration={300}>
                <Flex paddingTop={4} paddingBottom={TAB_BAR_SAFE_HEIGHT}>
                  <ManifestList
                    onSelect={onSelect}
                    manifests={manifestsByCategories.get(selected) || []}
                  />
                </Flex>
              </AnimatedView>
            }
          />
        </>
      )}
    </TabBarSafeAreaView>
  );
}

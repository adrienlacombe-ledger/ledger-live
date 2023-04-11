import { useEffect, useCallback, useState } from "react";
import { useDisclaimerRaw } from "@ledgerhq/live-common/wallet-api/react";
import {
  INITIAL_PLATFORM_STATE,
  DAPP_DISCLAIMER_ID,
} from "@ledgerhq/live-common/wallet-api/constants";
import {
  PlatformState,
  AppManifest,
} from "@ledgerhq/live-common/wallet-api/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDB } from "../../../db";
import { ScreenName } from "../../../const";
import { useBanner } from "../../../components/banners/hooks";
import { readOnlyModeEnabledSelector } from "../../../reducers/settings";
import { NavigationProps } from "./types";

export function useDeeplinkEffect(
  manifests: AppManifest[],
  openApp: (manifest: AppManifest) => void,
) {
  const navigation = useNavigation<NavigationProps["navigation"]>();
  const route = useRoute<NavigationProps["route"]>();
  const { platform, ...params } = route.params ?? {};

  useEffect(() => {
    // platform can be predefined when coming from a deeplink
    if (platform && manifests) {
      const manifest = manifests.find(m => m.id === platform);

      if (!manifest) return;

      openApp(manifest);
    }
  }, [platform, manifests, navigation, params, openApp]);
}

export function useDisclaimer(
  appendRecentlyUsed: (manifest: AppManifest) => void,
) {
  const isReadOnly = useSelector(readOnlyModeEnabledSelector);
  const [isDismissed, dismiss] = useBanner(DAPP_DISCLAIMER_ID);

  const navigation = useNavigation<NavigationProps["navigation"]>();
  const route = useRoute<NavigationProps["route"]>();
  const { platform, ...params } = route.params ?? {};

  const [manifest, setManifest] = useState<AppManifest>();
  const [isChecked, setIsChecked] = useState(false);

  const openApp = useCallback(
    (manifest: AppManifest) => {
      navigation.navigate(ScreenName.PlatformApp, {
        ...params,
        platform: manifest.id,
        name: manifest.name,
      });
    },
    [navigation, params],
  );

  const toggleCheck = useCallback(() => {
    setIsChecked(isDisabled => !isDisabled);
  }, [setIsChecked]);

  const onClose = useCallback(() => {
    setManifest(undefined);
  }, []);

  const raw = useDisclaimerRaw({
    isReadOnly,
    isDismissed,
    appendRecentlyUsed,
    uiHook: {
      dismiss,
      prompt: setManifest,
      close: onClose,
      openApp,
    },
  });

  const onConfirm = useCallback(() => {
    if (!manifest) return;

    raw.onConfirm(manifest, isChecked);
  }, [raw, manifest, isChecked]);

  return {
    ...raw,
    onConfirm,
    name: manifest?.name,
    icon: manifest?.icon,
    isOpened: !!manifest,
    isChecked,
    toggleCheck,
    onClose,
    openApp,
  };
}

export function usePlatformState() {
  return useDB<PlatformState, string[]>(
    "platform",
    INITIAL_PLATFORM_STATE,
    state => state.recentlyUsed,
  );
}

import {
  INITIAL_PLATFORM_STATE,
  DAPP_DISCLAIMER_ID,
} from "@ledgerhq/live-common/wallet-api/constants";
import { useDisclaimerRaw } from "@ledgerhq/live-common/wallet-api/react";
import { AppManifest, PlatformState } from "@ledgerhq/live-common/wallet-api/types";
import { useDispatch, useSelector } from "react-redux";
import { useDB } from "~/renderer/storage";
import { dismissedBannersSelector } from "~/renderer/reducers/settings";
import { dismissBanner } from "~/renderer/actions/settings";
import { useCallback, useMemo } from "react";
import { useHistory } from "react-router";
import { closePlatformAppDrawer, openPlatformAppDisclaimerDrawer } from "~/renderer/actions/UI";

export function usePlatformState() {
  return useDB<PlatformState, string[]>(
    ["app", "discover"],
    INITIAL_PLATFORM_STATE,
    state => state.recentlyUsed,
  );
}

export function useDisclaimer(appendRecentlyUsed: (manifest: AppManifest) => void) {
  const [isDismissed, dismiss] = useBanner(DAPP_DISCLAIMER_ID);
  const dispatch = useDispatch();
  const history = useHistory();

  const openApp = useCallback(
    (manifest: AppManifest) => {
      history.push(`/platform/${manifest.id}`);
    },
    [history],
  );

  const close = useCallback(() => {
    dispatch(closePlatformAppDrawer());
  }, [dispatch]);

  const prompt = useCallback(
    (manifest, onConfirm) => {
      dispatch(
        openPlatformAppDisclaimerDrawer({
          manifest,
          disclaimerId: DAPP_DISCLAIMER_ID,
          next: onConfirm,
        }),
      );
    },
    [dispatch],
  );

  return useDisclaimerRaw({
    isDismissed,
    appendRecentlyUsed,
    uiHook: {
      dismiss,
      prompt,
      close,
      openApp,
    },
  });
}

// TODO: share with mobile
function useBanner(id: string): [boolean, () => void] {
  const dispatch = useDispatch();
  const dismissedBanners = useSelector(dismissedBannersSelector);

  const isDismissed = useMemo(() => dismissedBanners.includes(id), [id, dismissedBanners]);

  const dismiss = useCallback(() => {
    dispatch(dismissBanner(id));
  }, [id, dispatch]);

  return [isDismissed, dismiss];
}

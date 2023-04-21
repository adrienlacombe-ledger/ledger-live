import { log } from "@ledgerhq/logs";
import staxLoadImage from "@ledgerhq/live-common/hw/staxLoadImage";
import staxFetchImage from "@ledgerhq/live-common/hw/staxFetchImage";
import installLanguage from "@ledgerhq/live-common/hw/installLanguage";
import connectApp from "@ledgerhq/live-common/hw/connectApp";
import connectManager from "@ledgerhq/live-common/hw/connectManager";
import { createAction as createStaxLoadImageAction } from "@ledgerhq/live-common/hw/actions/staxLoadImage";
import { createAction as createStaxFetchImageAction } from "@ledgerhq/live-common/hw/actions/staxFetchImage";
import { createAction as createInstallLanguageAction } from "@ledgerhq/live-common/hw/actions/installLanguage";
import { createAction as createConnectAppAction } from "@ledgerhq/live-common/hw/actions/app";
import { createAction as createConnectManagerAction } from "@ledgerhq/live-common/hw/actions/manager";
import { useUpdateFirmware } from "@ledgerhq/live-common/deviceSDK/hooks/useUpdateFirmware";
import { Device, DeviceModelId } from "@ledgerhq/types-devices";
import {
  UpdateFirmwareActionState,
  updateFirmwareActionArgs,
} from "@ledgerhq/live-common/deviceSDK/actions/updateFirmware";
import { Observable } from "rxjs";
import { useCallback, useEffect, useState } from "react";
import { DeviceInfo, idsToLanguage, languageIds } from "@ledgerhq/types-live";

export type FirmwareUpdateParams = {
  device: Device;
  deviceInfo: DeviceInfo;
  updateFirmwareAction?: (
    args: updateFirmwareActionArgs,
  ) => Observable<UpdateFirmwareActionState>;
};

export type UpdateStep =
  | "start"
  | "appsBackup"
  | "imageBackup"
  | "firmwareUpdate"
  | "languageRestore"
  | "imageRestore"
  | "appsRestore"
  | "completed";

const installLanguageAction = createInstallLanguageAction(installLanguage);
const staxLoadImageAction = createStaxLoadImageAction(staxLoadImage);
const staxFetchImageAction = createStaxFetchImageAction(staxFetchImage);
const connectManagerAction = createConnectManagerAction(connectManager);
const connectAppAction = createConnectAppAction(connectApp);

export const useUpdateFirmwareAndRestoreSettings = ({
  updateFirmwareAction,
  device,
  deviceInfo,
}: FirmwareUpdateParams) => {
  const [updateStep, setUpdateStep] = useState<UpdateStep>("start");

  const connectManagerState = connectManagerAction.useHook(
    updateStep === "appsBackup" ? device : null, null
  );
  const [installedApps, setInstalledApps] = useState<string[]>([]);

  const staxFetchImageState = staxFetchImageAction.useHook(
    updateStep === "imageBackup" ? device : null,
    "",
  );

  const { triggerUpdate, updateState: updateActionState } = useUpdateFirmware({
    deviceId: device?.deviceId ?? "",
    updateFirmwareAction,
  });

  const installLanguageState = installLanguageAction.useHook(
    updateStep === "languageRestore" ? device : null,
    idsToLanguage[deviceInfo.languageId ?? 0],
  );

  const staxLoadImageState = staxLoadImageAction.useHook(
    updateStep === "imageRestore" && staxFetchImageState.hexImage
      ? device
      : null,
    staxFetchImageState.hexImage ?? "",
    false
  );

  const proceedToFirmwareUpdate = useCallback(() => {
    setUpdateStep("firmwareUpdate");
  }, []);

  const proceedToAppsBackup = useCallback(() => {
    setUpdateStep("appsBackup");
  }, []);

  const proceedToImageBackup = useCallback(() => {
    if (device.modelId === DeviceModelId.stax) {
      setUpdateStep("imageBackup");
    } else {
      proceedToFirmwareUpdate();
    }
  }, [device.modelId, proceedToFirmwareUpdate]);

  const proceedToUpdateCompleted = useCallback(() => {
    setUpdateStep("completed");
  }, []);

  const proceedToAppsRestore = useCallback(() => {
    // TODO: if no apps to restore proceed to update completed
    setUpdateStep("appsRestore");
  }, []);

  const proceedToImageRestore = useCallback(() => {
    if (staxFetchImageState.hexImage) {
      setUpdateStep("imageRestore");
    } else {
      proceedToAppsRestore();
    }
  }, [proceedToAppsRestore, staxFetchImageState.hexImage]);

  const proceedToLanguageRestore = useCallback(() => {
    if (
      deviceInfo.languageId !== undefined &&
      deviceInfo.languageId !== languageIds.english
    ) {
      setUpdateStep("languageRestore");
    } else {
      setUpdateStep("imageRestore");
    }
  }, [deviceInfo.languageId]);

  useEffect(() => {
    switch (updateStep) {
      case "start":
        proceedToAppsBackup();
        break;
      case "appsBackup":
        if(connectManagerState.result) {
          setInstalledApps(connectManagerState.result.appsListNames);
          proceedToImageBackup();
        }
        break;
      case "imageBackup":
        if (staxFetchImageState.imageFetched || staxFetchImageState.error) {
          if (staxFetchImageState.error)
            log(
              "FirmwareUpdate",
              "error while backing up stax image",
              staxFetchImageState.error,
            );
          proceedToFirmwareUpdate();
        }
        break;
      case "firmwareUpdate":
        if (updateActionState.step === "preparingUpdate") {
          triggerUpdate();
        } else if (updateActionState.step === "firmwareUpdateCompleted") {
          proceedToLanguageRestore();
        }
        break;
      case "languageRestore":
        if (
          installLanguageState.languageInstalled ||
          installLanguageState.error
        ) {
          if (installLanguageState.error)
            log(
              "FirmwareUpdate",
              "error while restoring language",
              installLanguageState.error,
            );
          proceedToImageRestore();
        }
        break;
      case "imageRestore":
        if (staxLoadImageState.imageLoaded || staxLoadImageState.error) {
          if (staxLoadImageState.error)
            log(
              "FirmwareUpdate",
              "error while restoring stax image",
              installLanguageState.error,
            );
          proceedToAppsRestore();
        }
        break;
      case "appsRestore":
        proceedToUpdateCompleted();
        break;
      default:
        break;
    }
  }, [
    device.modelId,
    deviceInfo.languageId,
    connectManagerState.result,
    installLanguageState.error,
    installLanguageState.languageInstalled,
    proceedToAppsRestore,
    proceedToFirmwareUpdate,
    proceedToImageBackup,
    proceedToImageRestore,
    proceedToLanguageRestore,
    proceedToUpdateCompleted,
    staxFetchImageState.error,
    staxFetchImageState.imageFetched,
    staxLoadImageState.error,
    staxLoadImageState.imageLoaded,
    triggerUpdate,
    updateActionState.step,
    updateStep,
  ]);

  return {
    updateStep,
    staxFetchImageState,
    updateActionState,
    staxLoadImageState,
    installLanguageState,
    retryUpdate: triggerUpdate,
  };
};

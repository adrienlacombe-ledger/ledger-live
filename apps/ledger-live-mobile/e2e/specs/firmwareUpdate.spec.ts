import { waitFor, expect } from "detox";
import PortfolioPage from "../models/wallet/portfolioPage";
import * as bridge from "../bridge/server";

import { loadConfig } from "../bridge/server";
import SettingsPage from "../models/settings/settingsPage";
import DebugSettingsPage from "../models/settings/debugSettingsPage";
import { scrollToText } from "../helpers";
import DeviceSelectionPage from "../models/settings/deviceSelectionPage";

let portfolioPage: PortfolioPage;
let settingsPage: SettingsPage;
let debugSettingsPage: DebugSettingsPage;
let deviceSelectionPage: DeviceSelectionPage;

const updatableDeviceInfo = {
  bootloaderVersion: "1.16",
  hardwareVersion: 0,
  hasDevFirmware: false,
  isBootloader: false,
  isOSU: false,
  isRecoveryMode: false,
  languageId: 0,
  majMin: "2.1",
  managerAllowed: false,
  mcuBlVersion: undefined,
  mcuTargetId: undefined,
  mcuVersion: "2.30",
  onboarded: true,
  pinValidated: true,
  providerName: null,
  seTargetId: 855638020,
  seVersion: "2.0.0",
  targetId: 855638020,
  version: "2.0.0",
};

describe("Firmware update", () => {
  beforeAll(async () => {
    await loadConfig("1AccountBTC1AccountETH", true);
    portfolioPage = new PortfolioPage();
    settingsPage = new SettingsPage();
    debugSettingsPage = new DebugSettingsPage();
    deviceSelectionPage = new DeviceSelectionPage();
  });

  it("should go to Settings", async () => {
    await portfolioPage.navigateToSettings();
  });

  it("should navigate to Debug settings", async () => {
    await scrollToText("Debug", "SettingsScrollView");
    await settingsPage.navigateToDebugSettings();
  });

  it("should navigate to Firmware update flow", async () => {
    bridge.mockDeviceAction("updateFirmware");

    await debugSettingsPage.tapFeaturesDebugFlow();
    await debugSettingsPage.tapFirmwareUpdateFlow();
  });

  it("should start update", async () => {
    await deviceSelectionPage.tapAddWithBluetooth();
    await deviceSelectionPage.tapConnectAnExistingLedger();

    bridge.addDevices();

    await waitFor(deviceSelectionPage.getNanoXByName("David"))
      .toExist()
      .withTimeout(3000);

    await deviceSelectionPage.tapNanoXByName("David");

    await waitFor(deviceSelectionPage.getPairingWithNanoXText("David"))
      .toExist()
      .withTimeout(10000);

    bridge.open();

    await waitFor(debugSettingsPage.getTriggerUpdateButton())
      .toExist()
      .withTimeout(10000);

    await debugSettingsPage.tapTriggerUpdate();
  });

  it("should correctly render all states of the update", async () => {
    bridge.updateDeviceActionState({
      deviceAction: "updateFirmware",
      newState: {
        lockedDevice: false,
        progress: 0.5,
        step: "installingOsu",
        error: null,
      },
    });

    await expect(debugSettingsPage.getUpdateProgress()).toHaveText("0.5");
    await expect(debugSettingsPage.getUpdateLockedDevice()).toHaveText("false");
    await expect(debugSettingsPage.getUpdateStep()).toHaveText("installingOsu");
    await expect(debugSettingsPage.getUpdateError()).toHaveText("null");

    await new Promise((resolve) => setTimeout(() => resolve("a"), 10000));
  });
});

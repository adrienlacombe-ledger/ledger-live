// @flow

import type {
  DeviceInfo,
  ApplicationVersion
} from "@ledgerhq/live-common/lib/types/manager";
import type { InstalledItem } from "@ledgerhq/live-common/lib/apps/types";
import type { CryptoCurrency } from "@ledgerhq/live-common/lib/types";
import { findCryptoCurrency } from "@ledgerhq/live-common/lib/currencies";
import type { DeviceModel } from "@ledgerhq/devices";
import appInfos from "./app_info_1.5.5_1.6.json";
import firmwareSize from "./firmware_size.json";

export const formatSize = (size: number) =>
  !size ? "" : Math.round(100 * (size / 1024)) / 100 + "Kb";

export const lenseAppHash = (app: ApplicationVersion) => {
  const entry = appInfos.find(i => i.key === app.firmware);
  return entry ? entry.hash : "";
};

const inferAppBytes = ({ key, hash }: *) => {
  const entry = appInfos.find(
    a => (key && a.key === key) || (hash && a.hash === hash)
  );
  if (entry) {
    return entry.size;
  }
  return 0;
};

export const inferAppSize = (search: *) =>
  Math.ceil(inferAppBytes(search) / blockSize);

export const getOsSize = (
  deviceModel: DeviceModel,
  deviceInfo: DeviceInfo
): number =>
  firmwareSize[deviceModel.id.toLowerCase() + "/" + deviceInfo.version] || 0;

const blockSize = 4 * 1024;

export type AppData = {
  currency: ?CryptoCurrency,
  name: string,
  blocks: number,
  bytes: number
};

export type AppsDistribution = {
  totalBlocks: number,
  totalBytes: number,
  osBlocks: number,
  osBytes: number,
  apps: Array<AppData>
};

export const distribute = (a: {
  deviceModel: DeviceModel,
  deviceInfo: DeviceInfo,
  installed: InstalledItem[]
}): AppsDistribution => {
  const totalBytes = a.deviceModel.memorySize;
  const totalBlocks = Math.floor(totalBytes / blockSize);
  const osBytes = getOsSize(a.deviceModel, a.deviceInfo);
  const osBlocks = Math.ceil(osBytes / blockSize);
  const apps: AppData[] = a.installed
    .map(app => {
      const { name, blocks } = app;
      const currency = findCryptoCurrency(c => c.managerAppName === name);
      return { currency, name, blocks, bytes: blocks * blockSize };
    })
    .sort((a: AppData, b: AppData) => b.blocks - a.blocks);
  return { totalBlocks, totalBytes, osBlocks, osBytes, apps };
};

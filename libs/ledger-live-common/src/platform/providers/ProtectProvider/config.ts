import { LiveAppManifest } from "../../types";
import { ProtectEnv } from "./types";

const protectEnv = ProtectEnv.SIMU;

const protectIds = {
  [ProtectEnv.PREPROD]: "protect-preprod",
  [ProtectEnv.STAGING]: "protect-staging",
  [ProtectEnv.SIMU]: "protect-simu",
  [ProtectEnv.SIT]: "protect-sit",
  [ProtectEnv.SEC]: "protect",
};

const protectURLs = {
  [ProtectEnv.PREPROD]: "https://protect-frontend-ppr.aws.ppr.ldg-tech.com",
  [ProtectEnv.STAGING]: "https://protect-frontend-stg.aws.stg.ldg-tech.com",
  [ProtectEnv.SIMU]: "https://protect-frontend-simu-stg.aws.stg.ldg-tech.com",
  [ProtectEnv.SEC]: "https://protect-frontend.aws.sec.ldg-tech.com",
  [ProtectEnv.SIT]: "https://protect-frontend.aws.sit.ldg-tech.com",
};

const stargatePortalUrls = {
  [ProtectEnv.PREPROD]: "http://stargate-portal.api.aws.ppr.ldg-tech.com",
  [ProtectEnv.STAGING]: "https://stargate-portal-stg.api.aws.stg.ldg-tech.com",
  [ProtectEnv.SIMU]:
    "https://stargate-portal-simu-stg.api.aws.stg.ldg-tech.com",
  [ProtectEnv.SEC]: "https://stargate-portal-sec.api.aws.sec.ldg-tech.com",
  [ProtectEnv.SIT]: "https://stargate-portal-sit.api.aws.sit.ldg-tech.com",
};

const protectId = protectIds[protectEnv];

const protectUrl = protectURLs[protectEnv];

const stargatePortalUrl = stargatePortalUrls[protectEnv];

let platformName = "Recover";

if ((protectEnv as ProtectEnv) !== ProtectEnv.SEC) {
  platformName += ` ${
    protectEnv.charAt(0).toUpperCase() + protectEnv.slice(1)
  }`;
}

const protectManifest = {
  id: protectId,
  name: platformName,
  private: true,
  url: protectUrl,
  homepageUrl: "",
  icon: "",
  platform: "mobile",
  apiVersion: "^2.0.0 || ^1.0.0",
  manifestVersion: "1",
  branch: "experimental",
  content: {
    shortDescription: {
      en: "Never lose access to your assets with Ledger Recover.",
    },
    description: {
      en: "Never lose access to your assets with Ledger Recover.",
    },
  },
  permissions: [
    "account.list",
    "account.receive",
    "account.request",
    "currency.list",
    "device.close",
    "device.exchange",
    "device.transport",
    "message.sign",
    "transaction.sign",
    "transaction.signAndBroadcast",
    "wallet.capabilities",
    "wallet.info",
  ],
  currencies: "*",
  domains: ["https://*", "http://*"],
} as LiveAppManifest;

const protectMobileFeatureFlag = {
  enabled: true,
  params: {
    onboardingRestore: {
      restoreInfoDrawer: {
        enabled: true,
        manualStepsURI:
          "https://support.ledger.com/hc/en-us/articles/360013349800-Update-Ledger-Nano-X-firmware?docs=true",
        supportLinkURI:
          "http://chat.abhishekpriyam.com/sprinklrlivechatv2.php?appId=63453067138a3f453db323b4_app_300078397&env=prod3",
      },
      postOnboardingURI: `ledgerlive://discover/${protectId}?redirectTo=login`,
    },
    managerStatesData: {
      "1100": {
        learnMoreURI: `ledgerlive://discover/${protectId}?redirectTo=upsell`,
        alreadySubscribedURI: `ledgerlive://discover/${protectId}?redirectTo=login`,
      },
      "1200": {
        confirmNowURI: `ledgerlive://discover/${protectId}?redirectTo=activate`,
        viewDetailsURI: `ledgerlive://discover/${protectId}?redirectTo=account`,
      },
      "1201": {
        addNowURI: `ledgerlive://discover/${protectId}?redirectTo=activate`,
        viewDetailsURI: `ledgerlive://discover/${protectId}?redirectTo=account`,
      },
      "1300": {
        editNowURI: "https://chargebee.com",
        viewDetailsURI: `ledgerlive://discover/${protectId}?redirectTo=account`,
      },
      "1400": {
        contactLedgerSupportURI: "",
        viewDetailsURI: `ledgerlive://discover/${protectId}?redirectTo=account`,
      },
      "1500": {
        viewDetailsURI: `ledgerlive://discover/${protectId}?redirectTo=account`,
      },
    },
    login: {
      forgotPasswordURI: `ledgerlive://discover/${protectId}?redirectTo=forgotPassword`,
    },
  },
};

const config = {
  protectId,
  protectEnv,
  protectManifest,
  protectMobileFeatureFlag,
  protectUrl,
  stargatePortalUrl,
};

export default config;

export { protectIds };

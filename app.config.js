// https://docs.expo.dev/versions/latest/config/app/

const MAJOR_VERSION_NUMBER = 4;
const MINOR_VERSION_NUMBER = 1;
const PATCH_VERSION_NUMBER = 20250717;
const FULL_APP_VERSION = MAJOR_VERSION_NUMBER + "." + MINOR_VERSION_NUMBER + "." + PATCH_VERSION_NUMBER;
const PACKAGE = "com.myplaceonline";
const BGCOLOR = "#ffffff";

export default {
  name: "Myplaceonline",
  slug: "myplaceonline",
  owner: "myplaceonline",
  version: FULL_APP_VERSION,
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: BGCOLOR,
  },
  updates: {
    enabled: false,
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: PACKAGE,
    buildNumber: FULL_APP_VERSION,
    usesAppleSignIn: false,
  },
  android: {
    package: PACKAGE,
    versionCode: MAJOR_VERSION_NUMBER,
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: BGCOLOR
    },
    backgroundColor: BGCOLOR,
  },
  androidStatusBar: {
    translucent: true,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  developmentClient: {
    silentLaunch: true,
  },
}

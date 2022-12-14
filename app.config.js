// https://docs.expo.dev/versions/latest/config/app/

const MAJOR_VERSION_NUMBER = 2;
const MINOR_VERSION_NUMBER = 1;
const PATCH_VERSION_NUMBER = 20221201;
const FULL_APP_VERSION = MAJOR_VERSION_NUMBER + "." + MINOR_VERSION_NUMBER + "." + PATCH_VERSION_NUMBER;
const PACKAGE = "com.myplaceonline.main";
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
    backgroundColor: "#00000000",
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
    backgroundColor: "#00000000",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  developmentClient: {
    silentLaunch: true,
  },
}

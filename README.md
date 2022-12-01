# myplaceonline_expo

## Build for App Stores

1. Update `PACKAGE` in `app.config.js`:
    1. Android: `com.myplaceonline`
    1. iOS: `com.myplaceonline.main`
1. In `app.config.js`, increment `MAJOR_VERSION_NUMBER` (Android always requires that the major version is incremented), and set `PATCH_VERSION_NUMBER` to the current date.
1. `git commit -am "Version X.Y.Z: Major changes"`
1. `git tag X.Y.Z`
1. `git push && git push --tags`
1. `git pull`
1. Update packages
    1. iOS
       ```
       sudo rm -rf /usr/local/lib/node_modules/expo-cli/node_modules/webpack-dev-server/node_modules/fsevents/.node-gyp
       sudo mkdir /usr/local/lib/node_modules/expo-cli/node_modules/webpack-dev-server/node_modules/fsevents/.node-gyp
       sudo npm i -g --force expo expo-cli eas-cli
       npm install
       ```
1. `npx expo prebuild`
1. Android:
    1. Update `android/app/build.gradle`:
        1. Update `project.ext.react` to [disable JS minification in the release build](https://stackoverflow.com/a/49487208/4135310) for improved diagnostics:
           ```
           project.ext.react = [
               enableHermes: true, // https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#android
               extraPackagerArgs: [ '--minify=false' ]
           ]
           ```
    1. Update `android/app/src/main/res/values/styles.xml`
        1. Set `<item name="android:windowTranslucentStatus">false</item>` within the top section.
    1. `sudo rm -rf /tmp/metro-cache/`
    1. Start Android Studio
    1. Open existing project } `$DIRECTORY/android`
    1. Disregard the prompt to upgrade Gradle
    1. Wait until the build and indexing finish, and observe a CMake error
    1. Close Android Studio
    1. Start Android Studio
    1. Expand myplaceonline_expo } app } res } mipmap, and delete any "anydpi" files under ic_*. Uncheck "Safe delete"
    1. Update the app icon:
        1. Right click on `app` } New } Image Asset
        1. Icon Type: Launcher Icons (Adaptive and Legacy)
        1. Foreground Layer } Path: /work/myplaceonline/src/myplaceonline/src/myplaceonline_expo/assets/icon.png
        1. Resize: 44%
        1. Background Layer } Color: ffffff
        1. Next
        1. Finish
    1. Add files to git: Check Don't Ask Again; Cancel
    1. If you want to test in emulators, run the following (or use the later instructions to install the apk):
        1. On Linux:
            1. In one terminal window:
                1. `export ANDROID_HOME=$HOME/Android/Sdk/`
                1. `export PATH=${ANDROID_HOME}/platform-tools/:${PATH}`
                1. `npx react-native start`
            1. In Android studio, select the emulator type and click Play, or from another terminal window:
                1. `export ANDROID_HOME=$HOME/Android/Sdk/`
                1. `export PATH=${ANDROID_HOME}/platform-tools/:${PATH}`
                1. `npm run android`
        1. On other operating systems:
            1. In Android studio, select the emulator type and click Play
            1. Or from another terminal window: `npm run android`
    1. Stop rails dev server, `sudo systemctl stop elasticsearch postgresql`, VS Code, and any other memory intensive programs
    1. Build } Generate Signed Bundle/APK
        1. Android App Bundle
        1. Key store path: /work/myplaceonline/src/myplaceonline/lib/keys/myplaceonline_android_phonegap.keystore
        1. Key store password: https://myplaceonline.com/passwords/653
        1. Key alias: myplaceonline_alias
        1. Key password: Same as above
        1. Set encrypted key folder to /work/myplaceonline/src/myplaceonline/lib/keys
        1. Next
        1. Destination folder: /work/myplaceonline/src/myplaceonline/lib/android/builds
        1. Build Variants: release
        1. Finish
        1. Do you want to add the following file to Git? } Remember, don't ask again; Cancel
    1. `cd /work/myplaceonline/src/myplaceonline/lib/android/builds/release/`
    1. `export ANDROID_HOME=$HOME/Android/Sdk/`
    1. `export PATH=${ANDROID_HOME}/platform-tools/:${PATH}`
    1. Connect Android phone
    1. `adb devices`
    1. `adb uninstall com.myplaceonline`
        1. If no devices, try `adb kill-server`; otherwise, try rebooting the phone
    1. `rm *apks toc.pb universal.apk 2>/dev/null`
    1. Download bundletool: https://developer.android.com/studio/command-line/bundletool
    1. Generate apks:
       ```
       java -jar ~/Downloads/bundletool-all-*.jar build-apks --bundle=app-release.aab --output=app-release.apks --ks=/work/myplaceonline/src/myplaceonline/lib/keys/myplaceonline_android_phonegap.keystore --ks-key-alias myplaceonline_alias --mode=universal
       ```
    1. Install on Android phone:
        1. Simple:
           ```
           java -jar ~/Downloads/bundletool-all-*.jar install-apks --apks=app-release.apks
           ```
        1. If installing on a more locked Android phone:
           ```
           unzip app-release.apks
           sudo /usr/local/share/.config/yarn/global/node_modules/xdl/binaries/linux/adb/adb kill-server
           sudo /usr/local/share/.config/yarn/global/node_modules/xdl/binaries/linux/adb/adb start-server
           sudo /usr/local/share/.config/yarn/global/node_modules/xdl/binaries/linux/adb/adb devices
           sudo /usr/local/share/.config/yarn/global/node_modules/xdl/binaries/linux/adb/adb install universal.apk
           ```
    1. Launch app from phone launcher
    1. Close Android Studio
1. iOS:
    1. Open XCode and then open `myplaceonline_expo.xcworkspace`
    1. Wait for "Indexing" to complete
    1. First time: Preferences } Accounts } Add } root@myplaceonline.com
    1. Double click on myplaceonline_expo
        1. Signing & Capabilities } Team: Kevin Grigorenko
        1. Build Phases } Bundle React Native code and images } On the first line, insert:
           ```
           export EXTRA_PACKAGER_ARGS="--minify=false"
           ```
    1. Update the status bar style:
        1. myplaceonline_expo } myplaceonline_expo } Info.plist
        1. Set Status bar style: Dark Content
        1. Privacy - Location *: Zoom into your current location. We don't store your location.
        1. Save the file
    1. If you want to test in emulators, select the emulator type and click Play
    1. Next to the play/stop buttons, to the right of myplaceonline_expo, select Build } Any iOS Device
    1. Product } Archive
    1. Click Distribute App
    1. Wait for an email that "The following build has completed processing"
    1. Quit XCode
    1. There may be a Metro terminal window open. If so, `Ctrl+C` and then `Enter` to end it.
    1. Go to https://appstoreconnect.apple.com/apps/
        1. Click on Myplaceonline
        1. Click on the plus button in the top left to create a new version and put in X.Y.Z
        1. Summarize updates under "What's New in This Version"
        1. If needed, update screenshots and other metadata.
            1. iPhone 14 Pro Max for 6.7" Screenshots. 1290x2796
            1. iPhone 12 Pro Max for 6.5" Screenshots
            1. iPhone 8 Plus for 5.5" Screenshots 1242x2208
            1. iPad Pro (4th Gen) for iPad Pro (3rd Gen) 12.9" Screenshots 2048x2732
            1. iPad Pro (4th Gen) for iPad Pro (2nd Gen) 12.9" Screenshots
        1. Click the button, "Select a build before you submit your app"
            1. Select Yes for encryption and Yes for exemption.
        1. Click Save
        1. Wait for the notification that the app is ready to be tested in Test Flight
        1. Test the app using Test Flight
1. If the app testing is good:
    1. iOS:
        1. Go to https://appstoreconnect.apple.com/apps/
            1. Click on Myplaceonline
            1. Click Submit for Review
    1. Android:
        1. Update the Android app in the Play store:
            1. Go to <https://play.google.com/console/>
            1. User = root@myplaceonline.com
            1. Click on Myplaceonline
            1. Click on Production
            1. Click Create new release
            1. Upload aab file
            1. Under Release notes, summarize the updates (required)
            ```
            <en-US>
            Various bug fixes
            </en-US>
            ```
            1. Click Save
            1. Click Review Release
            1. Click Start rollout to Production
            1. First time: Configure notifications to email when review is complete: All apps } Settings } Preferences
        1. The store listing (such as screenshots) is updated independently under Store Presence } Main store listing
            1. Pixel 2, Nexus 7, and Nexus 10 used for screenshots
1. iOS:
    1. `git checkout -b X.Y.Z_ios`
    1. `git add -A .`
    1. `git commit -am "iOS build"`
    1. `git push --set-upstream origin X.Y.Z_ios`
1. Android:
    1. `git checkout -b X.Y.Z_android`
    1. `git add -A .`
    1. `git commit -am "Android build"`
    1. `git push --set-upstream origin X.Y.Z_android`
1. `git checkout master`
1. `git clean --force && git reset --hard && rm -rf android/ ios/`

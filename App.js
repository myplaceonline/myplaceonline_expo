import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";

const BASE_URL = "https://myplaceonline.com/";
const DEBUG = false;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
  },
  webview: {
    flex: 1,
  },
  center: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

function CustomActivityIndicator() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.wrapper}>
      {/*<StatusBar style="dark" backgroundColor="#ffffff" />*/}
      <WebView
        style={styles.webview}
        source={{ uri: BASE_URL }}
        mediaPlaybackRequiresUserAction={false}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        allowsBackForwardNavigationGestures={true}
        cacheEnabled={true}
        sharedCookiesEnable={true}
        pullToRefreshEnabled={true}
        onError={(event) => {
          console.warn("WebView error: ", event.nativeEvent);
        }}
        onShouldStartLoadWithRequest={(request) => {
          if (DEBUG) console.info("onShouldStartLoadWithRequest " + request.url);
          if (request.url.startsWith("http") && !request.url.startsWith(BASE_URL)) {
            Linking.openURL(request.url);
            return false;
          }
          return true;
        }}
        startInLoadingState={true}
        renderLoading={() => <CustomActivityIndicator />}
      />
    </View>
  );
}

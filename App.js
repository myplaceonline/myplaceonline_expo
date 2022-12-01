import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  webview: {
    flex: 1,
  },
});

const BASE_URL = "https://myplaceonline.com/";

export default function App() {
  return (
    <View style={styles.wrapper}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
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
          console.warn('WebView error: ', event.nativeEvent);
        }}
        onShouldStartLoadWithRequest={(request) => {
          if (request.url.startsWith(BASE_URL)) {
            Linking.openURL(request.url);
            return false;
          }
          return true;
        }}
      />
    </View>
  );
}

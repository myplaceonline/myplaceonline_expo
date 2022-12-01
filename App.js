import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  webview: {
    flex: 1,
  },
});

export default function App() {
  return (
    <View style={styles.wrapper}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <WebView
        style={styles.webview}
        source={{ uri: "https://myplaceonline.com/" }}
      />
    </View>
  );
}

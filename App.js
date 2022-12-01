import * as React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});

export default function App() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: "https://myplaceonline.com/" }}
    />
  );
}

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

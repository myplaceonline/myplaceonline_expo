import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

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
    <View>
      <WebView
        style={styles.container}
        source={{ uri: "https://myplaceonline.com/" }}
      />
    </View>
  );
}

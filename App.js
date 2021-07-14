import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from "./src/navigation/navigation"


export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

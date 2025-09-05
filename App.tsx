/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

import PushNotification from './src/services/PushNotification';';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {

    // Ask for permission & get token
    PushNotification.requestUserPermission();

    // Foreground notifications
    PushNotification.listenForegroundNotifications();

    // Background notifications
    PushNotification.listenBackgroundNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NewAppScreen templateFileName="App.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

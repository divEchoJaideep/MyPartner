/**
 * @format
 */
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';   
import notifee, { AndroidImportance } from '@notifee/react-native';
import App from './src';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message:', remoteMessage);

  // await notifee.displayNotification({
  //   title: remoteMessage?.notification?.title || 'New Notification',
  //   body: remoteMessage?.notification?.body || 'You got a new message!',
  //   android: {
  //     channelId: 'default',
  //     importance: AndroidImportance.HIGH,
  //     pressAction: { id: 'default' },
  //   },
  // });
});

AppRegistry.registerComponent(appName, () => App);

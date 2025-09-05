import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

class PushNotification {
  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted:', authStatus);
      this.getFcmToken();
    }
  }

  async getFcmToken() {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      // TODO: Send this token to your backend
      return token;
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  }

  listenForegroundNotifications() {
    messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification?.title || 'Notification',
        remoteMessage.notification?.body || 'You have a new message'
      );
    });
  }

  listenBackgroundNotifications() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Notification in background:', remoteMessage);
    });
  }
}

export default new PushNotification();

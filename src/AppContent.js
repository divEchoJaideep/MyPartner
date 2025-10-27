import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import AppNavigation from './navigation/AppNavigation';
// import { navigationRef } from './navigation/ReduxNavigation';
import Toast from 'react-native-toast-message';
import { requestUserPermission } from './services/PushNotification';
import { displayNotification } from './utils/diplayNotification';
import useCheckProfile from './AppInitializer';
import { AuthContext } from './context/AuthContext';
import { UnreadProvider } from './context/UnreadContext';
import {navigationRef} from './navigation/RootNavigation';


const linking = {
  prefixes: ['mypartner://'],
  config: { screens: { ConnectRegister: 'connect/register' } },
};

const orderNav = [
  { key: "express_interest", screen: { name: "Topboard", child: "Received" } },
  { key: "reject_interest", screen: { name: "Home", child: null } },
  { key: "Remove_favorites", screen: { name: "Home", child: null } },
  { key: "add_to_favorites", screen: { name: "Home", child: null } },
  { key: "accept_interest", screen: { name: "Topboard", child: "Sent" } },
  { key: "new_message", screen: { name: "Dashboard", child: "Chat" } },
  // { key: "order_cancelled", screen: { name: "OrderMain", child: "CancellOrder" } },
  // { key: "chat_notification", screen: { name: "Chats", child: null } },
];

const AppContent = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [currentRoute, setCurrentRoute] = useState(null);
  const checkProfile = useCheckProfile();
  const pendingNotification = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      requestUserPermission();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      checkProfile(navigationRef.current);
    }
  }, [currentRoute]);

  const handleNotification = (remoteMessage) => {
    console.log('remoteMessage :', remoteMessage);

    const type =
      remoteMessage?.notification?.title ||
      remoteMessage?.data?.type;

    if (!type) return;

    const matched = orderNav.find(item => item.key === type);
    if (!matched) return;

    let params = {};
    if (type === 'chat_notification' && remoteMessage.data?.chatId) {
      params = { conversationId: remoteMessage.data.chatId };
    }

    const navigateNow = () => {
      if (matched.screen.child) {
        navigationRef.current?.navigate(matched.screen.name, {
          screen: matched.screen.child,
          params,
        });
      } else {
        navigationRef.current?.navigate(matched.screen.name, params);
      }
    };

    if (navigationRef.current?.isReady()) {
      navigateNow();
    } else {
      pendingNotification.current = navigateNow;
    }
  };


  useEffect(() => {
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log("Foreground remoteMessage:", remoteMessage);

      await displayNotification(
        remoteMessage?.notification?.title || "New Notification",
        remoteMessage?.notification?.body || "You got a new message!",
        () => handleNotification(remoteMessage)
      );
    });

    const unsubscribeBackground = messaging().onNotificationOpenedApp(handleNotification);
    messaging().getInitialNotification().then(handleNotification);
    const interval = setInterval(() => {
      if (navigationRef.current?.isReady() && pendingNotification.current) {
        pendingNotification.current();
        pendingNotification.current = null;
      }
    }, 500);

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
      clearInterval(interval);
    };
  }, []);

  return (
    <UnreadProvider>
    <NavigationContainer
    linking={linking} 
      ref={navigationRef}
      onReady={() => {
        const route = navigationRef.current?.getCurrentRoute();
        if (route) setCurrentRoute(route.name);
      }}
      onStateChange={() => {
        const route = navigationRef.current?.getCurrentRoute();
        if (route) setCurrentRoute(route.name);
      }}
    >
      <AppNavigation />
      <Toast />
    </NavigationContainer>
    </UnreadProvider>
  );
};

export default AppContent;

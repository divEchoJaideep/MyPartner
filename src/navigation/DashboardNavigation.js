import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Colors, Images } from '../theme';
import { isIphoneX } from '../libs/Utils';
import styles from './Styles';

// Screens
import HomeScreenTwo from '../screens/Home/HomeScreenTwo';
import PublicStoryScreen from '../screens/Story/PublicStoryScreen';
import TopboardNavigation from './TopboardNavigation';
import ChatScreen from '../screens/Chat/ChatScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const DashboardNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.white,
          paddingBottom: 20,
          // height: isIphoneX() ? 90 : 72,
          paddingVertical: 10,
          elevation: 40,
          shadowColor: Colors.boxShadowLighterBlack,
          shadowOffset: { height: -10 },
          shadowOpacity: 0.1,
          shadowRadius: 40,
        },
      }}>
      <Tab.Screen
        name="Home"
        initialParams={{ nextScreen: 'Wishlist' }}
        component={HomeScreenTwo}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: () => (
            <Image source={Images.Home} resizeMode="contain" style={styles.notificationIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="PublicStoryScreen"
        initialParams={{ nextScreen: 'Booking' }}
        component={PublicStoryScreen}
        options={{
          tabBarLabel: 'Story',
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: () => (
            <Image source={Images.StarActive} resizeMode="contain" style={styles.notificationIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="Topboard"
        initialParams={{ nextScreen: 'Booking' }}
        component={TopboardNavigation}
        options={{
          tabBarLabel: 'Inbox',
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: () => (
            <Image source={Images.DocumentIcon} resizeMode="contain" style={styles.notificationIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        initialParams={{ nextScreen: 'Booking' }}
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: () => (
            <Image source={Images.FeedBackIcon} resizeMode="contain" style={styles.notificationIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{ nextScreen: 'Booking' }}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: () => (
            <Image source={Images.CouplesIcon} resizeMode="contain" style={styles.notificationIcon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigation;
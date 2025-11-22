import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors, Images } from '../theme';
import styles from './Styles';

// Screens
import HomeScreenTwo from '../screens/Home/HomeScreenTwo';
import PublicStoryScreen from '../screens/Story/PublicStoryScreen';
import TopboardNavigation from './TopboardNavigation';
import ChatScreen from '../screens/Chat/ChatScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { useUnread } from '../context/UnreadContext';

const Tab = createBottomTabNavigator();

const DashboardNavigation = () => {

  const { totalUnread } = useUnread();

  const renderTabIcon = (iconSource, badgeCount = 0) => (
    <View>
      <Image source={iconSource} style={styles.notificationIcon} />
      {badgeCount > 0 && (
        <View style={styles.tabBadge}>
          <Text style={styles.tabBadgeText}/>
        </View>
      )}
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // height: 50,
          backgroundColor: Colors.white,
          paddingVertical: 10,
          paddingBottom: 20,
          elevation: 40,
          shadowColor: Colors.boxShadowLighterBlack,
          shadowOffset: { height: -10 },
          shadowOpacity: 0.1,
          shadowRadius: 40,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenTwo}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => renderTabIcon(Images.Home),
        }}
      />
      <Tab.Screen
        name="Story"
        component={PublicStoryScreen}
        options={{
          tabBarLabel: 'Story',
          tabBarIcon: () => renderTabIcon(Images.StarActive),
        }}
      />
      <Tab.Screen
        name="Topboard"
        component={TopboardNavigation}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: () => renderTabIcon(Images.DocumentIcon),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: () => renderTabIcon(Images.FeedBackIcon, totalUnread),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => renderTabIcon(Images.CouplesIcon),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigation;

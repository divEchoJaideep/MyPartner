import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { isIphoneX } from '../libs/Utils';
import { Colors } from '../theme';
import ReceivedRequest from '../screens/Inbox/ReceivedScreen';
import AcceptedRequest from '../screens/Inbox/AcceptedScreen';
import SentRequest from '../screens/Inbox/SentScreen';
// import DeleteRequest from '../screens/Inbox/DeleteScreen';

const TopTab = createMaterialTopTabNavigator();

const TopboardNavigation = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: { width: 130 },
        tabBarLabelStyle: { fontSize: 15, marginTop: 40 },
        tabBarScrollEnabled: true,
        tabBarStyle: {
          backgroundColor: Colors.white,
          height: isIphoneX() ? 110 : 92,
          paddingVertical: 10,
        },
      }}
    >
      <TopTab.Screen name="Received" component={ReceivedRequest} />
      <TopTab.Screen name="Accepted" component={AcceptedRequest} />
      <TopTab.Screen name="Sent" component={SentRequest} />
      {/* <TopTab.Screen name="Delete" component={DeleteRequest} /> */}
    </TopTab.Navigator>
  );
};

export default TopboardNavigation;

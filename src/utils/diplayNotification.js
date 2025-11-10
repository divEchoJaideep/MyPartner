import notifee, { AndroidImportance } from '@notifee/react-native';

export const displayNotification = async (titleKey, body) => {
  console.log('titleKey :',titleKey);
  
  const channelId = 'default';

  // recreate channel to be sure
  await notifee.createChannel({
    id: channelId,
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  const titleMapping = {
    new_message: 'New Message',
    express_interest: 'New Interest',
    reject_interest: 'Interest Rejected',
    accept_interest: 'Interest Accepted',
    add_to_favorites: 'Profile Liked',
    Remove_favorites: 'Profile Unliked',
  };

  const displayTitle = titleMapping[titleKey] || titleKey;

  if (!displayTitle || !body) {
    return;
  }

  await notifee.displayNotification({
    title: displayTitle,
    body,
    android: {
      channelId,
      pressAction: { id: 'default', launchActivity: 'default' },
    },
    data: { type: titleKey, displayTitle },
  });

};

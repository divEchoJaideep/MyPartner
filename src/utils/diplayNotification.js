import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

export const displayNotification = async (title, body, onPress) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  const titleMapping = [
  { title: 'new_message', displayTitle: 'New Message' },
  { title: 'express_interest', displayTitle: 'New Interest' },
  { title: 'reject_interest', displayTitle: 'Interest Rejected' },
  { title: 'accept_interest', displayTitle: 'Interest Accepted' },
  { title: 'add_to_favorites', displayTitle: 'Profile Liked' },
  { title: 'Remove_favorites', displayTitle: 'Profile Unliked' },
];


  const matched = titleMapping.find(item => item.title === title);
  const displayTitle = matched ? matched.displayTitle : title;

  await notifee.displayNotification({
    title: displayTitle,
    body,
    android: { channelId, pressAction: { id: 'default' } },
  });

  notifee.onForegroundEvent(({ type }) => {
    if (type === EventType.PRESS) {
      onPress?.();
    }
  });
};

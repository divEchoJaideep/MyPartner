import * as React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Container, Content, Header } from '../../components';
import styles from './Styles/ChatStyle';
import { Colors, Images } from '../../theme';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
  collection,
  getFirestore,
  onSnapshot,
  doc,
} from '@react-native-firebase/firestore';
import { setUnread } from '../../redux/reducers/unreadSlice';

function ChatScreen({ navigation }) {
  const userBasicInfo = useSelector(state => state.userDetails.userBasicInfo);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const [chats, setChats] = React.useState([]);
  const [userPhotos, setUserPhotos] = React.useState({});
  console.log('chats :',chats);
  
  const db = getFirestore();

  // Fetch all chat documents and filter by user ID
  const getStoredUser = React.useCallback(async () => {
    if (!userBasicInfo?.user_id) return;

    setLoading(true);

    const chatCollection = collection(db, 'chats');

    const unsubscribe = onSnapshot(
      chatCollection,
      snapshot => {
        let conversation = [];
        let totalUnread = 0;

        snapshot.forEach(docSnap => {
          const data = docSnap.data();
          const key = docSnap.id; // e.g., "93_94"

          // ✅ Filter chats that include current user
          if (!key.split('_').includes(String(userBasicInfo.user_id))) return;

          const unreadCounts = { ...(data.unreadCounts || {}) };
          const myUnread = unreadCounts[userBasicInfo.user_id] || 0;
          totalUnread += myUnread;

          conversation.push({ ...data, key, unreadCounts });
        });

        // Sort by updatedAt timestamp
        conversation.sort((a, b) => {
          const t1 = a.updatedAt?._seconds || 0;
          const t2 = b.updatedAt?._seconds || 0;
          return t2 - t1;
        });

        setChats(conversation);
        setLoading(false);
        dispatch(setUnread(totalUnread));
      },
      error => {
        console.error('Firestore chat fetch error:', error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [userBasicInfo, dispatch, db]);

  // Live user photo & name updates
  React.useEffect(() => {
    if (!userBasicInfo?.user_id || chats.length === 0) return;

    const unsubscribers = [];

    chats.forEach(chat => {
      // Get friend (other participant)
      const friend = chat.participants?.find(
        p => String(p.id) !== String(userBasicInfo.user_id)
      );

      if (!friend?.id || userPhotos[friend.id]) return;

      try {
        const userDocRef = doc(db, 'users', String(friend.id));
        const unsub = onSnapshot(userDocRef, docSnap => {
          if (docSnap && docSnap.exists()) {
            const data = docSnap.data();
            setUserPhotos(prev => ({
              ...prev,
              [friend.id]: {
                photo: data?.photo,
                name: data?.name,
              },
            }));
          }
        });

        unsubscribers.push(unsub);
      } catch (err) {
        console.log('Photo listener error:', err);
      }
    });

    return () => {
      unsubscribers.forEach(unsub => unsub && unsub());
    };
  }, [chats, userBasicInfo, db]);

  // Re-fetch when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      let unsubscribe;
      getStoredUser().then(unsub => (unsubscribe = unsub));
      return () => unsubscribe && unsubscribe();
    }, [getStoredUser])
  );

  const renderItem = ({ item }) => {
    const currentUserId = String(userBasicInfo?.user_id);

    // Friend (other participant)
    const friendData = item.participants?.find(p => String(p.id) !== currentUserId);
    const liveUser = friendData?.id ? userPhotos[friendData.id] : null;
    const unreadCount = item?.unreadCounts?.[currentUserId] || 0;

    const displayName =
      liveUser?.name ||
      (friendData?.name
        ? friendData.name.charAt(0).toUpperCase() + friendData.name.slice(1)
        : 'Unknown');

    const displayPhoto =
      liveUser?.photo || friendData?.photo || Images.UserImage;

    let lastMsgTime = '';
    if (item.updatedAt?._seconds) {
      const date = new Date(item.updatedAt._seconds * 1000);
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      lastMsgTime = `${hours}:${minutesStr} ${ampm}`;
    }

    return (
      <TouchableOpacity
        style={[styles.chatListLink, { justifyContent: 'space-between', width: '100%' }]}
        onPress={() =>
          navigation.navigate('chatDetails', {
            friend: {
              id: friendData?.id,
              name: displayName,
              photo: displayPhoto,
              interestID: friendData?.interestID,
            },
            conversationId: item?.key,
          })
        }
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={
              displayPhoto && typeof displayPhoto === 'string'
                ? { uri: `${displayPhoto}?v=${friendData?.id}` }
                : Images.UserImage
            }
            resizeMode="cover"
            style={styles.chatListUserImg}
          />
          <View style={styles.chatListLinkText}>
            <Text style={styles.chatListLinkNameText}>{displayName}</Text>
            <Text
              style={[
                styles.chatListLinkLastSeenText,
                { fontWeight: unreadCount > 0 ? 'bold' : 'normal' },
              ]}
              numberOfLines={1}
            >
              {item.lastMessage || 'No messages yet'}
            </Text>
          </View>
        </View>

        {unreadCount > 0 && (
          <View style={[styles.unreadDot, { position: 'absolute', right: 20, top: 20 }]}>
            <Text style={styles.unreadDotText}>{unreadCount}</Text>
          </View>
        )}

        <Text
          style={[
            styles.chatListLinkLastSeenText,
            {
              marginLeft: 5,
              fontSize: 12,
              color: '#999',
              position: 'absolute',
              bottom: 0,
              right: 20,
            },
          ]}
        >
          {lastMsgTime}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Chat"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.pink} />
        ) : chats.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>
            No conversations found
          </Text>
        ) : (
          <FlatList
            data={chats}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            bounces={false}
          />
        )}
      </Content>
    </Container>
  );
}

export default ChatScreen;

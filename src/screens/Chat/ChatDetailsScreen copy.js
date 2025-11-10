import React, { useState, useEffect, useCallback } from 'react';
import { Image, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Day, Send, isSameDay } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Container, Header } from '../../components';
import { Colors, Images } from '../../theme';
import styles from './Styles/ChatStyle';
import Toast from 'react-native-toast-message';
import { blockedUsers, blockedUsersUnblock, chatNotification, userBlockRequest } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatScreen({ route }) {
  const { friend, conversationId } = route.params || {};
  const navigation = useNavigation();

  const token = useSelector(state => state.auth.token);
  const userBasicInfo = useSelector(state => state.userDetails.userBasicInfo);

  const [currentUser, setCurrentUser] = useState({});
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState([]);
  const [blockedByMe, setBlockedByMe] = useState(false);
  const [blockedMe, setBlockedMe] = useState(false);
  const [blockedUsersList, setBlockedUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);

  const isChatBlocked = blockedByMe || blockedMe;

  console.log('isChatBlocked :', isChatBlocked);

  // 🔹 Normalize ID
  const normalizeId = id => String(id ?? '');

  // -------------------- RESET UNREAD COUNT --------------------
  const resetUnreadCount = useCallback(async (chatIdParam, userIdParam) => {
    if (!chatIdParam || !userIdParam) return;

    try {
      const chatRef = firestore().collection('chats').doc(chatIdParam);
      await firestore().runTransaction(async transaction => {
        const doc = await transaction.get(chatRef);
        if (!doc.exists) {
          console.log('⚠️ Chat doc not found — creating one');
          transaction.set(chatRef, {
            unreadCounts: { [String(userIdParam)]: 0 },
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
        } else {
          transaction.update(chatRef, {
            [`unreadCounts.${String(userIdParam)}`]: 0,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          });
        }
      });

      console.log(`✅ Unread count reset for user ${userIdParam} in chat ${chatIdParam}`);
    } catch (error) {
      console.log('🔥 Error resetting unread count:', error);
    }
  }, []);

  // -------------------- INIT CHAT --------------------
  const initChat = useCallback(async () => {
    if (!userBasicInfo || !friend) return;

    const ids = [normalizeId(userBasicInfo.user_id), normalizeId(friend.id)].sort();
    const id = conversationId ?? ids.join('_');
    setChatId(id);
    setCurrentUser(userBasicInfo);

    await resetUnreadCount(id, userBasicInfo.user_id);
  }, [conversationId, friend, userBasicInfo, resetUnreadCount]);

  // -------------------- ON FOCUS --------------------
  useFocusEffect(
    useCallback(() => {
      initChat();
    }, [initChat])
  );

  // -------------------- UNREAD RESET EFFECT --------------------
  useEffect(() => {
    if (!chatId || !currentUser?.user_id) return;
    resetUnreadCount(chatId, currentUser.user_id);
  }, [chatId, currentUser?.user_id, resetUnreadCount]);

  // -------------------- FETCH BLOCKED USERS --------------------
  const getBlockedUsers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('UserToken');
      const res = await blockedUsers(token);
      if (res?.result) setBlockedUsersList(res?.data || []);
    } catch (err) {
      console.log('API error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlockedUsers();
  }, []);

  // -------------------- UPDATE BLOCKED STATUS --------------------
  useEffect(() => {
    if (!blockedUsersList || !friend) return;
    setIsBlocked(blockedUsersList.some(user => normalizeId(user.user_id) === normalizeId(friend.id)));
  }, [blockedUsersList, friend]);

  useFocusEffect(
    useCallback(() => {
      if (isBlocked) handleBlock();
    }, [isBlocked])
  );

  // -------------------- FIRESTORE LISTENERS --------------------
  useEffect(() => {
    if (!chatId || !friend || !currentUser?.user_id) return;

    const chatRef = firestore().collection('chats').doc(chatId);

    // Listen to messages
    const unsubscribeMessages = chatRef
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const msgs = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt?.toDate() || new Date(),
            user: { _id: data.senderId, avatar: data.senderPhoto ?? '' },
          };
        });
        setMessages(msgs);
        resetUnreadCount(chatId, currentUser.user_id);
      });

    // Listen to block status
    const unsubscribeBlock = chatRef.onSnapshot(doc => {
      const data = doc.data() || {};

      const blockedByFirestore = data.blockedBy || [];
      console.log('blockedByFirestore :', blockedByFirestore);

      const blockedByMeAPI = blockedUsersList.some(u => normalizeId(u.user_id) === normalizeId(friend.id));
      console.log('blockedByMeAPI :', blockedByMeAPI);

      const blockedByMeFirestore = blockedByFirestore.includes(currentUser.user_id);
      console.log('blockedByMeFirestore :', blockedByMeFirestore);

      setBlockedByMe(blockedByMeAPI || blockedByMeFirestore);

      const blockedMeAPI = blockedUsersList.some(u => normalizeId(u.user_id) === normalizeId(currentUser.user_id));
      console.log('blockedMeAPI2 :', blockedMeAPI);

      const blockedMeFirestore = blockedByFirestore.includes(friend.id);
      console.log('blockedMeFirestore2 :', blockedMeFirestore);

      setBlockedMe(blockedMeAPI || blockedMeFirestore);
    });

    return () => {
      unsubscribeMessages();
      unsubscribeBlock();
    };
  }, [chatId, currentUser?.user_id, friend?.id, blockedUsersList, resetUnreadCount]);

  // -------------------- BLOCK / UNBLOCK --------------------
  const handleBlock = async () => {
    if (!chatId || !currentUser?.user_id) return;
    const chatRef = firestore().collection('chats').doc(chatId);

    await chatRef.set(
      {
        blockedBy: firestore.FieldValue.arrayUnion(currentUser.user_id),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    const isBlocked = blockedUsersList?.some(
      user => user.user_id === friend?.id
    );

    if (!isBlocked) {
      handleBlockApi();
    } else {
      console.log('⚠️ User not found in blocked list, skipping unblock API.');
    }

  };

  const handleBlockApi = async () => {
    const data = { user_id: friend?.id };
    try {
      const token = await AsyncStorage.getItem('UserToken');
      const response = await userBlockRequest(data, token);
      if (response?.success) {
        Toast.show({ type: 'success', text1: 'User Blocked', text2: response.message || 'Blocked successfully.' });
      }
    } catch (err) {
      console.log('Block API error:', err);
    }
  };

  const handleUnblock = async () => {
    if (!chatId || !currentUser?.user_id) return;
    const chatRef = firestore().collection('chats').doc(chatId);

    await chatRef.set(
      {
        blockedBy: firestore.FieldValue.arrayRemove(currentUser.user_id),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    const isBlocked = blockedUsersList?.some(
      user => user.user_id === friend?.id
    );

    if (isBlocked) {
      handleUnblockApi(friend?.id);
    } else {
      console.log('⚠️ User not found in blocked list, skipping unblock API.');
    }
  };

  const handleUnblockApi = async user_id => {
    const data = {
      user_id: friend?.id
    }
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('UserToken');
      const res = await blockedUsersUnblock(data, token);

      if (res?.success) {
        Toast.show({ type: 'success', text1: 'Success', text2: res?.message || 'User unblocked successfully' });
        getBlockedUsers();
      } else {
        Toast.show({ type: 'error', text1: 'Error', text2: res?.message || 'Failed to unblock' });
      }
    } finally {
      setLoading(false);
    }
  };

  // -------------------- UPDATE PARTICIPANT INFO --------------------
  const updateParticipantInfo = async (chatId, currentUser, friend) => {
    console.log('updateParticipantInfo running');

    if (!chatId || !currentUser?.user_id || !friend?.id) return;

    const chatRef = firestore().collection('chats').doc(chatId);
    const docSnap = await chatRef.get();
    if (!docSnap.exists) return;

    const data = docSnap.data() || {};
    let participants = data.participants || [];
    console.log('participants :', participants);

    const userExists = participants.some(
      p => String(p.id) === String(currentUser.user_id)
    );
    const friendExists = participants.some(
      p => String(p.id) === String(friend.id)
    );

    if (!userExists) {
      participants.push({
        id: String(currentUser.user_id),
        name: currentUser.first_name ?? '',
        photo: currentUser.photo ?? '',
      });
    }

    if (!friendExists) {
      participants.push({
        id: String(friend.id),
        name: friend.name ?? '',
        photo: friend.photo ?? '',
        interestID: friend?.interestID ?? '',
      });
    }

    await chatRef.update({ participants });
    console.log('✅ Participant info updated');
  };


  // -------------------- SEND MESSAGE --------------------
  const blockedDetails = {
    blockedStatus: isBlocked ? 1 : 0,
    blockedState: isBlocked ? 'Blocked' : 'Unblocked',
    blockedBy: isBlocked ? blockedByMe : '',
    blockedMe: isBlocked ? blockedMe : '',
  };

  const onSend = useCallback(
    async newMessages => {
      if (!newMessages.length || !currentUser?.user_id || !chatId) return;

      const msg = newMessages[0];
      const currentUserId = String(currentUser.user_id);
      const friendId = String(friend.id);
      const chatRef = firestore().collection('chats').doc(chatId);

      try {
        await firestore().runTransaction(async transaction => {
          const chatDoc = await transaction.get(chatRef);

          // ✅ If chat doesn’t exist, create it inside the same transaction
          if (!chatDoc.exists) {
            transaction.set(chatRef, {
              participants: [
                {
                  id: currentUserId,
                  name: currentUser.first_name ?? '',
                  photo: currentUser.photo ?? '',
                },
                {
                  id: friendId,
                  name: friend.name ?? '',
                  photo: friend.photo ?? '',
                  interestID: friend?.interestID ?? '',
                },
              ],
              participantIds: [currentUserId, friendId],
              unreadCounts: { [currentUserId]: 0, [friendId]: 1 },
              lastMessage: msg.text,
              createdAt: firestore.FieldValue.serverTimestamp(),
              updatedAt: firestore.FieldValue.serverTimestamp(),
              blocked: {
                blockedState: 'Unblocked',
                blockedBy: '',
                blockedMe: '',
                blockedStatus: 0,
              },

            });
          }

          // ✅ Add message to subcollection
          const msgRef = chatRef.collection('messages').doc();
          transaction.set(msgRef, {
            text: msg.text,
            senderId: currentUserId,
            senderPhoto: currentUser.photo ?? '',
            createdAt: firestore.FieldValue.serverTimestamp(),
          });

          transaction.set(
            chatRef,
            {
              lastMessage: msg.text,
              updatedAt: firestore.FieldValue.serverTimestamp(),
              unreadCounts: {
                [String(currentUserId)]: 0,
                [String(friendId)]: firestore.FieldValue.increment(1),
              },
            },
            { merge: true }
          );


        });

        console.log('✅ Message sent successfully');

        // ✅ Ensure participants info is synced after transaction
        await updateParticipantInfo(chatId, currentUser, friend);

        // ✅ Send chat notification
        chatNotification({ user_id: friend.id }, token).catch(console.log);
      } catch (error) {
        console.log('🔥 Message send failed:', error);
      }
    },
    [chatId, currentUser, friend, token]
  );


  // -------------------- UI --------------------
  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: { backgroundColor: Colors.white, borderColor: Colors.lightGray, borderWidth: 1 },
        right: { backgroundColor: Colors.pink, borderWidth: 1, borderColor: Colors.pink },
      }}
      textStyle={{ left: { color: Colors.black }, right: { color: Colors.white } }}
    />
  );

  const renderSend = props => (
    <Send {...props} containerStyle={styles.chatSendBtnContainer}>
      <Image style={styles.chatSendBtnImg} source={Images.ChatSendBtn} resizeMode="contain" />
    </Send>
  );

  const renderInputToolbar = props => {
    if (isChatBlocked) {
      const messageText = blockedByMe ? '🚫 You have blocked this user' : '🚫 You are blocked by this user';
      return (
        <View style={[styles.blockedContainer, { marginVertical: 20 }]}>
          <Text style={styles.blockedText}>{messageText}</Text>
          {blockedByMe && (
            <TouchableOpacity style={styles.unblockBtn} onPress={handleUnblock}>
              <Text style={styles.unblockText}>Unblock</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return <InputToolbar {...props} containerStyle={styles.chatInputContainerStyle} />;
  };

  const renderDay = props =>
    props.currentMessage?.createdAt && !isSameDay(props.currentMessage, props.previousMessage) ? (
      <Day {...props} textStyle={styles.dateTextStyle} containerStyle={styles.dateTextContainerStyle} />
    ) : null;

  return (
    <Container style={styles.container}>
      <Header
        transparent
        hasMoreBTN
        hasBackBtn
        title={friend?.name ? friend.name.charAt(0).toUpperCase() + friend.name.slice(1) : ''}
        onBackPress={() => navigation.goBack()}
        onMoreBTN={() => setIsBlockModalVisible(true)}
      />

      <View style={styles.chatContainer}>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.pink} />
        ) : (
          <GiftedChat
            messages={messages}
            user={{ _id: String(currentUser.user_id) }}
            onSend={onSend}
            scrollToBottom
            alwaysShowSend
            renderBubble={renderBubble}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
            renderDay={renderDay}
          />
        )}
      </View>

      {isBlockModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Chat Options</Text>

            {blockedByMe ? (
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  handleUnblock();
                  setIsBlockModalVisible(false);
                }}
              >
                <Text style={styles.modalBtnText}>Unblock {friend?.name}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  handleBlock();
                  setIsBlockModalVisible(false);
                }}
              >
                <Text style={styles.modalBtnText}>Block {friend?.name}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => navigation.navigate('ProfileData', { userId: friend?.id })}
            >
              <Text style={styles.modalBtnText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setIsBlockModalVisible(false)}>
              <Text style={[styles.modalBtnText, { color: Colors.red }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Container>
  );
}

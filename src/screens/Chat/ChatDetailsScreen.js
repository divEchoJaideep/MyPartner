import React, { useState, useEffect, useCallback } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
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

  const initChat = useCallback(async () => {
    if (!userBasicInfo || !friend) return;

    const ids = [String(userBasicInfo.user_id), String(friend.id)].sort();
    const id = conversationId ?? ids.join('_');

    setChatId(id);
    setCurrentUser(userBasicInfo);

    await resetUnreadCount(id, userBasicInfo.user_id);
  }, [conversationId, friend, userBasicInfo]);

  const resetUnreadCount = useCallback(async (chatIdParam, userIdParam) => {
    if (!chatIdParam || !userIdParam) return;
    try {
      const chatRef = firestore().collection('chats').doc(chatIdParam);
      await chatRef.set({ [`unreadCounts.${userIdParam}`]: 0 }, { merge: true });
    } catch (err) {
      console.log('Error resetting unread count:', err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      initChat();
    }, [initChat])
  );

  const getBlockedUsers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("UserToken");
      const res = await blockedUsers(token);
      if (res?.result) {
        setBlockedUsersList(res?.data || []);
      }
    } catch (err) {
      console.log("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlockedUsers();
  }, []);

  useEffect(() => {
    if (!blockedUsersList || !friend) return;
    const blocked = blockedUsersList.some(user => String(user.user_id) === String(friend?.id));
    if (blocked) setIsBlocked(true);
  }, [blockedUsersList, friend]);

  useFocusEffect(
    useCallback(() => {
      if (!isBlocked) return;
      handleBlock();
    }, [isBlocked])
  );

  useEffect(() => {
    if (!chatId || !friend || !currentUser?.user_id) return;

    const chatRef = firestore().collection('chats').doc(chatId);

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

    const unsubscribeBlock = chatRef.onSnapshot(doc => {
      const data = doc.data() || {};
      const blockedByFirestore = data.blockedBy || [];

      const blockedByMeAPI = blockedUsersList.some(u => String(u.user_id) === String(friend.id));
      const blockedByMeFirestore = blockedByFirestore.includes(currentUser.user_id);
      setBlockedByMe(blockedByMeAPI || blockedByMeFirestore);

      const blockedMeAPI = blockedUsersList.some(u => String(u.user_id) === String(currentUser.user_id));
      const blockedMeFirestore = blockedByFirestore.includes(friend.id);
      setBlockedMe(blockedMeAPI || blockedMeFirestore);
    });

    return () => {
      unsubscribeMessages();
      unsubscribeBlock();
    };
  }, [chatId, currentUser?.user_id, friend?.id, blockedUsersList, resetUnreadCount]);

  const handleBlock = async () => {
    if (!chatId || !currentUser?.user_id) return;
    const chatRef = firestore().collection('chats').doc(chatId);
    await chatRef.set({
      blockedBy: firestore.FieldValue.arrayUnion(currentUser.user_id),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    handleBlockApi();
  };

  const handleBlockApi = async () => {
    const data = { user_id: friend?.id };
    try {
      const token = await AsyncStorage.getItem('UserToken');
      const response = await userBlockRequest(data, token);
      if (response?.success) {
        Toast.show({ type: 'success', text1: 'User Blocked', text2: response.message || 'Blocked successfully.' });
      } else {
        // Toast.show({ type: 'error', text1: 'Error', text2: response?.message || 'Failed to block user.' });
      }
    } catch {
      // Toast.show({ type: 'error', text1: 'Error', text2: 'Something went wrong.' });
    }
  };

  const handleUnblock = async () => {
    if (!chatId || !currentUser?.user_id) return;
    const chatRef = firestore().collection('chats').doc(chatId);
    await chatRef.set({
      blockedBy: firestore.FieldValue.arrayRemove(currentUser.user_id),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    handleUnblockApi({ user_id: friend?.id });
  };

  const handleUnblockApi = async (user_id) => {
    const data = { user_id };
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("UserToken");
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

  const updateParticipantInfo = async () => {
    if (!chatId || !currentUser?.user_id) return;
    const chatRef = firestore().collection('chats').doc(chatId);
    const docSnap = await chatRef.get();
    if (!docSnap.exists) return;

    const data = docSnap.data();
    const participants = data.participants || [];

    const updatedParticipants = participants.map(p =>
      p.id === currentUser.user_id
        ? { ...p, name: currentUser.first_name ?? '', photo: currentUser.photo ?? '' }
        : p
    );

    await chatRef.update({ participants: updatedParticipants });
  };

  const blockedDetails = {
    blockedStatus: isBlocked ? 1 : 0,
    blockedState: isBlocked ? 'Blocked' : 'Unblocked',
    blockedBy: isBlocked ? blockedByMe : '',
    blockedMe: isBlocked ? blockedMe : '',
  };

  const onSend = useCallback(async (newMessages) => {
    if (!newMessages.length || !currentUser?.user_id || !chatId) return;

    const msg = newMessages[0];
    const chatRef = firestore().collection('chats').doc(chatId);

    try {
      const docSnap = await chatRef.get();
      if (!docSnap.exists) {
        await chatRef.set({
          participants: [
            { id: currentUser.user_id, name: currentUser.first_name ?? '', photo: currentUser.photo ?? '' },
            { id: friend.id, name: friend.name ?? '', photo: friend.photo ?? '', interestID: friend?.interestID },
          ],
         participantIds: [String(currentUser.user_id), String(friend.id)],

          createdAt: firestore.FieldValue.serverTimestamp(),
          blocked: blockedDetails,
          unreadCounts: {
            [currentUser.user_id]: 0,
            [friend.id]: 0
          },
        });
      } else {
        await updateParticipantInfo(); 
      }

      await chatRef.collection('messages').add({
        text: msg.text,
        senderId: currentUser.user_id,
        senderPhoto: currentUser.photo ?? '',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      await chatRef.update({
        lastMessage: msg.text,
        updatedAt: firestore.FieldValue.serverTimestamp(),
        blocked: blockedDetails,
        [`unreadCounts.${friend.id}`]: firestore.FieldValue.increment(1),
      });

      chatNotification({ user_id: friend.id }, token).catch(err => console.log(err));
    } catch (error) {
      console.log('Message send failed:', error);
    }
  }, [chatId, currentUser, friend, token, blockedDetails]);

  // ---------------- RENDER ----------------
  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: { backgroundColor: Colors.white, borderColor: Colors.lightGray, borderWidth: 1, borderTopStartRadius: 12, borderTopEndRadius: 12, borderBottomStartRadius: 0, borderBottomEndRadius: 12 },
        right: { backgroundColor: Colors.pink, borderTopStartRadius: 12, borderTopEndRadius: 12, borderBottomStartRadius: 12, borderBottomEndRadius: 0, borderWidth: 1, borderColor: Colors.pink },
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
    return <View style={styles.chatInputContainer}><InputToolbar {...props} containerStyle={styles.chatInputContainerStyle} /></View>;
  };

  const renderDay = props =>
    props.currentMessage?.createdAt &&
    !isSameDay(props.currentMessage, props.previousMessage) && (
      <Day {...props} textStyle={styles.dateTextStyle} containerStyle={styles.dateTextContainerStyle} />
    );

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
        <GiftedChat
          messages={messages}
          user={{ _id: currentUser.user_id }}
          onSend={onSend}
          scrollToBottom
          alwaysShowSend
          renderBubble={renderBubble}
          renderSend={renderSend}
          renderInputToolbar={renderInputToolbar}
          renderDay={renderDay}
        />
      </View>

      {isBlockModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Chat Options</Text>
            {blockedByMe ? (
              <TouchableOpacity style={styles.modalBtn} onPress={() => { handleUnblock(); setIsBlockModalVisible(false); }}>
                <Text style={styles.modalBtnText}>Unblock {friend?.name}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.modalBtn} onPress={() => { handleBlock(); setIsBlockModalVisible(false); }}>
                <Text style={styles.modalBtnText}>Block {friend?.name}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.modalBtn} onPress={() => navigation.navigate('ProfileData', { userId: friend?.id })}>
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

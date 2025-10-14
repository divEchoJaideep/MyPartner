import React, { createContext, useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const UnreadContext = createContext({ totalUnread: 0 });

export const UnreadProvider = ({ children }) => {
  const userBasicInfo = useSelector(state => state.userDetails.userBasicInfo);
  const [totalUnread, setTotalUnread] = useState(0);

  useEffect(() => {
    if (!userBasicInfo?.user_id) return;

    const q = firestore()
      .collection('chats')
      .where('participantIds', 'array-contains', userBasicInfo.user_id);

    const unsubscribe = q.onSnapshot(snapshot => {
      let unread = 0;

      snapshot.forEach(doc => {
        const data = doc.data();
        const unreadCounts = data.unreadCounts || {};
        unread += unreadCounts[userBasicInfo.user_id] || 0;
      });

      setTotalUnread(unread);
    }, err => console.log('Firestore snapshot error:', err));

    return () => unsubscribe();
  }, [userBasicInfo]);

  return (
    <UnreadContext.Provider value={{ totalUnread }}>
      {children}
    </UnreadContext.Provider>
  );
};

export const useUnread = () => useContext(UnreadContext);

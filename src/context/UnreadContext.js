import React, { createContext, useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const UnreadContext = createContext({ totalUnread: 0 });

export const UnreadProvider = ({ children }) => {
  const userBasicInfo = useSelector(state => state.userDetails.userBasicInfo);
  const [totalUnread, setTotalUnread] = useState(0);
console.log('totalUnread :',totalUnread);

useEffect(() => {
  if (!userBasicInfo?.user_id) return;

  const userId = String(userBasicInfo.user_id);

  const unsubscribe = firestore()
    .collection('chats')
    .onSnapshot(snapshot => {
      let unread = 0;

      snapshot.forEach(doc => {
        const data = doc.data();
        const docId = doc.id; 
        if (!docId.split('_').includes(userId)) return;

        const unreadCounts = data.unreadCounts || {};
        unread += unreadCounts[userId] || 0;
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

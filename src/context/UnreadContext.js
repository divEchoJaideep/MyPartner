import React, { createContext, useState, useEffect, useContext } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const UnreadContext = createContext({ totalUnread: 0 });

export const UnreadProvider = ({ children }) => {
  const userBasicInfo = useSelector(state => state.userDetails.userBasicInfo);
  const [totalUnread, setTotalUnread] = useState(0);

  useEffect(() => {
    if (!userBasicInfo || !userBasicInfo.user_id) return; 

    const db = getFirestore();
    const q = query(
      collection(db, 'chats'),
      where('participantIds', 'array-contains', userBasicInfo.user_id)
    );

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        let unread = 0;

        snapshot.forEach(doc => {
          const data = doc.data();
          const unreadCounts = { ...(data.unreadCounts || {}) };

          // handle both nested unreadCounts or flat keys
          Object.keys(data).forEach(k => {
            if (k.startsWith('unreadCounts.')) {
              const userId = k.split('.')[1];
              unreadCounts[userId] = data[k];
            }
          });

          unread += unreadCounts[userBasicInfo.user_id] || 0;
        });

        setTotalUnread(unread);
      },
      err => {
        console.log('Firestore snapshot error:', err);
      }
    );

    return () => unsubscribe();
  }, [userBasicInfo]);

  return (
    <UnreadContext.Provider value={{ totalUnread }}>
      {children}
    </UnreadContext.Provider>
  );
};

export const useUnread = () => useContext(UnreadContext);

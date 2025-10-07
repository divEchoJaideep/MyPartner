import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collection, query, where, getFirestore, onSnapshot } from '@react-native-firebase/firestore';
import { setUnread } from '../reducers/unreadSlice';

export default function UnreadListener() {
  const dispatch = useDispatch();
  const userBasicInfo = useSelector(state => state.userDetails.userBasicInfo);

  useEffect(() => {
    if (!userBasicInfo) return;

    const db = getFirestore();
    const q = query(
      collection(db, 'chats'),
      where('participantIds', 'array-contains', userBasicInfo.user_id)
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      let totalUnread = 0;

      snapshot.forEach(doc => {
        const data = doc.data();
        const unreadCounts = { ...(data.unreadCounts || {}) };

        Object.keys(data).forEach(k => {
          if (k.startsWith('unreadCounts.')) {
            const userId = k.split('.')[1];
            unreadCounts[userId] = data[k];
          }
        });

        totalUnread += unreadCounts[userBasicInfo.user_id] || 0;
      });

      dispatch(setUnread(totalUnread));
    });

    return () => unsubscribe();
  }, [userBasicInfo, dispatch]);

  return null;
}

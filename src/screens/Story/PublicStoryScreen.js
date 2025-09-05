import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import styles from './Styles/Styles';
import GetMyStatus from '../../api/GetMyStatus'; 
import GetFriendStory from '../../api/GetfriendStory';
import { getUsFriendStory } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const PublicStoryScreen = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.user.access_token);
  const [storyList, setStoryList] = useState([]);
  const [loading, setLoading] = useState(true);

 useFocusEffect(
  useCallback(() => {
    fetchStories();
  }, [])
);


const fetchStories = async () => {
  setLoading(true);

  const token = await AsyncStorage.getItem('UserToken');
  const response = await getUsFriendStory(token );
   console.log('Friend Story API response:', response);

  if (response?.success && Array.isArray(response.data)) {
    setStoryList(response.data);
  } else {
    // console.log('Error loading friend stories:', response.message);
  }

  setLoading(false);
};

  const renderItem = ({ item }) => {
  const firstStatus = item.statuses?.[0]; // pehla status lo (agar hai)
  if (!firstStatus) return null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('StoryViewerScreen', {
          storyList: item.statuses.map(status => ({
            image: status.image_url,
            time: status.created_at,
          })),
          user: { name: item.name },
        })
      }
    >
      <Image
        source={{ uri: firstStatus.image_url }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>
          {new Date(firstStatus.created_at).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

  return (
    <View style={[styles.container, { paddingTop: 20, paddingHorizontal: 20 }]}>
      <Text style={styles.heading}>My Status</Text>

      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : storyList.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No status found.</Text>
      ) : (
        <FlatList
          data={storyList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default PublicStoryScreen;

import React, { useCallback, useState } from 'react';
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
import { getUsFriendStory } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header } from '../../components';
import { Images } from '../../theme';

const { width } = Dimensions.get('window');

const PublicStoryScreen = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [storyList, setStoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('storyList :', storyList);

  useFocusEffect(
    useCallback(() => {
      fetchAllStories();
    }, [])
  );

  const fetchAllStories = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('UserToken');
      const friendResponse = await getUsFriendStory(token);
      const myResponse = await GetMyStatus(token);

      let friendStories = [];
      let myStories = [];

      if (friendResponse?.success && Array.isArray(friendResponse.data)) {
        friendStories = friendResponse.data;
      }
      if (myResponse?.success && Array.isArray(myResponse.data) && myResponse.data.length > 0) {
        myStories = [
          {
            id: myResponse.data[0].user_id,
            name: 'My Status',
            isMyStatus: true,
            statuses: myResponse.data.map(story => ({
              id: story.id,
              image_url: story.image_url,
              created_at: story.created_at,
            })),
          },
        ];
      }
      const combinedStories = [...myStories, ...friendStories];

      setStoryList(combinedStories);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };


  const renderItem = ({ item }) => {
    const firstStatus = item.statuses?.[0];
    if (!firstStatus) return null;
    console.log('firstStatus :', firstStatus);

    return (
      <TouchableOpacity
        style={[
          styles.card,
          // item.isMyStatus && { borderColor: '#007bff', borderWidth: 1.5 },
        ]}
        onPress={() =>
          navigation.navigate('StoryViewerScreen', {
            storyList: item.statuses.map(status => ({
                id: status.id,
              image: status.image_url,
              time: status.created_at,
            })),
            user: { name: item.isMyStatus ? 'My Status' : item.name },
          })
        }
      >
        <Image source={{ uri: firstStatus.image_url }} style={styles.avatar} />
        <View style={styles.info}>
          <View>
            <Text style={[styles.name,
              // item.isMyStatus && { color: '#007bff' }
            ]}>
              {item.isMyStatus ? 'My Status' : item.name}
            </Text>
            <Text style={styles.time}>
              {new Date(firstStatus.created_at)
                .toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })
                .replace('am', 'AM')
                .replace('pm', 'PM')}

            </Text>
          </View>
          {item.isMyStatus && (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('StoryBoard')}>
                <Image source={Images.AddIcon} style={styles.icon} />
              </TouchableOpacity>
            </View>
          )}

        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={[styles.container, { paddingTop: 20,  }]}>
      <Header
        transparent
        hasBackBtn
        title="Status"
        onBackPress={() => navigation.goBack()}
      />
      {loading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <FlatList
          data={storyList}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#aaa' }}>
              No status found.
            </Text>
          }
        />
      )}
    </Container>
  );
};

export default PublicStoryScreen;

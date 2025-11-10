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
  const [myStory, setMyStory] = useState(null); // 👈 separate my status

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
      let myStories = null;

      if (friendResponse?.success && Array.isArray(friendResponse.data)) {
        // Filter out empty statuses
        friendStories = friendResponse.data.filter(
          f => Array.isArray(f.statuses) && f.statuses.length > 0
        );
      }

      if (
        myResponse?.success &&
        Array.isArray(myResponse.data) &&
        myResponse.data.length > 0
      ) {
        myStories = {
          id: myResponse.data[0].user_id,
          name: 'My Status',
          isMyStatus: true,
          statuses: myResponse.data.map(story => ({
            id: story.id,
            image_url: story.image_url,
            created_at: story.created_at,
          })),
        };
      }

      setMyStory(myStories);
      setStoryList(friendStories);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const firstStatus = item.statuses?.[0];
    if (!firstStatus) return null;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('StoryViewerScreen', {
            storyList: item.statuses.map(status => ({
              id: status.id,
              image: status.image_url,
              time: status.created_at,
            })),
            user: { name: item.isMyStatus ? 'My Status' : item.name },
          })
        }>
        <Image source={{ uri: firstStatus.image_url }} style={styles.avatar} />
        <View style={styles.info}>
          <View>
            <Text style={styles.name}>
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
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={[styles.container, { paddingTop: 20 }]}>
      <Header
        transparent
        hasBackBtn
        title="Status"
        onBackPress={() => navigation.goBack()}
      />

      {loading ? (
        <ActivityIndicator size="small" color="black" />
      ) : !myStory && storyList.length === 0 ? (
        <View>
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#aaa' }}>
            No status found.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('StoryBoard')}
            style={[styles.card, styles.cardBTN]}>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 0,
                marginRight: 20,
                color: '#fff',
              }}>
              Add Status
            </Text>
            <Image
              source={Images.AddIcon}
              style={styles.icon}
              tintColor={'#fff'}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              {/* 🧍 My Status Section */}
              {myStory && (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('StoryViewerScreen', {
                      storyList: myStory.statuses.map(status => ({
                        id: status.id,
                        image: status.image_url,
                        time: status.created_at,
                      })),
                      user: { name: 'My Status' },
                    })
                  }>
                  <Image
                    source={{ uri: myStory.statuses?.[0]?.image_url }}
                    style={styles.avatar}
                  />
                  <View style={styles.info}>
                    <View>
                      <Text style={styles.name}>My Status</Text>
                      <Text style={styles.time}>
                        {new Date(
                          myStory.statuses?.[0]?.created_at
                        ).toLocaleTimeString([], {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('StoryBoard')}>
                      <Image source={Images.AddIcon} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}

              {storyList.length > 0 && (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#444',
                    marginTop: 10,
                    marginBottom: 8,
                    marginLeft: 10,
                  }}>
                  Friend Stories
                </Text>
              )}
            </>
          }
          data={storyList}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

export default PublicStoryScreen;

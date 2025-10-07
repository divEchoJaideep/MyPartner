import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';
import styles from './Styles/Styles';
import { Header } from '../../components';

const { width, height } = Dimensions.get('window');

const StoryViewerScreen = ({ route, navigation }) => {
  const { storyList, user } = route.params; 
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
console.log('storyList :',storyList);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < storyList.length - 1) {
        setCurrentIndex(prev => prev + 1);
        flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      } else {
        clearInterval(timer);
        navigation.goBack();
      }
    }, 4000); 

    return () => clearInterval(timer);
  }, [currentIndex]);

  const renderItem = ({ item }) => {
  const dateObj = new Date(item.time);
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${hours}:${minutesStr} ${ampm}`;

  return (
    <TouchableWithoutFeedback onPress={goToNext}>
      <View style={styles.userStoryContainer}>
        <Image source={{ uri: item.image }} style={styles.storyImage} />
        <View style={styles.overlay}>
          <Text style={styles.userStoryName}>{user?.name || 'User'}</Text>
          <Text style={styles.userStorytime}>{formattedTime}</Text> 
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};


  const goToNext = () => {
    if (currentIndex < storyList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
   <Header
           transparent
           absolute 
          // title={}
           hasBackBtn
           style={{ marginTop: 10 }}
           onBackPress={() => navigation.goBack()}
         />
    <FlatList
      ref={flatListRef}
      data={storyList}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      pagingEnabled
      scrollEnabled={true} 
      showsHorizontalScrollIndicator={false}
      extraData={currentIndex}
    />
    </>
  );
};

export default StoryViewerScreen;

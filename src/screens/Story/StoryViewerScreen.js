import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Header } from '../../components';

const { width, height } = Dimensions.get('window');

const StoryViewerScreen = ({ route, navigation }) => {
  const { storyList, user } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const progress = useRef(new Animated.Value(0)).current;
  const durationPerStory = 10 * 1000; 
  useEffect(() => {
    animateProgress();
  }, [currentIndex]);

  const animateProgress = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: durationPerStory,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) goToNext();
    });
  };

  const goToNext = () => {
    if (currentIndex < storyList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.goBack();
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    } else {
      navigation.goBack();
    }
  };

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
        <View style={styles.storyContainer}>
          <Image source={{ uri: item.image }} style={styles.storyImage} />
          <View style={styles.overlay}>
            <View style={styles.progressContainer}>
              {storyList.map((_, index) => {
                const widthAnim = progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, width / storyList.length],
                });
                return (
                  <View key={index} style={styles.progressBackground}>
                    {index === currentIndex ? (
                      <Animated.View style={[styles.progressBar, { width: widthAnim }]} />
                    ) : index < currentIndex ? (
                      <View style={[styles.progressBar, { width: width / storyList.length }]} />
                    ) : null}
                  </View>
                );
              })}
            </View>

            <View style={styles.headerRow}>
              <Text style={styles.userStoryName}>{user?.name || 'User'}</Text>
              <Text style={styles.userStorytime}>{formattedTime}</Text>
            </View>
          </View>

          <View style={styles.touchZoneContainer}>
            <TouchableWithoutFeedback onPress={goToPrevious}>
              <View style={styles.touchZoneLeft} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={goToNext}>
              <View style={styles.touchZoneRight} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <>
      <Header
        transparent
        absolute
        hasBackBtn
        onBackPress={() => navigation.goBack()}
      />
      <FlatList
        ref={flatListRef}
        data={storyList}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        extraData={currentIndex}
      />
    </>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    width,
    height,
    backgroundColor: '#000',
  },
  storyImage: {
    width,
    height,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressBackground: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: 3,
    backgroundColor: '#fff',
  },
  headerRow: {
    // flexDirection: 'row',
    marginLeft: 20,
    marginTop:30,
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  userStoryName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userStorytime: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  touchZoneContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width,
    flexDirection: 'row',
  },
  touchZoneLeft: {
    flex: 1,
  },
  touchZoneRight: {
    flex: 1,
  },
});

export default StoryViewerScreen;

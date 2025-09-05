import * as React from 'react';
import {useState} from 'react';
import {TouchableOpacity, Text, View, Image, FlatList} from 'react-native';
import {facilitiesCounterList} from '../../assets/data';
import styles from './Styles/Index';

function CounterList() {
  const [badRoomCount, setBadRoomCount] = useState(0);
  const [bathRoomCount, setBathRoomCount] = useState(0);

  const handleIncrementBedRoom = () => {
    setBadRoomCount(prevCount => prevCount + 1);
  };

  const handleDecrementBedRoom = () => {
    if (badRoomCount <= 0) {
      setBadRoomCount(0);
    } else if (badRoomCount >= 0) {
      setBadRoomCount(prevCount => prevCount - 1);
    }
  };

  const handleIncrementBathRoom = () => {
    setBathRoomCount(prevCount => prevCount + 1);
  };

  const handleDecrementBathRoom = () => {
    if (bathRoomCount <= 0) {
      setBathRoomCount(0);
    } else if (bathRoomCount >= 0) {
      setBathRoomCount(prevCount => prevCount - 1);
    }
  };

  const renderItem = ({item, index}) => (
    <View style={styles.facilitiCounterRow}>
      <Text style={styles.facilitiCounterHeading}>{item.text}</Text>
      <View style={styles.facilitiCounterBtnsTextRow}>
        <TouchableOpacity
          onPress={() => {
            if (index === 0) {
              handleDecrementBedRoom();
            }
            if (index === 1) {
              handleDecrementBathRoom();
            }
          }}>
          <Image
            source={item.minasImage}
            resizeMode="contain"
            style={styles.facilitiCounterPluseMinsaIcon}
          />
        </TouchableOpacity>
        <Text style={styles.facilitiCounterText}>
          {index === 0 ? badRoomCount : bathRoomCount}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (index === 0) {
              handleIncrementBedRoom();
            }
            if (index === 1) {
              handleIncrementBathRoom();
            }
          }}>
          <Image
            source={item.pluseImage}
            resizeMode="contain"
            style={styles.facilitiCounterPluseMinsaIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <>
      <View style={styles.facilitiCounterContainer}>
        <FlatList data={facilitiesCounterList} renderItem={renderItem} />
      </View>
    </>
  );
}

export default CounterList;

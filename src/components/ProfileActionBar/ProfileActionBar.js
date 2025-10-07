import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Images } from '../../theme';

const ProfileActionBar = ({ status = {}, onLike, onFavorite, onChat }) => {
  // dynamically create button array based on which buttons exist
  const buttons = [
    status.hasOwnProperty('like') ? {
      img: status.like ? Images.Like : Images.UnLike,
      onPress: onLike,
    } : null,
    status.hasOwnProperty('fave') ? {
      img: status.fave ? Images.Follow : Images.UnFollow,
      onPress: onFavorite,
    } : null,
    onChat ? {
      img:  Images.ChatBTN,
      onPress: onChat,
    } : null,
  ].filter(Boolean); // remove nulls

  return (
    <View style={[styles.container, { height: buttons.length * 50 + (buttons.length - 1) * 10 }]}>
      {buttons.map((btn, index) => (
        <View key={index} style={styles.btn}>
          <TouchableOpacity onPress={btn.onPress} style={styles.touchable}>
            <Image source={btn.img} style={styles.icon} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 5,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default ProfileActionBar;

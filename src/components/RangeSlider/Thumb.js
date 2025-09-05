import React from 'react';
import {View, Image} from 'react-native';
import {Images} from '../../theme';
import styles from './Styles/Index';

const Thumb = props => {
  return (
    <View style={styles.thumbContainer}>
      {/* <Image
        source={
          props.leftArrow ? Images.leftWhiteArrow : Images.rightWhiteArrow
        }
        style={styles.arrowImage}
        resizeMode="contain"
      /> */}
    </View>
  );
};

export default Thumb;

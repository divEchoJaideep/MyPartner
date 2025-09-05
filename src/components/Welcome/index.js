import * as React from 'react';
import {Text, Image} from 'react-native';
import styles from './Styles/index';

function Welcome(props) {
  return (
    <>
      <Text style={styles.welcomeScreenHeading}>{props.heading}</Text>
      <Text style={styles.welcomeScreenPeregraph}>{props.peregraph}</Text>
      <Image
        source={props.image}
        resizeMode="contain"
        style={[styles.welcomeScreenImages, props.welcomeSlideImgStyle]}
      />
    </>
  );
}

export default Welcome;

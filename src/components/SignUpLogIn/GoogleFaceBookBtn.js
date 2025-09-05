import * as React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import styles from './Styles/index';

function GoogleFaceBookBtn(props) {
  return (
    <>
      <TouchableOpacity style={styles.googleFaceBookBtn}>
        <Image
          source={props.btnImage}
          resizeMode="contain"
          style={props.googleImg ? styles.googleImg : styles.facebookImg}
        />
        <Text style={[styles.commanText, styles.googleFaceBookBtnText]}>
          {props.btnText}
        </Text>
      </TouchableOpacity>
    </>
  );
}

export default GoogleFaceBookBtn;

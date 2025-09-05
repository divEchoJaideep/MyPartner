import * as React from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';
import styles from './Styles/Index';

function CommanBtnScreen(props) {
  return (
    <TouchableOpacity
      style={[styles.commanBtn, props.commanBtnStyle]}
      onPress={() => {
        if (props.onBtnPress) {
          props.onBtnPress();
        }
      }}>
      {props.btnIcon ? (
        <View style={styles.imageTextContainer}>
          <Text style={[styles.commanBtnText, props.commanBtnTextStyle]}>
            {props.btnText}
          </Text>
          <Image
            source={props.btnIcon}
            resizeMode="contain"
            style={[styles.btnImageStyle, props.btnIconStyle]}
          />
        </View>
      ) : (
        <Text style={[styles.commanBtnText, props.commanBtnTextStyle]}>
          {props.btnText}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default CommanBtnScreen;

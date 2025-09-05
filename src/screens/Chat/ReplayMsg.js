import * as React from 'react';
import {View, Text} from 'react-native';
import styles from './Styles/ChatStyle';

function ReplayMsgScreen(props) {
  return (
    <View style={styles.msgBg}>
      <View style={styles.replayMsgBg}>
        <Text style={styles.replayMsgUserName}>You</Text>
        <Text style={styles.replayMsgUserText}>Can I come over?</Text>
      </View>
      <Text style={styles.messageText}>{props.msgText}</Text>
      <Text style={styles.messageTimeText}>16.46 PM</Text>
    </View>
  );
}

export default ReplayMsgScreen;

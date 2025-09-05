import * as React from 'react';
import {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './Styles/Index';

function CancellationPolicySwitch() {
  const [switchSet, setSwitchSet] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.cancellationPolicySwitchBtn}
        onPress={() => setSwitchSet(!switchSet)}>
        <View
          style={
            !switchSet
              ? styles.cancellationPolicySwitchLine
              : styles.cancellationPolicySwitchLineActive
          }
        />
        <View
          style={
            !switchSet
              ? styles.cancellationPolicySwitchRound
              : styles.cancellationPolicySwitchRoundActive
          }
        />
      </TouchableOpacity>
    </>
  );
}

export default CancellationPolicySwitch;

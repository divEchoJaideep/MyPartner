import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CommanHeading from '../CommanHeading';
import CancellationPolicySwitch from '../CancellationPolicySwitch';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/Index';

function CancellationPolicy({Switch, cancellationPolicyTextContentStyle}) {
  return (
    <>
      <View style={styles.cancellationPolicyHeadingRow}>
        <CommanHeading
          headingText
          heading="Cancellation Policy"
          commanHeadingContainerStyle={styles.cancellationPolicyHeading}
          navigation={navigate}
        />
        {Switch && <CancellationPolicySwitch />}
      </View>
      <View
        style={[
          styles.cancellationPolicyTextContent,
          cancellationPolicyTextContentStyle,
        ]}>
        <Text style={styles.cancellationPolicyText}>
          Cancel before 12:00 AM on Oct 15 and get a full refund, minus the
          first fee.
        </Text>
        <TouchableOpacity style={styles.cancellationPolicyMoreBtn}>
          <Text style={styles.cancellationPolicyMoreText}>Learn more</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default CancellationPolicy;

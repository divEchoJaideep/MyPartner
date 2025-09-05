import * as React from 'react';
import {View, Text} from 'react-native';
// import { Calendar } from 'react-native-calendars';
import CommanBtn from '../CommanBtn';
import CommanHeading from '../CommanHeading';
import Date from '../BookPage/Date';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/Index';

function DatePicker() {
  return (
    <>
      <CommanHeading
        headingText
        heading="Date"
        commanHeadingContainerStyle={styles.priceMonthHeadingStyle}
        navigation={navigate}
      />
      <View style={styles.datePickerContainer}>
        <View style={styles.checkInOutTextContent}>
          <View style={styles.checkInOutCol}>
            <Text style={styles.checkInOutText}>Check In</Text>
            <Text style={styles.checkInOutTimeText}>Thu 1 Jul 2021</Text>
          </View>
          <View style={styles.checkInOutCol}>
            <Text style={styles.checkInOutText}>Check Out</Text>
            <Text style={styles.checkInOutTimeText}>Sat 31 Jul 2021</Text>
          </View>
        </View>
        <Date />
        <CommanBtn btnText="Apply" commanBtnStyle={styles.dateApplyBtn} />
      </View>
    </>
  );
}

export default DatePicker;

import React from 'react';
import {Text, Image} from 'react-native';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';
import {Images} from '../../theme';
import styles from './Styles/index';

export default class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment(),
      displayedDate: moment(),
    };
  }

  setDates = dates => {
    this.setState({
      ...dates,
    });
  };

  render() {
    const {startDate, endDate, displayedDate} = this.state;
    return (
      <DateRangePicker
        range
        open
        backdropStyle={styles.backdropStyle}
        containerStyle={styles.containerStyle}
        dayHeaderStyle={styles.dayHeaderStyle}
        dayStyle={styles.dayStyle}
        selectedStyle={styles.selectedStyle}
        dayTextStyle={styles.dayTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
        headerTextStyle={styles.headerTextStyle}
        headerStyle={styles.headerStyle}
        dayHeaderTextStyle={styles.dayHeaderTextStyle}
        monthPrevButton={
          <Image
            source={Images.CalenderLeftArrow}
            resizeMode="contain"
            style={styles.calenderArrows}
          />
        }
        monthNextButton={
          <Image
            source={Images.CalenderRightArrow}
            resizeMode="contain"
            style={styles.calenderArrows}
          />
        }
        endDate={endDate}
        startDate={startDate}
        displayedDate={displayedDate}
        onChange={this.setDates}>
        <Text style={styles.pickerOpenText} />
      </DateRangePicker>
    );
  }
}

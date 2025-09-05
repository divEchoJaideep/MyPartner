import * as React from 'react';
// import { useState } from 'react';
import CommanBtn from '../CommanBtn';
import RangeSlider from '../RangeSlider';
import DatePicker from '../DatePicker';
import RadioButton from '../RadioButton';
import FacilitiesRules from '../FacilitiesRules';
import CounterList from '../CounterList';
import CancellationPolicy from '../CancellationPolicy';
import CommanHeading from '../CommanHeading';
import {facilitiesList, propertyTypeData} from '../../assets/data';
import {Content} from '..';

import styles from './Styles/index';
import {navigate} from '../../navigation/ReduxNavigation';
// import { View, Text } from 'react-native';

function BookPage() {
  return (
    <>
      <Content hasHeader contentContainerStyle={styles.container}>
        <CommanHeading
          headingText
          heading="Property type"
          commanHeadingContainerStyle={styles.propertyHeadingStyle}
          navigation={navigate}
        />
        <RadioButton data={propertyTypeData} />
        <RangeSlider />
        <DatePicker />
        <FacilitiesRules
          facilitiesListData={facilitiesList.slice(0, 8)}
          FacilitiesRulesHeading="Facilities"
        />
        <CounterList />
        <FacilitiesRules
          facilitiesListData={facilitiesList.slice(9, 14)}
          FacilitiesRulesHeading="Rules"
        />
        <CancellationPolicy Switch navigation={navigate} />
        <CommanBtn btnText="Apply" commanBtnStyle={styles.bookPropertyBtn} />
      </Content>
    </>
  );
}

export default BookPage;

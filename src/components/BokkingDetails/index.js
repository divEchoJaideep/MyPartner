import * as React from 'react';
import {Text, View, Image} from 'react-native';
import CommanHeading from '../CommanHeading';
import CommanText from '../SignUpLogIn/CommanText';
import {Images} from '../../theme';
import styles from './Styles/Index';
import {navigate} from '../../navigation/ReduxNavigation';

function BokkingDetailsScreen({
  BokkingDetailsHeading,
  BokkingDetailsHeadingStyle,
  BokkingDetailsContentStyle,
}) {
  return (
    <>
      <View style={BokkingDetailsContentStyle}>
        <CommanHeading
          headingText
          heading={BokkingDetailsHeading}
          commanHeadingContainerStyle={BokkingDetailsHeadingStyle}
          navigation={navigate}
        />
        <View style={styles.bokkingDetailsNameDate}>
          <CommanText
            commanText="Full Name"
            commanTextstyle={styles.bokkingDetailsLabelText}
          />
          <View style={styles.bokkingDetailsNameDateTextContent}>
            <Text style={styles.bokkingDetailsNameDateText}>Leesa Oberoy</Text>
          </View>
        </View>
        <View style={styles.bokkingDetailsNameDate}>
          <CommanText
            commanText="Dates"
            commanTextstyle={styles.bokkingDetailsLabelText}
          />
          <View style={styles.bokkingDetailsNameDateTextContent}>
            <Text style={styles.bokkingDetailsNameDateText} numberOfLines={1}>
              15 Oct 2000 - 15 Oct 2021
            </Text>
            <Image
              source={Images.DatePickerIcon}
              resizeMode="contain"
              style={styles.bokkingDetailsNameDateImg}
            />
          </View>
        </View>
      </View>
    </>
  );
}

export default BokkingDetailsScreen;

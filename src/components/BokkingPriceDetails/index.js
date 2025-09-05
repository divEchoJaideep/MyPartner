import * as React from 'react';
import {Text, View, Image} from 'react-native';
import CommanHeading from '../CommanHeading';
import CommanText from '../SignUpLogIn/CommanText';
import {Images} from '../../theme';
import styles from './Styles/Index';
import {navigate} from '../../navigation/ReduxNavigation';

function BokkingPriceDetailsScreen({
  BokkingPriceDetailsHeading,
  BokkingDetailsHeadingStyle,
  BokkingPriceDetailsContentStyle,
}) {
  return (
    <>
      <View
        style={[
          styles.BokkingPriceDetailsContent,
          BokkingPriceDetailsContentStyle,
        ]}>
        <CommanHeading
          headingText
          heading={BokkingPriceDetailsHeading}
          commanHeadingContainerStyle={BokkingDetailsHeadingStyle}
          navigation={navigate}
        />
        <View style={styles.bokkingPriceTexts}>
          <Text style={styles.bokkingPriceLeftText}>
            $ 200 / one month X 12 month
          </Text>
          <Text style={styles.bokkingPriceRightText}>$ 2400</Text>
        </View>
        <View style={styles.bokkingPriceTexts}>
          <Text style={styles.bokkingPriceLeftText}>Service fee</Text>
          <Text style={styles.bokkingPriceRightText}>$ 20</Text>
        </View>
        <View style={styles.bokkingPriceTexts}>
          <Text style={styles.bokkingPriceLeftText}>Agreements fee</Text>
          <Text style={styles.bokkingPriceRightText}>$ 10</Text>
        </View>
        <View style={styles.bokkingTotalPriceText}>
          <Text style={styles.bokkingTotalPriceLeftText}>Total ( USD )</Text>
          <Text style={styles.bokkingTotalPriceRightText}>$ 2430</Text>
        </View>
      </View>
    </>
  );
}

export default BokkingPriceDetailsScreen;

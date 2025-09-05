import * as React from 'react';
import BookPropertyImgText from '../BookPropertyImgText';
import FacilitiesRules from '../FacilitiesRules';
import BokkingDetails from '../BokkingDetails';
import BokkingPriceDetails from '../BokkingPriceDetails';
import BokkingPaymentDetails from '../BokkingPaymentDetails';
import CancellationPolicy from '../CancellationPolicy';
import {facilitiesList} from '../../assets/data';
import styles from './Styles/index';
import {navigate} from '../../navigation/ReduxNavigation';

function PropertyDetailComponent(props) {
  return (
    <>
      <BookPropertyImgText
        ratingStarText
        locationText
        likeBtnPress={() => {
          if (props.likeBtnPress) {
            props.likeBtnPress();
          }
        }}
        sendMsgPress={() => {
          if (props.sendMsgPress) {
            props.sendMsgPress();
          }
        }}
      />
      <FacilitiesRules
        facilitiesListData={facilitiesList.slice(0, 9)}
        FacilitiesRulesHeading="Facilities"
        facilitiesHeadingStyle={styles.facilitiesHeadingStyle}
        facilitiListContentStyle={styles.facilitiListContentStyle}
      />
      <BokkingDetails
        BokkingDetailsHeading="Your Booking"
        BokkingDetailsContentStyle={styles.BokkingDetailsContentStyle}
        navigation={navigate}
      />
      <BokkingPriceDetails
        BokkingPriceDetailsHeading="Price Details"
        BokkingPriceDetailsContentStyle={styles.BokkingPriceDetailsContentStyle}
        navigation={navigate}
      />
      <BokkingPaymentDetails
        BokkingPaymentDetailsHeading="Pay with"
        BokkingPaymentDetailsContentStyle={
          styles.BokkingPaymentDetailsContentStyle
        }
        navigation={navigate}
      />
      <CancellationPolicy
        navigation={navigate}
        cancellationPolicyTextContentStyle={
          styles.cancellationPolicyTextContentStyle
        }
      />
    </>
  );
}

export default PropertyDetailComponent;

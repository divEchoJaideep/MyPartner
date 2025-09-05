import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../../theme';

const styles = EStyleSheet.create({
  facilitiesHeadingStyle: {
    marginTop: '23rem',
  },
  facilitiListContentStyle: {
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    paddingBottom: '15.5rem',
  },
  BokkingDetailsContentStyle: {
    marginTop: '33rem',
  },
  BokkingPriceDetailsContentStyle: {
    marginTop: '10rem',
  },
  BokkingPaymentDetailsContentStyle: {
    marginTop: '33rem',
  },
  cancellationPolicyTextContentStyle: {
    marginBottom: 0,
  },
});

export default styles;

import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  paymentCardIcon: {
    width: '15rem',
    height: '11.67rem',
    marginRight: '12.5rem',
  },
  paymentDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    paddingBottom: '15rem',
  },
  paymentCardName: {
    lineHeight: '24rem',
    color: Colors.black,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.regular,
  },
  paymentCardEditBtn: {
    marginLeft: 'auto',
  },
  paymentCardEditText: {
    lineHeight: '24rem',
    color: Colors.pink,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.pink,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.regular,
  },
});

export default styles;

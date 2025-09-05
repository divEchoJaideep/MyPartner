import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  paymentOptionListBtn: {
    flexDirection: 'row',
    paddingBottom: '15rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    marginBottom: '23rem',
  },
  paymentOptionCardImg: {
    width: '20rem',
    height: '15rem',
    marginRight: '17.5rem',
  },
  paymentOptionName: {
    color: Colors.black,
    lineHeight: '20rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  paymentOptionSubName: {
    color: Colors.darkGray,
    lineHeight: '18rem',
    marginTop: '8rem',
    fontSize: Fonts.size.tiny,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.buttonText,
    },
  },
  paymentOptionRightArrowImg: {
    width: '9.78rem',
    height: '16rem',
    marginLeft: 'auto',
    marginRight: '5rem',
  },
});

export default styles;

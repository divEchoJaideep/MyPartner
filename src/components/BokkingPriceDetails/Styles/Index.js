import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  BokkingPriceDetailsContent: {
    paddingBottom: '15rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
  },
  bokkingPriceTexts: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '6rem',
  },
  bokkingPriceLeftText: {
    lineHeight: '18rem',
    color: Colors.darkGray,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.tiny,
  },
  bokkingPriceRightText: {
    marginLeft: 'auto',
    lineHeight: '18rem',
    color: Colors.darkGray,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.tiny,
  },
  bokkingTotalPriceText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4rem',
  },
  bokkingTotalPriceLeftText: {
    lineHeight: '24rem',
    color: Colors.black,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.regular,
  },
  bokkingTotalPriceRightText: {
    marginLeft: 'auto',
    lineHeight: '24rem',
    color: Colors.black,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.regular,
  },
});

export default styles;

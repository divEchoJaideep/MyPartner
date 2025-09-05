import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  priceMonthHeadingStyle: {
    marginTop: '33rem',
    marginBottom: 0,
  },
  lableContainer: {
    alignItems: 'center',
    padding: 0,
    backgroundColor: Colors.transparent,
    borderRadius: 0,
  },
  lableText: {
    color: Colors.darkGray,
    fontSize: Fonts.size.regular,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.buttonText,
    },
  },
  railContainer: {
    flex: 1,
    height: '3rem',
    borderRadius: '2rem',
    backgroundColor: Colors.lightRed,
  },
  railSelectedContainer: {
    height: '3rem',
    backgroundColor: Colors.pink,
    borderRadius: '2rem',
  },
  thumbContainer: {
    width: '30rem',
    height: '30rem',
    borderRadius: '15rem',
    borderWidth: '4rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
    backgroundColor: Colors.pink,
    shadowOffset: {
      width: 0,
      height: '6rem',
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 20,
    shadowColor: Colors.pink,
  },
  arrowImage: {
    width: '7rem',
    height: '12rem',
  },
  arrowBottomIconStyle: {
    width: '12rem',
    height: '7rem',
  },
  arrowRightIconStyle: {
    height: '12rem',
    width: '7rem',
  },
  rangeSlider: {
    marginTop: '23rem',
  },
});

export default styles;

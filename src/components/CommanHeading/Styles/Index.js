import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  commanHeadingContainer: {
    marginBottom: 0 ,
    marginTop:20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commanHeadingText: {
    color: Colors.black,
    lineHeight: '23rem',
    letterSpacing: '-0.02rem',
    fontSize: Fonts.size.h4,
    ...Fonts.style.boldText,
  },
  viewallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  morBtnText: {
    color: Colors.darkGray,
    lineHeight: '21rem',
    fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.buttonText,
    },
  },
  rightArrow: {
    height: '8rem',
    width: '8rem',
    marginLeft: '5.67rem',
  },
});

export default styles;

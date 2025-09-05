import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '15rem',
    paddingHorizontal: '20rem',
  },
  termsServiceText: {
    lineHeight: '21rem',
    color: Colors.darkGray,
    marginBottom: '8rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  termsServiceTextLink: {
    color: Colors.pink,
  },
});

export default styles;

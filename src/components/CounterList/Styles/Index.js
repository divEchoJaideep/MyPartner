import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  facilitiCounterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingVertical: '15rem',
  },
  facilitiCounterHeading: {
    color: Colors.black,
    lineHeight: '24rem',
    marginRight: 'auto',
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  facilitiCounterBtnsTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  facilitiCounterText: {
    paddingHorizontal: '8rem',
    color: Colors.black,
    lineHeight: '24rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  facilitiCounterPluseMinsaIcon: {
    width: '14rem',
    height: '14rem',
  },
});

export default styles;

import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  radioBtnBoxStyle: {
    borderWidth: 0,
    backgroundColor: Colors.transparent,
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    borderRadius: 0,
    flexDirection: 'row-reverse',
  },
  radioBtnTextStyle: {
    color: Colors.black,
    lineHeight: '24rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
});

export default styles;

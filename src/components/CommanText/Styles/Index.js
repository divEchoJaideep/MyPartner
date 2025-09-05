import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  commanText: {
    // lineHeight: '18rem',
    color: Colors.black,
     textAlign: 'center',
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.medium,
  },
});

export default styles;

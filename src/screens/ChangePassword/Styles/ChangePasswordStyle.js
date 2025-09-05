import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: '40rem',
    paddingBottom: '15rem',
  },
  changePasswordBtn: {
    width: '203rem',
    marginTop: '13rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  changePasswordPageText: {
    lineHeight: '21rem',
    marginBottom: '33rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  inputLabelText: {
    textAlign: 'left',
    color: Colors.lighterBlack,
    fontSize: Fonts.size.tiny,
    ...Fonts.style.textInputText,
  },
  changePasswordInput: {
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
    paddingTop: '8rem',
  },
});

export default styles;

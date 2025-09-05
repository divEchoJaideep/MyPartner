import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from '../../../libs/Utils';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: '15rem',
    paddingBottom: '15rem',
    '@media ios': {
      flex: isIphoneX() ? 1 : 0,
      paddingTop: isIphoneX() ? '75rem' : '81rem',
    },
    '@media android': {
      paddingTop: '70rem',
    },
  },
  signupLoginInputGroup: {
    paddingHorizontal: '25rem',
  },
  lastInputStyle: {
    marginBottom: '32rem',
  },
  passwordInputStyle: {
    marginBottom: 0,
  },
  signUpLogInBtn: {
    backgroundColor: Colors.pink,
    marginBottom: '37rem',
  },
  commanBtnTextStyle: {
    color: Colors.white,
  },
  googleFaceBookBtnRow: {
    flexDirection: 'row',
    marginHorizontal: '-4%',
    marginTop: '37rem',
    marginBottom: '32rem',
  },
  bottomAccountText: {
    lineHeight: '18rem',
    color: Colors.lightBlack,
    marginTop: 'auto',
    alignSelf: 'center',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.tiny,
  },
  loginSignupBtnText: {
    lineHeight: '18rem',
    color: Colors.pink,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.pink,
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.tiny,
  },
});

export default styles;

import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from '../../../libs/Utils';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: '14rem',
    paddingBottom: '15rem',
    '@media ios': {
      flex: isIphoneX() ? 1 : 0,
      paddingTop: '81rem',
    },
    '@media android': {
      paddingTop: '70rem',
    },
    paddingBottom:50
  },
  signupLoginInputGroup: {
    paddingHorizontal: '25rem',
    flexDirection: 'column',
    flex: 1,
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
    alignSelf: 'center',
    marginTop: 'auto',
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
  forgotPasswordLink: {
    marginBottom: '32rem',
    marginLeft: 'auto',
  },
  forgotPasswordText: {
    textAlign: 'right',
    fontSize: '10rem',
    lineHeight: '15rem',
    color: Colors.darkGray,
    ...Fonts.style.textInputText,
  },
  forgotPasswordInput: {
    marginBottom: '37rem',
  },
  resetPasswordInput: {
    ...Fonts.style.normalText,
  },
  forgotPasswordPageText: {
    lineHeight: '21rem',
    marginBottom: '20rem',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
  },
  resetPageText: {
    marginBottom: '33rem',
    letterSpacing: '-0.24rem',
  },
  resetPasswordContainer: {
    paddingHorizontal: '15rem',
    paddingTop: '23rem',
  },
  inputLabelText: {
    textAlign: 'left',
    color: Colors.lighterBlack,
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.tiny,
  },
});

export default styles;

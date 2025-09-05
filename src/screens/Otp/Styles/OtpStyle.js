import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from '../../../libs/Utils';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    flex: isIphoneX() ? 1 : 0,
    paddingTop: '37rem',
    paddingBottom: '15rem',
    paddingHorizontal: '15rem',
  },
  inputLabelText: {
    textAlign: 'left',
    color: Colors.lighterBlack,
    fontSize: Fonts.size.tiny,
    ...Fonts.style.textInputText,
  },
  signupLoginInputGroup: {
    paddingHorizontal: '25rem',
    flexDirection: 'column',
    flex: 1,
  },
  confirmNumberText: {
    width: '250rem',
    lineHeight: '21rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20rem',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
  },
  bottomAccountText: {
    lineHeight: '18rem',
    color: Colors.lightBlack,
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
    ...Fonts.style.normalText,
    fontSize: Fonts.size.tiny,
  },
  otpInputStyle: {
    width: '40rem',
    height: '40rem',
    backgroundColor: Colors.white,
    borderRadius: '12rem',
    textAlign: 'center',
    color: Colors.black,
    shadowOffset: {
      width: '1rem',
      height: '10rem',
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurBlack,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '33rem',
  },
  bottomContinueBtn: {
    flex: 1,
    paddingHorizontal: '25rem',
  },
  otpContinueBtn: {
    marginTop: 'auto',
  },
  loaderContent: {
    width: '93rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20rem',
    marginTop: '19rem',
  },
  loaderDotsStyle: {
    color: Colors.pink,
    fontSize: '75rem',
    letterSpacing: '-12rem',
    lineHeight: '30rem',
  },
  logoHeadingStyle: {
    marginHorizontal: '-25rem',
  },
});

export default styles;

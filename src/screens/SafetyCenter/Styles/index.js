import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    // paddingTop: '23rem',
    paddingBottom: '15rem',
    paddingHorizontal: '20rem',
  },
  safetyCenterTopText: {
    textAlign: 'left',
    lineHeight: '20rem',
    marginBottom: '23rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  emergencyServicesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '15rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    marginBottom: '33rem',
  },
  emergencyServicesTextRow: {
    flexDirection: 'row',
  },
  emergencyServicesBtnText: {
    paddingLeft: '16.91rem',
    paddingRight: '28.1rem',
    width: '100% - 67rem',
  },
  callMissedIcon: {
    width: '16.18rem',
    height: '15rem',
    marginTop: '7rem',
  },
  rightArrowIcon: {
    width: '9.78rem',
    height: '15rem',
  },
  emergencyServicesBtnHeading: {
    color: Colors.pink,
    lineHeight: '24rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.buttonText,
  },
  emergencyServicesBtnPeregraph: {
    color: Colors.darkGray,
    lineHeight: '24rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  safetyCenterBottomText: {
    color: Colors.darkGray,
    lineHeight: '15rem',
    marginBottom: '8rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.normalText,
  },
  readMoreTextBtn: {
    width: '70rem',
  },
  readMoreTextBtnText: {
    lineHeight: '15rem',
    color: Colors.pink,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.pink,
    fontSize: Fonts.size.tiny,
    ...Fonts.style.normalText,
  },
  allEmergenciesCallLink: {
    marginBottom: '33rem',
  },
  allEmergenciesCallText: {
    color: Colors.pink,
    lineHeight: '24rem',
    paddingLeft: '16.91rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.buttonText,
  },
  callLinkBtn: {
    marginLeft: 'auto',
  },
  callLinkBtnText: {
    lineHeight: '24rem',
    color: Colors.pink,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.pink,
    fontSize: Fonts.size.regular,
    ...Fonts.style.buttonText,
  },
  emergenciesCallLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '15rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    marginBottom: '23rem',
  },
  emergenciesCallLinkText: {
    lineHeight: '24rem',
    color: Colors.black,
    paddingLeft: '16.91rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  emergenciesCallBottomText: {
    color: Colors.black,
    lineHeight: '18rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.normalText,
  },
});

export default styles;

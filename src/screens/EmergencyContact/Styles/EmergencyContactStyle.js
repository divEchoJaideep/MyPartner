import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';
import {isIphoneX} from '../../../libs/Utils';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: '20rem',
    '@media ios': {
      paddingBottom: isIphoneX() ? 0 : '15rem',
    },
    '@media android': {
      paddingBottom: 0,
    },
  },
  searchInputStyle: {
    width: '100%-40rem',
    marginTop: '23rem',
    marginBottom: '20rem',
  },
  emergencyContactContent: {
    flex: 1,
  },
  emergencyContactPeregraph: {
    marginBottom: '37rem',
    textAlign: 'center',
    color: Colors.darkGray,
    lineHeight: '21rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  addNowBtn: {
    width: '165rem',
    alignSelf: 'center',
  },
  learnMoreBtn: {
    width: '80rem',
    alignSelf: 'center',
    '@media ios': {
      flex: isIphoneX() ? 0.1 : 0.2,
    },
    '@media android': {
      flex: 0.2,
    },
  },
  learnMoreBtnText: {
    textAlign: 'center',
    lineHeight: '18rem',
    color: Colors.pink,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.pink,
    fontSize: Fonts.size.tiny,
    ...Fonts.style.normalText,
  },
  profileInputStyle: {
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    backgroundColor: Colors.transparent,
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingTop: '8rem',
    paddingBottom: '15rem',
    lineHeight: '24rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  inputLabelText: {
    textAlign: 'left',
  },
  languageSelectBtn: {
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    backgroundColor: Colors.transparent,
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingTop: '8rem',
    paddingBottom: '15rem',
    marginBottom: '37rem',
  },
  languageSelectBtnText: {
    lineHeight: '24rem',
    paddingRight: '25rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  languageSelectBtnArrow: {
    position: 'absolute',
    right: '5.12rem',
    bottom: '19rem',
    width: '9.78rem',
    height: '16rem',
  },
  languageListContent: {
    marginTop: '-20rem',
    paddingHorizontal: '20rem',
  },
  radioTextStyle: {
    marginLeft: '-2rem',
  },
  radioBoxStyle: {
    paddingRight: 0,
    paddingLeft: 0,
  },
});

export default styles;

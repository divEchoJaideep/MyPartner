import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  logo: {
    width: '100rem',
    height: '100rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '21rem',
  },
  heading: {
    marginBottom: '38rem',
    textAlign: 'center',
    width: '100%',
    color: Colors.black,
    lineHeight: '38rem',
    fontSize: Fonts.size.larg,
    ...Fonts.style.boldText,
  },
  allInputStyle: {
    backgroundColor: Colors.white,
    borderRadius: '12rem',
    paddingVertical: '10rem',
    paddingHorizontal: '22rem',
    color: Colors.black,
    marginBottom: '20rem',
    height: '40rem',
    fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.normalText,
    },
    '@media android': {
      ...Fonts.style.textInputText,
    },
  },
  passwordEyeImgBtn: {
    position: 'absolute',
    right: '12rem',
    top: '12rem',
  },
  passwordEyeImg: {
    width: '16rem',
    height: '16rem',
    opacity: 1,
  },
  googleImg: {
    height: '30rem',
    width: '30rem',
  },
  facebookImg: {
    height: '30rem',
    width: '15rem',
  },
  googleFaceBookBtn: {
    width: '42%',
    borderRadius: '12rem',
    backgroundColor: Colors.gray,
    marginHorizontal: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '10rem',
    paddingHorizontal: '17rem',
  },
  googleFaceBookBtnText: {
    paddingLeft: '17rem',
    fontSize: '15rem',
    lineHeight: '22.5rem',
    color: Colors.black,
    ...Fonts.style.buttonText,
  },
  resetInputStyle: {
    paddingVertical: '15rem',
    paddingRight: '35rem',
    color: Colors.black,
    marginBottom: '20rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.lightGray,
    fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.normalText,
    },
    '@media android': {
      ...Fonts.style.textInputText,
    },
  },
  resetPasswordEyeImgBtn: {
    position: 'absolute',
    right: '12rem',
    top: '16rem',
  },
});

export default styles;

import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  nextStartBtn: {
    // paddingHorizontal: '12rem',
    // paddingVertical: '14rem',
    overflow: 'hidden',
    textAlign: 'center',
    color: Colors.white,
    fontSize: Fonts.size.h4,
    ...Fonts.style.boldText,
  },
  largeText: {
    fontSize: Fonts.size.h1,
  },
  textColor: {
    color: Colors.white,
  },

  btnWithBG: {
    backgroundColor: Colors.pink,
  },

  btnWithOnlyBorder: {
    borderColor: Colors.pink,
  },
  nextStartBtnView: {
    borderWidth: '2rem',
    borderColor: Colors.transparent,
    borderRadius: '12rem',
    width: '100%',
    height: '50rem',
    marginBottom: '15rem',
    shadowOffset: {
      width: '1rem',
      height: '10rem',
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurPink,
    justifyContent: 'center',
  },

  welcomeBottomBtn: {
    paddingHorizontal: '25rem',
    marginTop: 'auto',
    marginBottom: '40rem',
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    paddingTop: '50rem',
    width: '100%',
    // height: "100%",
  },
});

export default styles;

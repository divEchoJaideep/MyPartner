import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '15rem',
    paddingHorizontal: '20rem',
  },
  addIdBtn: {
    width: '165rem',
  },
  commanBtnTextStyle:{
      color:Colors.white
    },
    commanText: {
      marginHorizontal: 37,
    },
    twoBtnStyle:{
    width: width - 40,
    backgroundColor: Colors.pink,
  },
  howWorkText: {
    color: Colors.pink,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.pink,
  },
  howWorkLinkText: {
    width: '100rem',
    alignSelf: 'center',
  },
  countryPickerStyle: {
    color: Colors.black,
    fontSize: '20rem',
    paddingBottom: '15rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    paddingRight: '25rem',
    ...Fonts.style.normalText,
  },
  countryBottomArrow: {
    position: 'absolute',
    right: '17rem',
    top: '9.34rem',
    width: '12rem',
    height: '8rem',
  },
  countryPickerLabelText: {
    textAlign: 'left',
    color: Colors.darkGray,
    marginBottom: '8rem',
    ...Fonts.style.normalText,
  },
  radioBoxStyle: {
    paddingHorizontal: 0,
  },
  selectProofBottomText: {
    marginVertical: '37rem',
    textAlign: 'center',
    color: Colors.darkGray,
    lineHeight: '21rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  continueBtn: {
    width: '165rem',
    alignSelf: 'center',
  },
  radioTextStyle: {
    marginLeft: '-4rem',
  },
  countryPickerThemeStyle: {
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
});

export default styles;

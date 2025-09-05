import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  profileInputStyle: {
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
  inputLabelText: {
    textAlign: 'left',
    color: Colors.darkGray,
  },
  datePickerIconStyle: {
    width: '13.6rem',
    height: '15rem',
    position: 'absolute',
    top: '8rem',
    right: '3.4rem',
  },
});

export default styles;

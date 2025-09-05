import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
const styles = EStyleSheet.create({
  dropdownConteiner: {
    paddingTop: '0rem',
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderRadius: '12rem',
    paddingVertical: '10rem',
    paddingHorizontal: '22rem',
    color: Colors.black,
    marginBottom: '20rem',
    marginTop: '7rem',
    height: '40rem',
    fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.normalText,
    },
    '@media android': {
      ...Fonts.style.textInputText,
    },
  },
  icon: {
    marginRight: '5rem',
  },
  placeholderStyle: {
    fontSize: Fonts.size.small,
  },
  selectedTextStyle: {
    fontSize: Fonts.size.small,
    color: '#000'
  },
  iconStyle: {
    width: '20rem',
    height: '20rem',
  },
  inputSearchStyle: {
    height: '40rem',
    fontSize: Fonts.size.small,
  },
  textStyle: {
    textAlign: 'left',
  },
});

export default styles;

import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  dateView: {
    backgroundColor: Colors.white,
    borderRadius: '12rem',
    paddingVertical: '10rem',
    paddingHorizontal: '22rem',
    color: Colors.black,
    marginBottom: '20rem',
    height: '40rem',
    borderRadius: '20rem',
    marginHorizontal: '20rem',
    fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.normalText,
    },
    '@media android': {
      ...Fonts.style.textInputText,
    },
  },
  birthdayText: {
    fontSize: Fonts.size.h2,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginVertical: '50rem',
  },
  btnStyle: {marginTop: 100, marginHorizontal: 20},
});

export default styles;

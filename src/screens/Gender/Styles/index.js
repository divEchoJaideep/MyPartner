import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: '20rem',
  },
  inputRaw: {
    marginVertical: 5,
  },
  genderView: {
    backgroundColor: Colors.white,
    borderRadius: '12rem',
    paddingVertical: '10rem',
    paddingHorizontal: '22rem',
    color: Colors.black,
    marginBottom: '20rem',
    height: '40rem',
    borderRadius: '20rem',
    marginHorizontal: '20rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  birthdayText: {
    fontSize: Fonts.size.h2,
    color: Colors.black,
    alignSelf: 'center',
    marginVertical: '50rem',
  },
  sideImg: {
    width: '14rem',
    height: '15rem',
  },
  btnStyle: {
    backgroundColor: Colors.pink,
    marginTop: '70%',
  },
  selectedBtnStyle: {
    backgroundColor: Colors.pink,
  },
  commanBtnTextStyle: {
    color: Colors.white,
  },
  selectImg: {
    width: '20rem',
    height: '20rem',
    marginHorizontal: '10rem',
  },
  imgTextView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default styles;

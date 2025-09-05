import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '15rem',
    paddingHorizontal: '20rem',
  },
  bookPropertyBtn: {
    maxWidth: '165rem',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  propertyHeadingStyle: {
    marginBottom: 0,
  },
  backdropStyle: {
    position: 'relative',
    backgroundColor: Colors.transparent,
    height: 'auto',
    width: '100%',
  },
  calenderArrows: {
    width: '20rem',
    height: '20rem',
  },
  containerStyle: {
    backgroundColor: Colors.transparent,
    paddingBottom: 0,
    marginBottom: '-15rem',
  },
  dayHeaderStyle: {
    backgroundColor: Colors.transparent,
  },
  dayStyle: {
    width: '30rem',
    height: '30rem',
    borderRadius: '30rem',
    borderWidth: '3rem',
    borderColor: Colors.transparent,
  },
  selectedStyle: {
    borderColor: Colors.white,
    width: '30rem',
    height: '30rem',
    borderRadius: '30rem',
    borderWidth: '3rem',
    backgroundColor: Colors.pink,
    shadowOffset: {
      width: 0,
      height: '6rem',
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 20,
    shadowColor: Colors.pink,
  },
  dayTextStyle: {
    color: Colors.black,
    lineHeight: '21rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  selectedTextStyle: {
    color: Colors.white,
    lineHeight: '21rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.buttonText,
  },
  headerTextStyle: {
    letterSpacing: '-0.02rem',
    color: Colors.black,
    fontSize: Fonts.size.h4,
    ...Fonts.style.buttonText,
  },
  pickerOpenText: {
    height: 0,
  },
  dayHeaderTextStyle: {
    color: Colors.black,
    lineHeight: '21rem',
    opacity: 1,
    fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.buttonText,
    },
  },
});

export default styles;

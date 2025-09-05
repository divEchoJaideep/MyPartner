import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  commanBtn: {
    backgroundColor: Colors.white,
    marginVertical: '10rem',
    paddingVertical: '15rem',
    paddingHorizontal: '15rem',
    borderRadius: '30rem',
    shadowOffset: {
      width: '1rem',
      height: '10rem',
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurPink,
    borderWidth: '1rem',
    borderColor: Colors.lightGray,
  },
  commanBtnText: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: Fonts.size.h4,
    ...Fonts.style.boldText,
  },
  imageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnImageStyle: {
    marginLeft: 'auto',
    width: '23rem',
    height: '23rem',
  },
});

export default styles;

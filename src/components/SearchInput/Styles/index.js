import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  allInputStyle: {
    backgroundColor: Colors.white,
    height: '40rem',
    borderTopLeftRadius: '12rem',
    borderTopRightRadius: '12rem',
    borderRadius: '12rem',
    paddingVertical: '12rem',
    paddingLeft: '15rem',
    paddingRight: '40rem',
    color: Colors.black,
    borderWidth: '1rem',
    borderColor: Colors.lightGray,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
  },
  searchIcon: {
    position: 'absolute',
    top: '13rem',
    right: '17.71rem',
    width: '14rem',
    height: '14rem',
  },
});

export default styles;

import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../theme';

const styles = EStyleSheet.create({
  notificationBtn: {
    width: '40rem',
    height: '40rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10rem',
    backgroundColor: Colors.white,
    borderWidth: '1rem',
    borderColor: Colors.lightGray,
  },
  notificationIcon: {
    width: '23rem',
    height: '23rem',
  },
});

export default styles;

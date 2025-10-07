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
  tabBadge: {
  position: 'absolute',
  right: -3,
  top: -3,
  backgroundColor: Colors.red,
  borderRadius: 8,
  width: 10,
  height: 10,
  justifyContent: 'center',
  alignItems: 'center',
},
tabBadgeText: {
  color: Colors.white,
  fontSize: 10,
  fontWeight: 'bold',
},

});

export default styles;

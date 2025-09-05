import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  facilitiesHeadingStyle: {
    marginTop: '33rem',
  },
  facilitiListContent: {
    marginLeft: '-7.5rem',
    marginRight: '-7.5rem',
  },
  facilitiListCol: {
    width: '20%',
    padding: '7.5rem',
    alignItems: 'center',
  },
  facilitiListText: {
    color: Colors.darkGray,
    fontSize: '10rem',
    lineHeight: '15rem',
    textAlign: 'center',
    ...Fonts.style.normalText,
  },
  facilitiListImg: {
    width: '15rem',
    height: '15rem',
    marginBottom: '6rem',
  },
});

export default styles;

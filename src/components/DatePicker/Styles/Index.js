import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  priceMonthHeadingStyle: {
    marginTop: '33rem',
  },
  datePickerContainer: {
    backgroundColor: Colors.lightRed,
    paddingTop: '23rem',
    paddingBottom: '33rem',
    paddingHorizontal: '20rem',
    borderRadius: '12rem',
  },
  checkInOutTextContent: {
    flexDirection: 'row',
    marginBottom: '13rem',
  },
  checkInOutCol: {
    width: '50%',
    paddingHorizontal: '5rem',
    alignItems: 'center',
  },
  checkInOutText: {
    color: Colors.darkGray,
    lineHeight: '18rem',
    marginBottom: '8rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.normalText,
  },
  checkInOutTimeText: {
    color: Colors.black,
    lineHeight: '20rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  dateApplyBtn: {
    maxWidth: '165rem',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20rem',
  },
});

export default styles;

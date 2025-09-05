import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  bokkingDetailsLabelText: {
    textAlign: 'left',
  },
  bokkingDetailsNameDate: {
    marginBottom: '23rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
  },
  bokkingDetailsNameDateTextContent: {
    paddingTop: '8rem',
    paddingBottom: '15rem',
  },
  bokkingDetailsNameDateText: {
    color: Colors.black,
    lineHeight: '24rem',
    paddingRight: '20rem',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.regular,
  },
  bokkingDetailsNameDateImg: {
    width: '13.6rem',
    height: '15rem',
    position: 'absolute',
    right: '3.4rem',
    bottom: '19rem',
  },
});

export default styles;

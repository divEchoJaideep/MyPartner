import EStyleSheet from 'react-native-extended-stylesheet';
import {Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '15rem',
    paddingHorizontal: '20rem',
  },
  searchInputStyle: {
    width: '100% - 40rem',
    marginBottom: '23rem',
  },
  contactUsBtn: {
    width: '165rem',
    marginLeft: 'auto',
  },
  stillHelpBottomTextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10rem',
  },
  stillHelpBottomText: {
    lineHeight: '20rem',
    letterSpacing: '-0.02rem',
    paddingRight: '10rem',
    width: '50%',
    fontSize: Fonts.size.regular,
    ...Fonts.style.buttonText,
  },
  allTopicHeadingStyle: {
    marginTop: '10rem',
  },
});

export default styles;

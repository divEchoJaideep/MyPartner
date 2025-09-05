import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '15rem',
    paddingHorizontal: '20rem',
  },
  feedbackPeregraphText: {
    lineHeight: '20.16rem',
    color: Colors.darkGray,
    marginBottom: '23rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  feedbackPeregraphHeadingText: {
    color: Colors.black,
    ...Fonts.style.buttonText,
  },
  feedbackPeregraphTextLink: {
    color: Colors.pink,
  },
  likeDoHeading: {
    marginTop: '10rem',
  },
  likeDoLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    paddingBottom: '15rem',
    marginBottom: '23rem',
  },
  likeDoLinkText: {
    lineHeight: '20.16rem',
    paddingRight: '41.1rem',
    width: '100% - 56rem',
    color: Colors.black,
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  topicImg: {
    width: '15rem',
    height: '15rem',
    marginRight: '18rem',
  },
});

export default styles;

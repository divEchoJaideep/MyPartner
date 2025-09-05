import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  recommendedArticalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    paddingBottom: '15rem',
    marginBottom: '23rem',
  },
  recommendedArticalLinkText: {
    lineHeight: '20.16rem',
    paddingRight: '38rem',
    width: '100% - 50rem',
    color: Colors.black,
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  rightArrow: {
    marginRight: '5.12rem',
    width: '9.78rem',
    height: '16rem',
  },
  topicImg: {
    width: '14rem',
    height: '14rem',
    marginRight: '18rem',
  },
  topicText: {
    width: '100%',
    paddingRight: '32rem',
  },
});

export default styles;

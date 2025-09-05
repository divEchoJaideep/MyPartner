import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '15rem',
  },
  notificationLinks: {
    flexDirection: 'row',
    paddingTop: '15rem',
    marginBottom: '13rem',
    paddingHorizontal: '20rem',
  },
  notificationLinkIcon: {
    width: '15rem',
    height: '15rem',
    marginTop: '3rem',
  },
  notificationLinksHeadingPeregraph: {
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    paddingBottom: '15rem',
    marginLeft: '13rem',
  },
  notificationLinksHeading: {
    flexDirection: 'row',
    marginBottom: '6rem',
    width: '100% - 68rem',
  },
  notificationLinksHeadingText: {
    lineHeight: '20rem',
    color: Colors.black,
    fontSize: Fonts.size.regular,
    ...Fonts.style.textInputText,
  },
  notificationLinksTimeText: {
    marginLeft: 'auto',
    lineHeight: '18rem',
    color: Colors.darkGray,
    fontSize: Fonts.size.tiny,
    ...Fonts.style.normalText,
  },
  notificationLinksPeregraphText: {
    lineHeight: '21rem',
    color: Colors.darkGray,
    width: '100% - 68rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  notReadMsg: {
    color: Colors.lightRed,
  },
});

export default styles;

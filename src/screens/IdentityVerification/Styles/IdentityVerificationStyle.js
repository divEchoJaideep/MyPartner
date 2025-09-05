import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';
import {isIphoneX} from '../../../libs/Utils';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '40rem',
    '@media ios': {
      paddingBottom: isIphoneX() ? 0 : '15rem',
    },
    '@media android': {
      paddingBottom: 0,
    },
  },
  successContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.2,
  },
  successPeregraph: {
    lineHeight: '21rem',
    color: Colors.darkGray,
    paddingHorizontal: '14rem',
    textAlign: 'center',
    marginBottom: '37rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  successBtn: {
    width: '100%',
  },
  addIdBtn: {
    width: '165rem',
  },
  howWorkText: {
    color: Colors.pink,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.pink,
    ...Fonts.style.normalText,
  },
  howWorkLinkText: {
    width: '100rem',
    alignSelf: 'center',
    '@media ios': {
      flex: isIphoneX() ? 0.1 : 0.2,
    },
    '@media android': {
      flex: 0.2,
    },
  },
});

export default styles;

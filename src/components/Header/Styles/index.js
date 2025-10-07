import { Platform } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import Fonts from '../../../theme/Fonts';
import FontHelper from '../../../helpers/FontHelper';
import Colors from '../../../theme/Colors';

export default EStyleSheet.create({
  header: {
    marginTop: Platform.OS === 'ios' ? '20rem' : 30,
    paddingHorizontal: '20rem',
    paddingVertical: '10rem',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.lighterGray,
    alignItems: 'center',
    zIndex: 99999,
    height: 65,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: '5rem',
        },
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  transparent: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
      },
      android: {
        elevation: null,
      },
    }),
  },
  title: {
    paddingHorizontal: '10rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleTxt: {
    color: Colors.darkBlack,
    fontSize: Fonts.size.h4,
    ...Fonts.style.boldText,
  },
  left: {
    position: 'absolute',
    left: '16rem',
  },
  textSubChild: {
    marginLeft: '5rem',
    ...Fonts.style.boldText,
  },
  leftArrow: { height: '20rem', width: '9.78rem' },
  userRightImageBtn: {
    marginLeft: 'auto',
  },
  homeBTN: { height: '20rem', width: '9.78rem' },
  homeBTN: {
    width: '25rem',
    height: '25rem',
  },
  userRightImage: {
    width: '42rem',
    height: '42rem',
  },
  leftLocationContent: {
    flexDirection: 'row',
  },
  locationImage: {
    width: '14rem',
    height: '16.9rem',
  },
  leftLocationText: {
    marginLeft: '6rem',
    width: '100% - 120rem',
    // ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.normalText,
    },
    '@media android': {
      ...Fonts.style.textInputText,
    },
  },
  clearText: {
    lineHeight: '21rem',
    color: Colors.pink,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
  },
  filterBtn: {
    width: '40rem',
    height: '40rem',
    backgroundColor: Colors.white,
    borderRadius: '10rem',
    shadowOffset: {
      width: '1rem',
      height: '10rem',
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 20,
    shadowColor: Colors.shadowLighterBlack,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '20rem',
  },
  filterBtnIcon: {
    width: '15rem',
    height: '15rem',
  },
  clearTextBtn: {
    position: 'absolute',
    right: '20rem',
  },
  backBtn: {
    // backgroundColor: '#f00',
    width: '20rem',
    alignItems: 'center',
  },
  textRightBtn: {
    position: 'absolute',
    right: '20rem',
  },
  rightText: {
    lineHeight: '21rem',
    color: Colors.pink,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
  },
  transparent: {
    backgroundColor: 'transparent',
    elevation: 0, // Android shadow
    shadowOpacity: 0, // iOS shadow
  },
});

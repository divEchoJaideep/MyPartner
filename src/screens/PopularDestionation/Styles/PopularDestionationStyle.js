import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';
import {isIphoneX} from '../../../libs/Utils';

const styles = EStyleSheet.create({
  contentContainer: {
    paddingHorizontal: '20rem',
    '@media ios': {
      paddingBottom: isIphoneX() ? '20rem' : '80rem',
    },
    '@media android': {
      paddingBottom: '80rem',
    },
  },
  fullScreenSliderContainer: {
    height: '200rem',
    borderRadius: '20rem',
    width: '100% - 40rem',
  },
  sliderBgImagestyle: {
    height: '200rem',
  },
  carouselSliderContainerStyle: {
    height: '252rem',
  },
  firstBookingHeadingStyle: {
    marginTop: '44rem',
  },
  papperMapIconBtn: {
    backgroundColor: Colors.opacityBlack,
    height: '40rem',
    width: '70rem',
    paddingTop: '13rem',
    paddingBottom: '12rem',
    paddingLeft: '12.5rem',
    paddingRight: '10rem',
    position: 'absolute',
    bottom: '33rem',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '10rem',
  },
  papperMapIcon: {
    width: '15rem',
    height: '13.33rem',
  },
  papperMapIconBtnText: {
    color: Colors.white,
    paddingLeft: '7.5rem',
    lineHeight: '15rem',
    letterSpacing: '-0.02rem',
    ...Fonts.style.buttonText,
    fontSize: Fonts.size.tiny,
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  handleIndicatorStyle: {
    width: '50rem',
    height: '3rem',
    backgroundColor: Colors.lightBlack,
  },
  backgroundStyle: {
    backgroundColor: Colors.lighterGray,
    borderRadius: 0,
  },
  handleStyle: {
    paddingVertical: '23rem',
  },
});

export default styles;

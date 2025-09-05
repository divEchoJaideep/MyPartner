import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  paginationActiveDot: {
    height: '15rem',
    width: '15rem',
    backgroundColor: Colors.pink,
    borderRadius: '8rem',
    borderWidth: '4rem',
    '@media ios': {
      borderColor: Colors.lighterWhite,
    },
    '@media android': {
      borderColor: Colors.lighterPink,
    },
  },
  paginationInActiveDot: {
    height: '8rem',
    width: '8rem',
    backgroundColor: Colors.opacityDarkGray,
    borderRadius: '8rem',
    borderWidth: 0,
  },
  sliderContainer: {
    height: '272rem',
    // width: '222rem',
    borderRadius: '20rem',
    overflow: 'hidden',
    marginRight: '20rem',
  },
  sliderMainImage: {
    width: '100%',
    height: '272rem',
  },
  sliderTextBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '272rem',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingVertical: '15rem',
    paddingLeft: '20rem',
    paddingRight: '15rem',
  },
  sliderHeading: {
    color: Colors.white,
    lineHeight: '23rem',
    marginBottom: '6rem',
    fontSize: Fonts.size.h4,
    ...Fonts.style.buttonText,
  },
  sliderPeregraph: {
    color: Colors.white,
    lineHeight: '18rem',
    paddingLeft: '5.7rem',
    fontSize: Fonts.size.tiny,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.buttonText,
    },
  },
  sliderRatingContainer: {
    position: 'absolute',
    right: '15rem',
    top: '15rem',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lighterBgBlack,
    paddingHorizontal: '5rem',
    paddingVertical: '3.5rem',
    borderRadius: '4rem',
  },
  sliderRatingStarImg: {
    width: '10rem',
    height: '10rem',
  },
  sliderRatingStarText: {
    paddingLeft: '4rem',
    color: Colors.white,
    fontSize: '10rem',
    lineHeight: '15rem',
    ...Fonts.style.textInputText,
  },
  carouselSliderContainer: {
    height: '330rem',
  },
  carouselSliderPagination: {
    position: 'absolute',
    width: '100%',
    bottom: '-13rem',
  },
  sliderLoacationText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderLocationImg: {
    height: '15.21rem',
    width: '12.6rem',
  },
});

export default styles;

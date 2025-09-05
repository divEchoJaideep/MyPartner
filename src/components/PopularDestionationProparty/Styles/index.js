import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  popularDestionationPropartyContent: {
    marginBottom: '-21rem',
  },
  popularDestionationContent: {
    paddingHorizontal: '12rem',
    paddingTop: '12rem',
    paddingBottom: '20rem',
    backgroundColor: Colors.white,
    borderRadius: '24rem',
    marginBottom: '21rem',
  },
  popularDestionationMainImg: {
    width: '100%',
    height: '211rem',
    borderRadius: '20rem',
    marginBottom: '12rem',
  },
  popularDestionationHeadingPrice: {
    flexDirection: 'row',
    marginBottom: '5rem',
  },
  popularDestionationHeadingText: {
    color: Colors.black,
    letterSpacing: '-0.002rem',
    lineHeight: '18rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.buttonText,
  },
  popularDestionationPriceText: {
    color: Colors.pink,
    lineHeight: '18rem',
    marginLeft: 'auto',
    fontSize: Fonts.size.medium,
    ...Fonts.style.buttonText,
  },
  popularDestionationLocationRatingStar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8rem',
  },
  popularDestionationLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularDestionationLocationImg: {
    width: '9.11rem',
    height: '11rem',
    marginRight: '5.94rem',
  },
  popularDestionationLocationText: {
    color: Colors.darkGray,
    lineHeight: '18rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.normalText,
  },
  popularDestionationRatingStarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  popularDestionationRatingStarImg: {
    width: '11.27rem',
    height: '11.27rem',
    marginRight: '2.87rem',
  },
  popularDestionationRatingStarText: {
    color: Colors.darkGray,
    lineHeight: '18rem',
    fontSize: Fonts.size.tiny,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.buttonText,
    },
  },
  categoryBottomRoomDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '-7rem',
  },
  categoryBottomRoomDetailImgText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '7rem',
  },
  categoryRoomDetailImg: {
    width: '11rem',
    height: '11rem',
    marginRight: '5rem',
  },
  sliderRatingStarText: {
    color: Colors.darkGray,
    lineHeight: '18rem',
    marginLeft: '2.87rem',
    fontSize: Fonts.size.tiny,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.buttonText,
    },
  },
  propertyDetaileHeadingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  propertyDetaileHeadingIconBtn: {
    width: '13rem',
    height: '13rem',
    marginHorizontal: '6rem',
  },
  propertyDetaileHeadingIcon: {
    width: '100%',
    height: '100%',
  },
});

export default styles;

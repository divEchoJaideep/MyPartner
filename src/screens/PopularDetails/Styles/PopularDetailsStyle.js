import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
import {isIphoneX} from '../../../libs/Utils';
import {Colors, Fonts} from '../../../theme';

import {getStatusBarHeight} from 'react-native-status-bar-height';
const windowWidth = Dimensions.get('window').width;

const statusBarHeight = getStatusBarHeight();

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '90rem',
  },
  popularDetailsHeader: {
    backgroundColor: Colors.transparent,
    position: 'absolute',
    marginTop: statusBarHeight,
  },
  popularDetailsMainImg: {
    width: '100%',
    height: '375rem',
  },
  propertyDetaileImgContentStyle: {
    width: '100%',
    height: '375rem',
    borderRadius: 0,
    marginBottom: '20rem',
  },
  propertyDetaileContentStyle: {
    paddingHorizontal: '20rem',
  },
  propertyDetaileContainer: {
    paddingHorizontal: '20rem',
  },
  facilitiesHeadingStyle: {
    marginTop: '23rem',
  },
  propertyDetaileImgsRow: {
    marginLeft: '-4.5rem',
    paddingLeft: '20rem',
  },
  propertyDetaileImgs: {
    width: '99rem',
    height: '91rem',
    borderRadius: '10.1rem',
    marginHorizontal: '4.5rem',
  },
  photoHeadingStyle: {
    marginTop: '25.5rem',
  },
  propertyDetailePhotoRow: {
    marginBottom: '33rem',
  },
  propertyDetaileLocationTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '15rem',
  },
  propertyDetaileLocationImg: {
    width: '14rem',
    height: '16.9rem',
    marginRight: '6rem',
  },
  propertyDetaileLocationText: {
    lineHeight: '21rem',
    color: Colors.black,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  propertyDetaileMap: {
    marginBottom: '33rem',
  },
  propertyDetaileMapImg: {
    width: '100%',
    height: '218rem',
  },
  propertyDetaileRatingStarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '13rem',
  },
  propertyDetaileRatingStarText: {
    lineHeight: '38rem',
    color: Colors.black,
    marginRight: '13rem',
    fontSize: Fonts.size.larg,
    ...Fonts.style.buttonText,
  },
  propertyDetaileRatingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '-2rem',
  },
  propertyDetaileRatingStarImg: {
    width: '14rem',
    height: '14rem',
    marginHorizontal: '2rem',
  },
  ratingCategoryListRow: {
    marginBottom: '10rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingCategoryListHeading: {
    marginRight: '23rem',
    lineHeight: '21rem',
    color: Colors.darkGray,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  ratingCategoryBgLine: {
    width: '100% - 131rem',
    height: '6rem',
    backgroundColor: Colors.lightRed,
    borderRadius: '6rem',
    marginLeft: 'auto',
  },
  ratingCategoryFillLine: {
    width: '100%',
    height: '6rem',
    backgroundColor: Colors.pink,
    borderRadius: '6rem',
  },
  reviewsHeadingStyle: {
    marginTop: '23rem',
  },
  reviewContent: {
    marginBottom: '23rem',
  },
  reviewUserImgText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '7rem',
  },
  reviewsUserImage: {
    width: '40rem',
    height: '40rem',
    borderRadius: '12rem',
  },
  reviewUserRightText: {
    paddingLeft: '12rem',
  },
  reviewUserNameText: {
    marginBottom: '3rem',
    lineHeight: '21rem',
    color: Colors.black,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  reviewUserDateText: {
    color: Colors.darkGray,
  },
  reviewRatingStarTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingText: {
    color: Colors.black,
    marginRight: '11rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.buttonText,
  },
  reviewRatingStarRow: {
    marginHorizontal: '-2rem',
  },
  reviewRatingStarParegraph: {
    lineHeight: '21rem',
    color: Colors.darkGray,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  readMoreLessText: {
    lineHeight: '21rem',
    color: Colors.darkGray,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  bookNowBtnContentStyle: {
    paddingBottom: isIphoneX() ? '30rem' : '20rem',
    bottom: 0,
  },
  mapStyle: {
    width: '100%',
    height: '218rem',
  },
  bookNowBtnContent: {
    backgroundColor: Colors.white,
    padding: '20rem',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: windowWidth,
    bottom: isIphoneX() ? '30rem' : 0,
    left: 0,
    '@media ios': {
      paddingBottom: '30rem',
      bottom: 0,
    },
  },
  bookNowBtn: {
    width: '200rem',
  },
  bookNowBtnPriceTexts: {
    marginLeft: 'auto',
  },
  bookNowBtnPriceText: {
    color: Colors.pink,
    lineHeight: '20rem',
    textAlign: 'right',
    marginBottom: '6rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.buttonText,
  },
  bookNowBtnPricePerText: {
    color: Colors.darkGray,
    lineHeight: '21rem',
    textAlign: 'right',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  confirmPayBtn: {
    width: '196rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  bookHistoryContainer: {
    paddingHorizontal: '20rem',
  },
});

export default styles;

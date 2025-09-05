import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  categoryContainer: {
    backgroundColor: Colors.white,
    borderRadius: '18rem',
    paddingVertical: '12rem',
    paddingLeft: '12rem',
    paddingRight: '17rem',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10rem',
  },
  categoryPropartyImgContent: {
    borderRadius: '10rem',
    shadowOffset: {
      width: '1rem',
      height: '10rem',
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 10,
    shadowColor: Colors.shadowLighterBlack,
    marginRight: '17rem',
  },
  categoryPropartyImg: {
    width: '72rem',
    height: '72rem',
    borderRadius: '10rem',
  },
  categoryRightContent: {
    width: '100% - 158rem',
  },
  categoryHeadingLikeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5rem',
  },
  categoryHeading: {
    color: Colors.black,
    fontSize: Fonts.size.medium,
    ...Fonts.style.boldText,
    width: '100% - 200rem',
  },
  categoryLikeBtn: {
    marginLeft: 'auto',
  },
  categoryLikeImg: {
    width: '13rem',
    height: '13rem',
  },
  sliderRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  categoryPriceText: {
    color: Colors.pink,
    fontSize: Fonts.size.tiny,
    ...Fonts.style.buttonText,
  },
  categoryPriceRatingText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8rem',
  },
  categoryRatingStarImg: {
    width: '11.27rem',
    height: '11.27rem',
  },
  sliderRatingStarText: {
    color: Colors.darkGray,
    lineHeight: '18rem',
    marginLeft: '2.87rem',
    fontSize: Fonts.size.tiny,
    '@media ios': {
      ...Fonts.style.normalText,
    },
    '@media android': {
      ...Fonts.style.textInputText,
    },
  },
  categoryBottomRoomDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBottomRoomDetailImgText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryRoomDetailImg: {
    width: '11rem',
    height: '11rem',
    marginRight: '5rem',
  },
  categoryCollectionPriceRatingTex: {
    marginBottom: 0,
  },
  categoryLocationImgText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8rem',
  },
  categoryLocationImg: {
    width: '11rem',
    height: '11rem',
    marginRight: '5.94rem',
  },
  categoryLocationText: {
    lineHeight: '18rem',
    color: Colors.darkGray,
    fontSize: Fonts.size.tiny,
    ...Fonts.style.normalText,
  },
});

export default styles;

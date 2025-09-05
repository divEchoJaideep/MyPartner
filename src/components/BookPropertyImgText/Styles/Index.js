import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  propertyDetaileImageContent: {
    width: '100%',
    height: '230rem',
    borderRadius: '12rem',
    overflow: 'hidden',
    marginBottom: '23rem',
  },
  propertyDetaileImage: {
    width: '100%',
    height: '100%',
  },
  propertyDetaileImageBackground: {
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
  propertyDetaileDescriptionContent: {
    flexDirection: 'row',
    marginBottom: '8rem',
  },
  commanHeadingContainerStyle: {
    marginBottom: 0,
  },
  propertyDetaileHeadingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: '-7.5rem',
  },
  propertyDetaileHeadingIconBtn: {
    width: '15rem',
    height: '15rem',
    marginHorizontal: '7.5rem',
  },
  propertyDetaileHeadingIcon: {
    width: '100%',
    height: '100%',
  },
  propertyDetaileDescriptionPeregraph: {
    lineHeight: '18rem',
    color: Colors.darkGray,
    marginBottom: '6rem',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.tiny,
  },
  propertyDetaileLocationTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '6rem',
  },
  propertyDetaileLocationImg: {
    width: '14rem',
    height: '16.9rem',
    marginRight: '6rem',
  },
  propertyDetaileLocationText: {
    lineHeight: '21rem',
    color: Colors.locationDarkGray,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
  },
  propertyDetaileRatingStarRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default styles;

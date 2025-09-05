import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
import {isIphoneX} from '../../../libs/Utils';
import {Colors, Fonts} from '../../../theme';

const windowWidth = Dimensions.get('window').width;
const styles = EStyleSheet.create({
  bookNowBtnContent: {
    backgroundColor: Colors.white,
    padding: '20rem',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: windowWidth,
    bottom: isIphoneX() ? '30rem' : 0,
    left: 0,
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
    ...Fonts.style.buttonText,
    fontSize: Fonts.size.regular,
  },
  bookNowBtnPricePerText: {
    color: Colors.darkGray,
    lineHeight: '21rem',
    textAlign: 'right',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
  },
  confirmPayBtn: {
    width: '196rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default styles;

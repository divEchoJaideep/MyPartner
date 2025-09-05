import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: '10rem',
  },

  viewStyle: {
    paddingVertical: 10,
    marginBottom: '5rem',
    marginHorizontal: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flatlistView: {
    backgroundColor: Colors.white,
    paddingTop: '10rem',
    marginVertical: '20rem',
    borderRadius: '20rem',
    shadowColor: '#000000',
    shadowOffset: {
      width: '0rem',
      height: '8rem',
    },
    shadowOpacity: '0.07rem',
    shadowRadius: '3.3rem',
    elevation: '3rem',
    // width: '280rem',
    // height:'400rem',
    marginHorizontal: '20rem',
    alignItems: 'center',
    // justifyContent:'center'
  },
  textStyle: {
    fontSize: Fonts.size.h4,
    ...Fonts.style.textInputText,
    marginRight: '5rem',
  },
  randomText: {
    color: Colors.darkGray,
    fontSize: Fonts.size.regular,
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineStyle: {
    borderColor: Colors.darkGray,
    borderBottomWidth: '1rem',
    width: '85%',
    marginVertical: '30rem',
  },
  bigTextStyle: {
    fontSize: Fonts.size.h1,
    ...Fonts.style.buttonText,
  },
  textnormal: {
    color: Colors.darkGray,
    fontSize: Fonts.size.h4,
    paddingVertical: '6rem',
    textDecorationLine: 'line-through',
  },
  textbold: {
    fontSize: Fonts.size.h4,
    paddingVertical: '6rem',
  },
  pointPink: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F15F5F',
    marginRight: 5,
  },
  pointGrey: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'grey',
    marginRight: 5,
  },
  pointedStyleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  offerText: {
    backgroundColor: Colors.pink,
    color: Colors.white,
    padding: '10rem',
    borderRadius: '20rem',
    marginVertical: '20rem',
    fontWeight: 'bold',
    position: 'absolute',
    top: '-50rem',
  },
  btnStyle: {
    backgroundColor: Colors.pink,
    width: '70%',
  },
  commanBtnTextStyle: {
    color: Colors.white,
  },
  randomtextStyle: {
    fontSize: Fonts.size.h4,
    paddingVertical: '6rem',
  },
  moneyBackView: {
    backgroundColor: Colors.white,
    paddingTop: '10rem',
    marginVertical: '20rem',
    borderRadius: '20rem',
    shadowColor: '#000000',
    shadowOffset: {
      width: '0rem',
      height: '8rem',
    },
    shadowOpacity: '0.07rem',
    shadowRadius: '3.3rem',
    elevation: '3rem',
    marginHorizontal: '20rem',
    alignItems: 'center',
  },
  moneyBackImage: {
    width: '100rem',
    height: '100rem',
  },
  line2Style: {
    borderColor: Colors.gray,
    borderBottomWidth: '1rem',
    width: '85%',
    marginVertical: '30rem',
  },
  randomText2: {
    color: Colors.darkGray,
    fontSize: Fonts.size.regular,
    marginVertical: '5rem',
  },
  callnumberStyle: {
    color: Colors.pink,
  },
});

export default styles;

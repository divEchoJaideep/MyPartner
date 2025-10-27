import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: '20rem',
  },

  birthdayText: {
    fontSize: Fonts.size.h3,
    color: Colors.black,
    alignSelf: 'center',
    marginVertical: '20rem',
  },
  innerView: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '50%',
    backgroundColor: Colors.white,
    padding: '30rem',
    borderRadius: '20rem',
    shadowColor: '#000000',
    shadowOffset: {
      width: '0rem',
      height: '8rem',
    },
    shadowOpacity: '0.07rem',
    shadowRadius: '3.3rem',
    elevation: '3rem',
  },

  btnStyle: {
    backgroundColor: Colors.pink,
    marginTop: '20%',
  },

  commanBtnTextStyle: {
    color: Colors.white,
  },

  viewStyle: {
    paddingVertical: 10,
    marginBottom: '5rem',
    marginHorizontal: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    alignSelf: 'center',
    height: '120rem',
    width: '120rem',
    borderRadius: '60rem',
  },
  nameStyle: {
    fontSize: Fonts.size.h3,
    color: Colors.pink,
  },
  textStyle: {
    fontSize: '16rem',
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
  detailsStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  flatlistView: {
    backgroundColor: Colors.white,
    paddingTop: '10rem',
    marginTop: '20rem',
    marginLeft: '2rem',
    marginRight: '2rem',
    borderRadius: '20rem',
    shadowColor: '#000000',
    shadowOffset: {
      width: '0rem',
      height: '8rem',
    },
    shadowOpacity: '0.07rem',
    shadowRadius: '3.3rem',
    elevation: '3rem',
  },
  buttonName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '14rem',
    borderRadius: '35rem',
  },
  midlBtn: {
    borderColor: Colors.yellow,
  },
  controlNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.black,
    marginTop: '10rem',

    borderBottomLeftRadius: '20rem',
    borderBottomRightRadius: '20rem',
  },
  btnText: {
    color: Colors.white,
    fontSize: Fonts.size.h4,
  },
  leftBtn: {
    borderColor: Colors.red,
  },
});

export default styles;

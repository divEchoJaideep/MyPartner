import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: '15rem',
    flex: 1,
    width: '100%',
    // alignItems: 'center',
    // justifyContent:'space-between',
  },
  nextStartBtn: {
    paddingHorizontal: '12rem',
    paddingVertical: '14rem',
    overflow: 'hidden',
    textAlign: 'center',
    color: Colors.white,
    width: '165rem',
    height: '50rem',
    fontSize: Fonts.size.h4,
    ...Fonts.style.boldText,
  },
  nextFirstStartBtnView: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '30rem',
  },
  nextStartBtnView: {
    backgroundColor: Colors.violet,
    borderRadius: '12rem',
    marginLeft: 'auto',
    width: '100%',
    height: '50rem',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: '1rem',
      height: '10rem',
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurPink,
  },
  loginBtn: {
    backgroundColor: Colors.white,
    borderColor: Colors.violet,
    borderRadius: '12rem',
    borderWidth: 2,
    marginTop: '10rem',
  },
  loginBtnText: {
    color: Colors.violet,
  },
});

export default styles;

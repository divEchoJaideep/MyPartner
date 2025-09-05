import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '15rem',
    paddingHorizontal: '40rem',
  },
  successContent: {
    flex: 1,
    marginVertical: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successImage: {
    width: '82rem',
    height: '82rem',
    marginBottom: '20rem',
  },
  successHeading: {
    lineHeight: '45rem',
    marginBottom: '38rem',
    color: Colors.black,
    fontSize: Fonts.size.larg,
    ...Fonts.style.buttonText,
  },
  successPeregraph: {
    lineHeight: '21rem',
    color: Colors.darkGray,
    width: '233rem',
    textAlign: 'center',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
  },
  successBtn: {
    width: '100%',
  },
});

export default styles;

import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingTop: '23rem',
    paddingHorizontal: '20rem',
  },
  bigTextView: {
    marginVertical: '50rem',
  },
  bigText: {
    fontSize: Fonts.size.h2,
    color: Colors.black,
    alignSelf: 'center',
  },
  btnView: {
    marginVertical: 'auto',
    marginHorizontal: '30rem',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '20rem',
    paddingTop: '40rem',
    paddingBottom: '20rem',
  },
  backButton: {
    padding: '10rem',
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20rem',
  },
  optionButton: {
    padding: '10rem',
    margin: '10rem',
    borderWidth: '1rem',
    borderColor: Colors.pink,
    borderRadius: 10,
  },
  selectedOption: {
    backgroundColor: Colors.pink,
    color: Colors.white,
  },
  optionButtonText: {
    fontSize: Fonts.size.h4,
    color: Colors.black,
  },
  commanBtnStyle: {
    backgroundColor: Colors.pink,
  },
});

export default styles;

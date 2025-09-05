import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: '20rem'
  },
  categoryPropartyImgStyle: {
    width: '95rem',
    height: '95rem'
  },
  categoryRightContentStyle: {
    width: '100% - 177rem',
  },
  profilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: '20rem',
  },
  profile: {
    width: '48%',
    marginBottom: '10rem',
    backgroundColor: Colors.lightGreen,
    borderRadius: '10rem',
    overflow:"hidden"
  },
  profileImage: {
    width: '100%',
    height: '200rem',
  },
  profileName: {
    marginTop: '10rem',
    textAlign: 'center',
    ...Fonts.style.buttonText,
    fontSize: Fonts.size.h4,
    position: 'absolute',
    bottom: '5rem',
    left: '5rem',
    color: Colors.white,
  },
});

export default styles;
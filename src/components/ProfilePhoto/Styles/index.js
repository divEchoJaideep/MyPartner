import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../../theme';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const styles = EStyleSheet.create({
  profileEditContent: {
    width: '110rem',
    alignSelf: 'center',
    marginBottom: '33rem',
  },
  userEditImageBtn: {
    position: 'absolute',
    right: '8rem',
    bottom: '2rem',
  },
  profileImage: {
    width: '110rem',
    height: '110rem',
    borderRadius: '110rem',
    resizeMode: 'stretch'
  },
  profileInputStyle: {
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    backgroundColor: Colors.transparent,
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingTop: '8rem',
    paddingBottom: '15rem',
  },
  userEditImage: {
    width: '15rem',
    height: '15rem',
  },

  uploadImageBtn: {
    width: (width - 90) / 3,
    height: '130rem',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: '10rem',
    marginVertical: '15rem',
    borderWidth: '1rem',
    borderStyle: 'dashed',
    borderColor: Colors.pink,
    borderRadius: 10,
  },
  uploadImage: {
    width: '30rem',
    height: '30rem',
  },
  uploadedImage: {
    width: '30rem',
    height: '30rem',
    position: 'absolute',
    // right: -15,
    // top: -15,
  },
  uploadedImageView: {
    width: '30rem',
    height: '30rem',
    position: 'absolute',
    right: -15,
    top: -15,
  },
});

export default styles;

import EStyleSheet from 'react-native-extended-stylesheet';
import {StatusBar} from 'react-native';
import {Colors} from '../../../theme';

const styles = EStyleSheet.create({
  safeViewcontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.lighterGray,
  },
  safeViewcontainerStatusBar: {
    '@media android': {
      marginTop: StatusBar.currentHeight,
    },
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  statusBarMarginTop: {
    marginTop: StatusBar.currentHeight,
  },
  // safeViewcontainer:{
  //   flex:1,
  // },
});

export default styles;

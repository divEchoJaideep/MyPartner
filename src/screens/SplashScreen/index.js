import * as React from 'react';
import { TouchableOpacity, Text, View, Image, Dimensions } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Container, Content } from '../../components';
import Welcome from '../../components/Welcome';
import { Images } from '../../theme';
import styles from './Styles/SplashStyle';

import { addEventListener } from '@react-native-community/netinfo';
import DropdownAlert, {
  DropdownAlertData,
  DropdownAlertType,
} from 'react-native-dropdownalert';

import { useDispatch, useSelector } from 'react-redux';

import { loginSuccess, logout } from '../../redux/actions/authActions';

import AsyncStorageGetItem from '../../hooks/AsyncStorageGetItem';
import GetProfleData from '../../api/GetProfile';
import { setPreDefineState } from '../../redux/reducers/perDefineListReducer';
import { getUserInfo } from '../../redux/actions/userDetailsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonrequest from '../../api/commonrequest';
import { profiledropdownUrl } from '../../api/const';

function SplashScreen() {
  const navigation = useNavigation();
  let dropDownAlertRef = React.useRef();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubsribe = addEventListener(async state => {
      if (state.isConnected == true) {
        await getProfile();
        checkData();
      } else {
        dropDownAlertRef({
          type: DropdownAlertType.Error,
          title: 'Internet Connection Error',
          message: 'Please enable your internet connection',
        });
      }
    });
    unsubsribe();
  }, [navigation]);

  const getProfile = async () => {
    const token = await AsyncStorage.getItem('UserToken');
    // console.log("Splash screen token: ", token)
    const response = await commonrequest("GET", profiledropdownUrl, "", token,)
     console.log("getProfile response?.data: ", response)
    dispatch(setPreDefineState(response?.data))
  };

  const checkData = async () => {
    try {
      let userData = await AsyncStorageGetItem('userData');
      const token = await AsyncStorage.getItem('UserToken');
      if (userData) {
        userData = JSON.parse(userData);
        dispatch(loginSuccess(userData));
        dispatch(getUserInfo(token || userData?.access_token))
        if (userData.user.phone_verify == 0) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'OtpSignUpNumber' }],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            }),
          );
        }
      } else {
        dispatch(logout());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'WelCome' }],
          }),
        );

        //dispatch(navigateToLogout());
      }
    } catch (error) {
      // console.error('Error reading user data from AsyncStorage:', error);
    }
  };

  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        <Welcome
          key={1}
          heading="Welcome Ring Matrimony"
          image={Images.Logo}
          welcomeSlideImgStyle={styles.welcomeTwoSlideImg}
        />
        {/* <View style={styles.nextFirstStartBtnView}>
          <TouchableOpacity
            style={styles.nextStartBtnView}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.nextStartBtn}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nextStartBtnView, styles.loginBtn]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.nextStartBtn, styles.loginBtnText]}>
              Already Login !
            </Text>
          </TouchableOpacity>
        </View> */}
      </Content>
    </Container>
  );
}

export default SplashScreen;
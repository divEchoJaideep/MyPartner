import * as React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Container, Content } from '../../components';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import TextInput from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn/index';
import styles from './Styles/LogInStyle';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { Images } from '../../theme';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from '../../redux/actions/authActions';
import AsyncStorageSetItem from '../../hooks/AsyncStorageSetItem';
import Login from '../../api/Login';
import GetUserDashboard from '../../api/GetUserDashboard';
import { users } from './staticUsers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';

function LogInScreen() {
  const { login } = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector(state => state.auth);
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginUser = async () => {
    if (!phone || !password) {
      Alert.alert('Login Failed', 'Phone and password are required.');
      return;
    }

    try {
      dispatch(loginRequest());
      const user = await Login({ phone: phone, password: password });
      console.log('user login: ', user);
      if (!user?.result) {
        dispatch(loginFailure(user.message));
        
        const passwordErrors = user?.data?.password?.join('\n');
        const message = passwordErrors || user?.message || 'Login failed. Try again.';

        Alert.alert('Login Failed', message);
        return;
      }
      
      await AsyncStorageSetItem('userData', user);
      await AsyncStorage.setItem('UserToken', user.access_token);
      //await AsyncStorage.setItem('isAuthenticated', 'true');
     await login(user.access_token, user);
      dispatch(loginSuccess(user));

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'AppStack' }],
        })
      );
    } catch (e) {
      console.error('Error during login:', e);
      dispatch(loginFailure(e.message));
      Alert.alert('Error', e.message || 'Something went wrong during login.');
    }
  };
  
  return (
    <Container>
      <Content
        hasHeader
        contentContainerStyle={styles.container}
        extraScrollHeight={1}>
        <Loading loading={loading} />
        <LogoHeading heading="Log in" />
        <Error error={error} />
        <View style={styles.signupLoginInputGroup}>
          <TextInput
            defaultInput
            placeholder="Phone number"
            type="number-pad"
            navigation={navigation}
            onChangeText={setPhone}
            value={phone}
          />
          <TextInput
            passwordInput
            placeholder="Password"
            type="default"
            navigation={navigation}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity
            style={styles.forgotPasswordLink}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>
          <CommanBtnScreen
            btnText="Log in"
            commanBtnStyle={styles.signUpLogInBtn}
            commanBtnTextStyle={styles.commanBtnTextStyle}
            onBtnPress={() => loginUser()}
          />
          <Text style={styles.bottomAccountText}>
            Don’t have an account yet? {''}
            <Text
              style={styles.loginSignupBtnText}
              onPress={() => navigation.navigate('Signup')}>
              Sign up
            </Text>
          </Text>
        </View>
      </Content>
    </Container>
  );
}

export default LogInScreen;
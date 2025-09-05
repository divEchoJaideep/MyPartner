import * as React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Container, Content } from '../../components';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import TextInput from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn/index';
import styles from './Styles/SignupStyle';
import { Images } from '../../theme';
import {
  signupRequest,
  signupSuccess,
  signupFailure,
} from '../../redux/actions/authActions';
import AsyncStorageSetItem from '../../hooks/AsyncStorageSetItem';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import SignUp from '../../api/SignUp';

function SignupScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector(state => state.auth);
  const [phone, setPhone] = React.useState();
  const [password, setPassword] = React.useState();

  const getMessageAsString = (msg) => {
    if (Array.isArray(msg)) return msg.join('\n');
    if (typeof msg === 'object') return JSON.stringify(msg);
    if (typeof msg === 'string') return msg;
    return 'Something went wrong';
  };

  const registerUser = async () => {
    try {
      dispatch(signupRequest());
      const response = await SignUp({
        phone: phone,
        password: password,
      });

      if (response?.success) {
        //dispatch(signupSuccess(response));
        Alert.alert('Success', response?.message || 'Signup successful');
        navigation.navigate('OtpSignUpNumber', {
          phone: phone,
          password: password,
        });
      } else {
        dispatch(signupFailure(response?.message));
        Alert.alert('Failed', response?.message || 'Signup Failed');
      }
    } catch (error) {
      dispatch(signupFailure(error?.message));
      Alert.alert('Error', 'Something went wrong');
    }
  };



  return (
    <Container>
      <Content hasHeader extraScrollHeight={1} contentContainerStyle={styles.container}>
        <LogoHeading heading="Sign up" />
        <View style={styles.signupLoginInputGroup}>
          {/* <TextInput
            defaultInput
            placeholder="Full name"
            type="default"
            navigation={navigation}
          />
          <TextInput
            defaultInput
            placeholder="E-mail address"
            type="email-address"
            navigation={navigation}
          /> */}
          <TextInput
            defaultInput
            placeholder="Phone number"
            type="phone-pad"
            navigation={navigation}
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            passwordInput
            placeholder="Password"
            type="default"
            navigation={navigation}
            inputStyle={styles.passwordInputStyle}
            passwordStyle={styles.lastInputStyle}
            value={password}
            onChangeText={setPassword}
          />
          <CommanBtnScreen
            btnText="Sign up"
            commanBtnStyle={styles.signUpLogInBtn}
            commanBtnTextStyle={styles.commanBtnTextStyle}
            onBtnPress={() => registerUser()}
          />

          <Text style={styles.bottomAccountText}>
            Already have an account?{' '}
            <Text
              style={styles.loginSignupBtnText}
              onPress={() => navigation.navigate('Login')}>
              Log in
            </Text>
          </Text>
        </View>
      </Content>
    </Container>
  );
}

export default SignupScreen;
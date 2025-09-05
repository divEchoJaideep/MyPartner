import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Content } from '../../components';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/CommanText';
import OtpInputs from 'react-native-otp-inputs';
import ResetPassword from '../../components/SignUpLogIn/ResetPassword';
import { forgotPassword, resetPassword } from '../../api/api';
import Toast from 'react-native-toast-message';
import styles from './Styles/OtpStyle';

function OtpForgotPasswordScreen({ navigation, route }) {
  const { email_or_phone, send_code_by } = route?.params || {};

  const [data, setdata] = useState({
    verification_code: '',
    password: '',
    send_code_by: send_code_by,
    email_or_phone: email_or_phone,
    password_confirmation: ''
  });

  // countdown states
  const [secondsLeft, setSecondsLeft] = useState(120); // 2 minutes = 120 sec

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePasswordChange = async () => {
    const response = await resetPassword(data);
    console.log('response :', response);

    if (response.success) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response?.message || 'Password reset successfully',
      });
      navigation.navigate('Login');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response?.message || 'Failed to reset password',
      });
    }
  };


  const ResendCode = async () => {

    const resenddata = { send_code_by: send_code_by, email_or_phone: email_or_phone }

    const response = await forgotPassword(resenddata);
    console.log('response :', response);

    if (response?.result) {
      Toast.show({
        // swipeable: true,
        type: 'success',
        text1: 'OTP Sent',
        text2: `${response?.message || 'OTP sent successfully'} to +91${email_or_phone}`,
      });
      setSecondsLeft(120);
    } else {
      Toast.show({
        type: 'error',
        text1: 'OTP not sent',
        text2: response?.message || 'Failed to send OTP',
      });
    }

  }

  return (
    <Container>
      <Content hasHeader contentContainerStyle={styles.container}>
        <View style={styles.signupLoginInputGroup}>
          <LogoHeading
            heading="Confirm Your Number"
            logoHeadingStyle={styles.logoHeadingStyle}
          />
          <CommanText
            commanText={`Enter the code we sent over SMS to ${email_or_phone}`}
            commanTextstyle={styles.confirmNumberText}
          />

          <OtpInputs
            handleChange={code => {
              setdata({ ...data, verification_code: code });
            }}
            numberOfInputs={4}
            style={styles.otpInputContainer}
            inputStyles={styles.otpInputStyle}
            autofillFromClipboard={false}
          />

          <CommanText
            commanText="New Password"
            commanTextstyle={styles.inputLabelText}
          />
          <ResetPassword
            passwordInput
            placeholder="New Password"
            type="default"
            inputStyle={styles.changePasswordInput}
            onChangeText={text => setdata({ ...data, password: text })}
            value={data.password}
          />
          <CommanText
            commanText="Confirm Password"
            commanTextstyle={styles.inputLabelText}
          />
          <ResetPassword
            passwordInput
            placeholder="Confirm Password"
            type="default"
            inputStyle={styles.changePasswordInput}
            onChangeText={text =>
              setdata({ ...data, password_confirmation: text })
            }
            value={data.password_confirmation}
          />

          {secondsLeft > 0 ? (
            <Text style={styles.bottomAccountText}>
              Resend code in {formatTime()}
            </Text>
          ) : (
            <TouchableOpacity style={styles.xyz} onPress={() => ResendCode()}>
              <Text style={styles.bottomAccountText}>
                Didn’t get a code?{' '}
                <Text style={styles.loginSignupBtnText}>Resend</Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.bottomContinueBtn}>
          <CommanBtnScreen
            btnText="Continue"
            commanBtnStyle={styles.otpContinueBtn}
            onBtnPress={() => handlePasswordChange()}
          />
        </View>
      </Content>
    </Container>
  );
}

export default OtpForgotPasswordScreen;

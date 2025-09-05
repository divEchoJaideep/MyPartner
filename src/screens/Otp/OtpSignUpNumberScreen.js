import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Container, Content } from '../../components';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/CommanText';
import OtpInputs from 'react-native-otp-inputs';
import AnimatedEllipsis from '../../components/AnimatedEllipsis';

import styles from './Styles/OtpStyle';

function OtpSignUpNumberScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { phone, password } = route.params;

  const [otpInputFill, setOtpInputFill] = useState(true);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const [showResend, setShowResend] = useState(false);

  const optConfirm = '1234'; // Replace this with actual OTP logic

  // Countdown timer logic
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else {
      setShowResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOtpChange = code => {
    setEnteredOtp(code);

    if (code.length === 4) {
      if (code === optConfirm) {
        setOtpInputFill(false);
        setTimeout(() => {
          navigation.navigate('SuccessNumber', { phone, password });
        }, 3000);
      } else {
        Alert.alert('Invalid OTP', 'The code you entered is incorrect.');
      }
    }
  };

  const handleResend = () => {
    Alert.alert('OTP Resent', `OTP has been resent to ${phone}`);
    // Reset timer
    setCountdown(120);
    setShowResend(false);
    // Trigger resend API here
  };

  const handleContinue = () => {
    if (enteredOtp === optConfirm) {
      navigation.navigate('Login');
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
    }
  };

  return (
    <Container>
      <Content hasHeader contentContainerStyle={styles.container}>
        <View style={styles.signupLoginInputGroup}>
          <LogoHeading
            heading="Confirm Your Number"
            logoHeadingStyle={styles.logoHeadingStyle}
          />

          <CommanText
            commanText={`Enter the code we sent over SMS to ${phone}`}
            commanTextstyle={styles.confirmNumberText}
          />

          {otpInputFill ? (
            <OtpInputs
              handleChange={handleOtpChange}
              numberOfInputs={4}
              style={styles.otpInputContainer}
              inputStyles={styles.otpInputStyle}
              autofillFromClipboard={false}
            />
          ) : (
            <View style={styles.loaderContent}>
              <AnimatedEllipsis
                numberOfDots={5}
                minOpacity={0.4}
                animationDelay={200}
                style={styles.loaderDotsStyle}
              />
            </View>
          )}

          {/* Countdown or Resend */}
          {showResend ? (
            <Text style={styles.bottomAccountText}>
              Didn’t get a code?{' '}
              <Text style={styles.loginSignupBtnText} onPress={handleResend}>
                Resend
              </Text>
            </Text>
          ) : (
            <Text style={styles.bottomAccountText}>
              Resend available in {formatTime(countdown)}
            </Text>
          )}
        </View>

        <View style={styles.bottomContinueBtn}>
          <CommanBtnScreen
            btnText="Continue"
            commanBtnStyle={styles.otpContinueBtn}
            onBtnPress={handleContinue}
          />
        </View>
      </Content>
    </Container>
  );
}

export default OtpSignUpNumberScreen;

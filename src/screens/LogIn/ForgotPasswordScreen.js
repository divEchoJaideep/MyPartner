import * as React from 'react';
import { View, Text } from 'react-native';
import { Container, Content } from '../../components';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import TextInput from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/CommanText';
import styles from './Styles/LogInStyle';
import { forgotPassword } from '../../api/api';
import Toast from 'react-native-toast-message';

function ForgotPasswordScreen({ navigation }) {

  const [data, setData] = React.useState({
    send_code_by: 'phone',
    email_or_phone: ''
  })
  const forgotUserPassword = async () => {

    const response = await forgotPassword(data);
    console.log('response :', response);

    if (response?.result) {
      Toast.show({
        type: 'success',
        text1: 'OTP Sent',
        text2: response?.message || 'OTP sent successfully',

      })
      navigation.navigate('OtpForgotPassword', {
        email_or_phone: data.email_or_phone,
        send_code_by: data.send_code_by
      });

    } else {
      Toast.show({
        type: 'error',
        text1: 'OTP not sent',
        text2: response?.message || 'Failed to send OTP',
      })
    }

  }

  return (
    <Container transparentStatusBar={true}>
      <Content hasHeader contentContainerStyle={styles.container}>
        <LogoHeading heading="Forgot Password" />
        <View style={styles.signupLoginInputGroup}>
          <CommanText
            commanText="Enter your registered phone number below"
            commanTextstyle={styles.forgotPasswordPageText}
          />
          <TextInput
            defaultInput
            placeholder="Phone number"
            type="number-pad"
            inputStyle={styles.forgotPasswordInput}
            onChangeText={(text) => setData({ ...data, email_or_phone: text })}
            value={data.email_or_phone}
            maxLength={10}
          />
          <CommanBtnScreen
            btnText="Submit"
            commanBtnStyle={styles.signUpLogInBtn}
            commanBtnTextStyle={styles.commanBtnTextStyle}
            onBtnPress={() => forgotUserPassword()}
          />
        </View>
        <Text style={styles.bottomAccountText}>
          Remember the password? {''}
          <Text
            style={styles.loginSignupBtnText}
            onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
        </Text>
      </Content>
    </Container>
  );
}

export default ForgotPasswordScreen;

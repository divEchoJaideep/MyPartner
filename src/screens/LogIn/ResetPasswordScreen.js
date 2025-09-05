import * as React from 'react';
import {View} from 'react-native';
import {Container, Content, Header} from '../../components';
import ResetPassword from '../../components/SignUpLogIn/ResetPassword';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/CommanText';
import styles from './Styles/LogInStyle';
import {navigate} from '../../navigation/ReduxNavigation';

function ResetPasswordScreen({navigation}) {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Reset Password"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.resetPasswordContainer}>
        <View style={styles.signupLoginInputGroup}>
          <CommanText
            commanText="Enter a different password with the previous"
            commanTextstyle={[
              styles.forgotPasswordPageText,
              styles.resetPageText,
            ]}
          />
          <CommanText
            commanText="New Password"
            commanTextstyle={styles.inputLabelText}
          />
          <ResetPassword
            passwordInput
            placeholder="New Password"
            type="default"
            inputStyle={styles.resetPasswordInput}
            navigation={navigate}
          />
          <CommanText
            commanText="Confirm Password"
            commanTextstyle={styles.inputLabelText}
          />
          <ResetPassword
            passwordInput
            placeholder="Confirm Password"
            type="default"
            inputStyle={styles.resetPasswordInput}
            navigation={navigate}
          />
          <CommanBtnScreen
            btnText="Reset Password"
            commanBtnStyle={styles.signUpLogInBtn}
            commanBtnTextStyle={styles.commanBtnTextStyle}
            onBtnPress={() => navigation.navigate('SuccessPassword')}
          />
        </View>
      </Content>
    </Container>
  );
}

export default ResetPasswordScreen;

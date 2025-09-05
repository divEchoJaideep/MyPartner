import * as React from 'react';
import { View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Content, Header } from '../../components';
import ResetPassword from '../../components/SignUpLogIn/ResetPassword';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/CommanText';
import styles from './Styles/ChangePasswordStyle';
import { navigate } from '../../navigation/ReduxNavigation';
import { changePassword, resetPassword } from '../../api/api';
import Toast from 'react-native-toast-message';

function ChangePasswordScreen({ navigation }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setdata] = React.useState({
    old_password: '',
    password: '',
    password_confirmation: ''
  })

  const handleChangePassword = async () => {

    setIsLoading(true);

    try {
      const token = await AsyncStorage.getItem('UserToken');
      console.log('token :', token);

      const response = await changePassword(data, token);

      console.log('response :', response);


      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.message || 'Password changed successfully',
        });

        // 1.5 second delay so user can see Toast
        setTimeout(() => {
          navigation.goBack();
        }, 1500);

      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Failed to change password',
        });
      }

    } catch (error) {
      // Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Change Password"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <View style={styles.signupLoginInputGroup}>
          <CommanText
            commanText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            commanTextstyle={styles.changePasswordPageText}
          />
          <CommanText
            commanText="Old Password"
            commanTextstyle={styles.inputLabelText}
          />
          <ResetPassword
            passwordInput
            placeholder="Old Password"
            type="default"
            inputStyle={styles.changePasswordInput}
            navigation={navigate}
            onChangeText={(text) => setdata({ ...data, old_password: text })}
            value={data.old_password}
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
            navigation={navigate}
            onChangeText={(text) => setdata({ ...data, password: text })}
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
            navigation={navigate}
            onChangeText={(text) => setdata({ ...data, password_confirmation: text })}
            value={data.password_confirmation}
          />
          <CommanBtnScreen
            btnText={isLoading ? "Changing..." : "Change Password"}
            commanBtnStyle={styles.changePasswordBtn}
            onBtnPress={handleChangePassword}
            disabled={isLoading}
          />
        </View>
      </Content>
    </Container>
  );
}

export default ChangePasswordScreen;
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import LogInScreen from '../screens/LogIn/LogInScreen';
import ForgotPasswordScreen from '../screens/LogIn/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/LogIn/ResetPasswordScreen';
import OtpSignUpNumberScreen from '../screens/Otp/OtpSignUpNumberScreen';
import OtpForgotPasswordScreen from '../screens/Otp/OtpForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="OtpSignUpNumber" component={OtpSignUpNumberScreen} />
      <Stack.Screen name="OtpForgotPassword" component={OtpForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardNavigation from './DashboardNavigation';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import LogInScreen from '../screens/LogIn/LogInScreen';
import ForgotPasswordScreen from '../screens/LogIn/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/LogIn/ResetPasswordScreen';
import OtpSignUpNumberScreen from '../screens/Otp/OtpSignUpNumberScreen';
import OtpForgotPasswordScreen from '../screens/Otp/OtpForgotPasswordScreen';
import ProfileData from '../screens/Profile/ProfileDataShowScreen';
import ProfileDetailsScreen from '../screens/Profile/ProfileDetailsScreen';
import EducationScreen from '../screens/Profile/EducationScreen';
import CareerScreen from '../screens/Profile/CareerScreen';
import PhysicalAttributes from '../screens/Profile/PhysicalAttributesScreen';
import PersonalAttitude from '../screens/Profile/PersonalAttitudeScreen';
import ResidencyInformation from '../screens/Profile/ResidencyInfoScreen';
import AddPhotoScreen from '../screens/Profile/AddPhotoScreen';
import PresentAddressScreen from '../screens/Profile/PresentAddressScreen';
import SocialBackground from '../screens/Profile/SocialBackgroundScreen';
import SelectProofScreen from '../screens/SelectProof/SelectProofScreen';
import MyStory from '../screens/Story/MyStory';
import SplashScreen from '../screens/SplashScreen';
import SubscriptionScreen from '../screens/Subscription/SubscriptionScreen';
import WishlistScreen from '../screens/Wishlist/WishlistScreen';
import CurrentLocationScreen from '../screens/CurrentLocation/CurrentLocationScreen';
import ProfileEditScreen from '../screens/ProfileEdit/ProfileEditScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import ChatDetailsScreen from '../screens/Chat/ChatDetailsScreen';
import ChangePasswordScreen from '../screens/ChangePassword/ChangePasswordScreen';
import StoryViewerScreen from '../screens/Story/StoryViewerScreen';
import PaymentMathodScreen from '../screens/PaymentMathod/PaymentMathodScreen';
import HelpCenterScreen from '../screens/HelpCenter/HelpCenterScreen';
import SafetyCenterScreen from '../screens/SafetyCenter/SafetyCenterScreen';
import TermsofServiceScreen from '../screens/TermsofService/TermsofServiceScreen';
import FeedbackScreen from '../screens/Feedback/FeedbackScreen';
import LanguageScreen from '../screens/Profile/LanguageScreen';
import InterestScreen from '../screens/Profile/InterestScreen';
import BlockedUser from '../screens/Block/BlockedUser';
import Test from '../screens/Test/Test';
import Walletscreen from '../screens/Wallet/Walletscreen';
import PrivacyPolicy from '../screens/TermsofService/PrivacyPolicy';
import BeSafe from '../screens/TermsofService/BeSafe';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard" >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="WelCome" component={WelcomeScreen} />
      <Stack.Screen name="Dashboard" component={DashboardNavigation} />
      <Stack.Screen name="ProfileData" component={ProfileData} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
      <Stack.Screen name="Education" component={EducationScreen} />
      <Stack.Screen name="Career" component={CareerScreen} />
      <Stack.Screen name="Physical" component={PhysicalAttributes} />
      <Stack.Screen name="Personal" component={PersonalAttitude} />
      <Stack.Screen name="Residency" component={ResidencyInformation} />
      <Stack.Screen name="AddPhoto" component={AddPhotoScreen} />
      <Stack.Screen name="PresentAddress" component={PresentAddressScreen} />
      <Stack.Screen name="Social" component={SocialBackground} />
      <Stack.Screen name="identityVerification" component={SelectProofScreen} />
      <Stack.Screen name="StoryBoard" component={MyStory} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
      <Stack.Screen name="CurrentLocation" component={CurrentLocationScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="chatDetails" component={ChatDetailsScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <Stack.Screen name="StoryViewerScreen" component={StoryViewerScreen} />
      <Stack.Screen name="PaymentMathodScreen" component={PaymentMathodScreen} />
      <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
      <Stack.Screen name="SafetyCenterScreen" component={SafetyCenterScreen} />
      <Stack.Screen name="TermsofServiceScreen" component={TermsofServiceScreen} />
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Interest" component={InterestScreen} />
      <Stack.Screen name="BlockedUser" component={BlockedUser} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Wallet" component={Walletscreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="BeSafe" component={BeSafe} />
    </Stack.Navigator>
  );
};

export default AppStack;

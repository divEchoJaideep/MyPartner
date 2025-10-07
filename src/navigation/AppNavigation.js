import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthContext } from '../context/AuthContext'; 
import { getUserInfo } from '../redux/actions/userDetailsActions';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from '../redux/actions/authActions';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const { isAuthenticated } = useContext(AuthContext); 
console.log('isAuthenticated: ',isAuthenticated);
 const dispatch = useDispatch();

  if (isAuthenticated === null) {
    return <SplashScreen />;
  }
  
  
  useEffect(() => {
    dispatch(loadUserFromStorage()); 
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="AppStack" component={AppStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;

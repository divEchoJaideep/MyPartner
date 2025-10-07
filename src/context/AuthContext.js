import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { restoreSession, logout as reduxLogout } from '../redux/reducers/authReducer';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const flag = await AsyncStorage.getItem('isAuthenticated');
        const token = await AsyncStorage.getItem('UserToken');
        const userData = await AsyncStorage.getItem('userData');

        const loggedIn = flag === 'true';

        if (loggedIn && token && userData) {
          dispatch(restoreSession({ token, user: JSON.parse(userData) }));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Error reading auth status:', err);
        setIsAuthenticated(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (token, user) => {
    await AsyncStorage.setItem('isAuthenticated', 'true');
    await AsyncStorage.setItem('UserToken', token);
    await AsyncStorage.setItem('userData', JSON.stringify(user));

    dispatch(restoreSession({ token, user }));
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['isAuthenticated', 'UserToken', 'userData']);
    dispatch(reduxLogout());
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

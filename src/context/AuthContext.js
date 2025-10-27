import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { restoreSession, logout as reduxLogout } from '../redux/reducers/authReducer';

export const AuthContext = createContext();

// 🔹 Global setter reference (for external control like globalLogout)
let setGlobalAuthState = null;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();

  // 🔹 Assign global setter so globalLogout() can update state
  useEffect(() => {
    setGlobalAuthState = setIsAuthenticated;
    return () => {
      setGlobalAuthState = null;
    };
  }, []);

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
  }, [dispatch]);

  // 🔹 Login method
  const login = async (token, user) => {
    await AsyncStorage.setItem('isAuthenticated', 'true');
    await AsyncStorage.setItem('UserToken', token);
    await AsyncStorage.setItem('userData', JSON.stringify(user));

    dispatch(restoreSession({ token, user }));
    setIsAuthenticated(true);
  };

  // 🔹 Logout method (called manually)
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

// 🔹 External function to change auth state from outside components
export const setAuthState = (value) => {
  if (setGlobalAuthState) {
    setGlobalAuthState(value);
  }
};

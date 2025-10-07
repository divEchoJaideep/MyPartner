import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageRemoveItem from '../../hooks/AsyncStorageRemoveItem';
import { authRequest, authSuccess, authFailure, logout as logoutAction, restoreSession } from '../reducers/authReducer'; 

export const loginRequest = () => ({
  type: 'LOGIN_REQUEST',
});

export const loginSuccess = (userData) => async (dispatch) => {
   if (userData?.access_token) {
        await AsyncStorage.setItem('UserToken', userData.access_token);
      }
 console.log('userData :',userData);
      await AsyncStorage.setItem('UserInfo', JSON.stringify(userData));
  dispatch(authSuccess(userData));
};

export const loginFailure = error => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

export const signupRequest = () => ({
  type: 'SIGNUP_REQUEST',
});

export const signupSuccess = userData => ({
  type: 'SIGNUP_SUCCESS',
  payload: userData,
});

export const signupFailure = error => ({
  type: 'SIGNUP_FAILURE',
  payload: error,
});

export const loadUserFromStorage = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem('UserToken');
      const userInfo = await AsyncStorage.getItem('UserInfo');

      if (token && userInfo) {
        const parsedUser = JSON.parse(userInfo);

        // Dispatch both token and user
        dispatch(restoreSession({ token, user: parsedUser }));

        console.log('parsedUser loadUserFromStorage :', parsedUser);
        console.log('token loadUserFromStorage :', token);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      dispatch(authFailure(error));
    }
  };
};


export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("UserInfo");
      await AsyncStorage.removeItem('UserToken'); 
      dispatch(logoutAction());
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };
};


import AsyncStorageRemoveItem from '../../hooks/AsyncStorageRemoveItem';
import { authRequest, authSuccess, authFailure, logout as logoutAction } from '../reducers/authReducer'; // ✅ FIXED: import logout

export const loginRequest = () => ({
  type: 'LOGIN_REQUEST',
});

export const loginSuccess = (userData) => async (dispatch) => {
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

export const logout = () => {
  return async dispatch => {
    try {
      await AsyncStorageRemoveItem('userData');
       await AsyncStorageRemoveItem('UserInfo');
      dispatch(logoutAction()); 
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };
};

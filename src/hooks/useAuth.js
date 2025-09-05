import React, {useState} from 'react';
import AsyncStorageSetItem from './AsyncStorageSetItem';
import AsyncStorageGetItem from './AsyncStorageGetItem';
import AsyncStorageRemoveItem from './AsyncStorageRemoveItem';
import Login from '../apis/Login';
import SignUp from '../apis/SignUp';
export function UseAuth() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            user: action.user ? action.user : {},
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            user: action.user ? action.user : {},
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            user: {},
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      user: {},
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let user;

      try {
        user = await AsyncStorageGetItem('userProfile');
      } catch (e) {
        dispatch({type: 'SIGN_OUT'});
      }
      user = JSON.parse(user);

      if (user) {
        dispatch({type: 'RESTORE_TOKEN', user: user});
      }
      //dispatch({type:'SET_LOADING'});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        let response = await Login(data);
        if (!response.success) {
          return response;
        }
        await AsyncStorageSetItem('userProfile', response.data.user);
        // await AsyncStorage.setItem(
        //     'userProfile',
        //     JSON.stringify(response.data.user)
        // );
        dispatch({type: 'SIGN_IN', user: response.data.user});
      },
      signOut: async () => {
        await AsyncStorageRemoveItem('userProfile');
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        const response = await SignUp(data);
        console.log('signUp useAuth:', response);
        if (!response.success) {
          return response;
        }

        await AsyncStorageSetItem('userProfile', response.data.user);
        dispatch({type: 'SIGN_IN', user: response.data.user});
      },
    }),
    [],
  );

  return {authContext, state};
}

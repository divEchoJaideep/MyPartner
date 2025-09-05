import {BackHandler, ToastAndroid} from 'react-native';

import * as types from '../actions/types';

const backHandler = () => {
  return (dispatch, getState) => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      try {
        const {nav, app} = getState();
        const {routes} = nav;
        const length = routes.length || 0;
        if (length === 1) {
          const {lastBack} = app;
          const currentTime = new Date().getTime();
          if (!(!!lastBack && lastBack + 10 * 1000 > currentTime)) {
            dispatch({
              type: types.SET_LAST_BACK_TIME,
              payload: {
                lastBack: currentTime,
              },
            });
            ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
          } else {
            return false;
          }
        }
        return true;
      } catch (error) {}
    });
  };
};

export default backHandler;

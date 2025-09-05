import {configureStore} from '@reduxjs/toolkit';
// import rootReducer from './reducers';

import authReducer from './reducers/authReducer';
import userDetailsReducer from './reducers/userDetailsReducer';
import perDefineListReducer from './reducers/perDefineListReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    userDetails: userDetailsReducer,
    preList: perDefineListReducer,
  },
});

export default store;
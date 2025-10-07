import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userDetailsReducer from './reducers/userDetailsReducer';
import perDefineListReducer from './reducers/perDefineListReducer';
import unreadReducer from './reducers/unreadSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    userDetails: userDetailsReducer,
    preList: perDefineListReducer,
    unread: unreadReducer, 
  },
});

export default store;

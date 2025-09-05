import { createSlice } from "@reduxjs/toolkit";
import { Success } from "../../theme/Images";

const userRequestReducer = createSlice({
  name: "userRequest",
  initialState: {
    loading: false,
    error: null,
    success: null,
    user_request: null,
    user_received_request: null,
    user_request_accepted: null,
    user_request_sent: null,
  },
  reducers: {
    authRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { authRequest, authSuccess, authFailure, logout } = userRequestReducer.actions;

export default userRequestReducer.reducer;
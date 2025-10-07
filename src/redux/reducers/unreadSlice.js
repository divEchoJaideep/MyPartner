import { createSlice } from '@reduxjs/toolkit';

export const unreadSlice = createSlice({
  name: 'unread',
  initialState: {
    totalUnread: 0,
  },
  reducers: {
    setUnread: (state, action) => {
      state.totalUnread = action.payload;
    },
  },
});

export const { setUnread } = unreadSlice.actions;
export default unreadSlice.reducer;

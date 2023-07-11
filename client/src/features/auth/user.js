import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    value: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value = null;
    },
  },
});

export const { addUser, removeUser } = user.actions;

export const userState = (state) => state.user.value;

export default user.reducer;

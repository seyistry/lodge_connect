import { createSlice } from '@reduxjs/toolkit';

export const likes = createSlice({
  name: 'likes',
  initialState: {
    value: {},
  },
  reducers: {
    addlikes: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    removelikes: (state, action) => {
      Reflect.deleteProperty(state.value, action.payload);
    },
    cleanLikes: (state) => {
      state.value = {};
    },
  },
});

export const { addlikes, removelikes, cleanLikes } = likes.actions;

export const likesState = (state) => state.likes.value;

export default likes.reducer;

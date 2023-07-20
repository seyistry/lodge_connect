import { createSlice } from '@reduxjs/toolkit';

export const apartment = createSlice({
  name: 'apartment',
  initialState: {
    value: {},
  },
  reducers: {
    addApartment: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    removeApartment: (state) => {
      state.value = null;
    },
  },
});

export const { addApartment, removeApartment } = apartment.actions;

export const apartmentState = (state) => state.apartment.value;

export default apartment.reducer;

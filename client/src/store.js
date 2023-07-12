import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/auth/user';
import apartmentReducer from './features/property/apartment';
import likesReducer from './features/property/favorite';

export const store = configureStore({
  reducer: {
    user: userReducer,
    apartment: apartmentReducer,
    likes: likesReducer,
  },
});

export default store;

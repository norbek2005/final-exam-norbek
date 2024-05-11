import { configureStore } from '@reduxjs/toolkit';
import likeReducer from './likeSlice';
import cartReducer from './cartSlice';
import authReducer from './authslice';

const store = configureStore({
  reducer: {
    like: likeReducer,
    cart: cartReducer,
    auth: authReducer
  },
});

export default store;

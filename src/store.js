import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice.js';
import modalReducer from './features/modalSlice.js';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './feature/cart/cartSlice';
import userReducer from './feature/user/userSlice';

export const store = configureStore({
  reducer: {
    // state cart
    cartState: cartReducer,
    userState: userReducer,
  },
});

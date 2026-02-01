import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import notificationReducer from './notificationSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    notifications: notificationReducer
  }
});

export default store;

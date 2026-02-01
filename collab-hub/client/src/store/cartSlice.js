import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (!item) {
        state.items.push(action.payload);
        state.itemCount += 1;
        state.total += action.payload.price || 0;
      }
    },
    removeFromCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.total -= item.price || 0;
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.itemCount -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

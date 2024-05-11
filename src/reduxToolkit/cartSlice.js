import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action) {
      state.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeCart(state, action) {
      const newState = state.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addCart, removeCart } = CartSlice.actions;

export default CartSlice.reducer;

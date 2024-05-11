import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('likes') ? JSON.parse(localStorage.getItem('likes')) : [];

const LikeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addLike(state, action) {
      state.push(action.payload);
      localStorage.setItem('likes', JSON.stringify(state));
    },
    removeLike(state, action) {
      const newState = state.filter(item => item.id !== action.payload.id);
      localStorage.setItem('likes', JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addLike, removeLike } = LikeSlice.actions;

export default LikeSlice.reducer;

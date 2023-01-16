import { createSlice } from '@reduxjs/toolkit';

const appReducer = createSlice({
  name: 'appReducer',
  initialState: {
    isSpin: false,
    isAuth: false,
  },
  reducers: {
    isAuthAC(state, action) {
      state.isAuth = action.payload;
    },
    isSpinAC(state, action) {
      state.isSpin = action.payload;
    },
  },
});

export const { isAuthAC, isSpinAC } = appReducer.actions;
export default appReducer.reducer;

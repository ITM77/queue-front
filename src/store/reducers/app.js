import { createSlice } from '@reduxjs/toolkit';

const app = createSlice({
  name: 'app',
  initialState: {
    lang: 'ru',
    isSpin: false,
    isAuth: false,
    user: {},
  },
  reducers: {
    isAuthAC(state, action) {
      state.isAuth = action.payload;
    },
    isSpinAC(state, action) {
      state.isSpin = action.payload;
    },
    userAC(state, action) {
      state.user = action.payload
    },
  },
});

export const {
  isAuthAC,
  isSpinAC,
  userAC, } = app.actions;
export default app.reducer;

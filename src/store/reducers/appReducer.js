import { createSlice } from '@reduxjs/toolkit';

const appReducer = createSlice({
  name: 'appReducer',
  initialState: {
    user: {},
    isOtp: false,
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
    isOtpAC(state, action) {
      state.isOtp = action.payload;
    },
    userAC(state, action) {
      state.user = action.payload;
    },
  },
});

export const { isAuthAC, isSpinAC, isOtpAC, userAC } = appReducer.actions;
export default appReducer.reducer;

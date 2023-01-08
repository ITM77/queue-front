import { createSlice } from '@reduxjs/toolkit';

const appReducer = createSlice({
  name: 'appReducer',
  initialState: {
    user: {},
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
    userAC(state, action) {
      state.user = action.payload;
    },
  },
});

export const { isAuthAC, isSpinAC, userAC } = appReducer.actions;
export default appReducer.reducer;

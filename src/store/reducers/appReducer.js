import { createSlice } from '@reduxjs/toolkit';

const appReducer = createSlice({
  name: 'appReducer',
  initialState: {
    isSpin: false,
    isAuth: false,
    claims: [],
    user: {},
    claimInfo: {}
  },
  reducers: {
    isAuthAC(state, action) {
      state.isAuth = action.payload;
    },
    isSpinAC(state, action) {
      state.isSpin = action.payload;
    },
    claimsAC(state, action) {
      state.claims = action.payload
    },
    userAC(state, action) {
      state.user = action.payload
    },
    claimInfoAC(state, action) {
      state.claimInfo = action.payload
    }
  },
});

export const { isAuthAC, isSpinAC, claimsAC, userAC, claimInfoAC } = appReducer.actions;
export default appReducer.reducer;

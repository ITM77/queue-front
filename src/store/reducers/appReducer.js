import { createSlice } from '@reduxjs/toolkit';

const appReducer = createSlice({
  name: 'appReducer',
  initialState: {
    isSpin: false,
    isAuth: false,
    claims: [],
    user: {},
    claimInfo: {},
    uploadedFile: []
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
    },
    uploadedFileAC(state, action) {
      const obj = {
        uid: '-1',
        name: 'image1.png',
        status: 'done',
        url: action.payload.path,
      }
      state.uploadedFile = []
      state.uploadedFile.push(obj)
    }
  },
});

export const { isAuthAC, isSpinAC, claimsAC, userAC, claimInfoAC, uploadedFileAC } = appReducer.actions;
export default appReducer.reducer;

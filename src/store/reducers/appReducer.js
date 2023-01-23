import { createSlice } from '@reduxjs/toolkit';

const appReducer = createSlice({
  name: 'appReducer',
  initialState: {
    isSpin: false,
    isAuth: false,
    claims: [],
    user: {},
    claimInfo: {},
    uploadedFile: [],
    claimTypes: [],
  },
  reducers: {
    claimTypesAC(state, action) {
      state.claimTypes = []
      action.payload.forEach((item) => {
        state.claimTypes.push({
          value: item.id,
          label: item.label,
          name: item.name,
        })
      })
    },
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
      state.uploadedFile = []
      action.payload.uploads.forEach((item) => {
        const obj = [{
          uid: item.id,
          name: item.name,
          label: item.label,
          status: 'done',
          url: item.path,
        }]
        state.uploadedFile.push(obj)
      })
      action.payload.documentTypes.forEach((item) => {
        const obj = [{
          uid: item.id,
          label: item.label,
          name: item.name,
        }]
        state.uploadedFile.push(obj)
      })
      console.log(state.uploadedFile);
    }
  },
});

export const { isAuthAC, isSpinAC, claimsAC, userAC, claimInfoAC, uploadedFileAC, claimTypesAC } = appReducer.actions;
export default appReducer.reducer;

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
    documentTypes: [],
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
    documentTypesAC(state, action) {
      state.documentTypes = []
      action.payload.forEach((item) => {
        state.documentTypes.push({
          value: item.id,
          label: item.label,
          name: item.name,
        })
      })
    },
    uploadedFileAC(state, action) {
      state.uploadedFile = []
      action.payload.uploads.forEach((item) => {
        const obj = [{
          uid: item?.id,
          name: item?.name,
          label: item?.label,
          status: 'done',
          url: item?.path,
        }]
        state.uploadedFile.push(obj)
      })
    }
  },
});

export const {
  isAuthAC,
  isSpinAC,
  claimsAC,
  userAC,
  claimInfoAC,
  uploadedFileAC,
  claimTypesAC,
  documentTypesAC } = appReducer.actions;
export default appReducer.reducer;

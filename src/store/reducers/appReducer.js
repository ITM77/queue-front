import { createSlice } from '@reduxjs/toolkit';

const appReducer = createSlice({
  name: 'appReducer',
  initialState: {
    lang: 'ru',
    isSpin: false,
    isAuth: false,
    claims: [],
    user: {},
    claimInfo: {},
    uploads: [],
    claimTypes: [],
    documentTypes: [],
    selectedClaimTypes: [],
    uploadDocumentTypes: [],
    claimType: {}
  },
  reducers: {
    resetClaimsAC(state) {
      state.claims = []
    },
    claimTypeAC(state, action) {
      state.claimType = action.payload
    },
    selectedClaimTypesAC(state, action) {
      state.selectedClaimTypes = action.payload
    },
    editClaimTypeAC(state, action) {
      state.claimTypes = action.payload
    },
    deleteClaimTypeAC(state, action) {
      state.claimTypes = action.payload
    },
    createClaimTypeAC(state, action) {
      state.claimTypes.unshift({
        value: action.payload.id,
        label: action.payload.label,
        name: action.payload.name,
      })
    },
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
    editDocumentTypesAC(state, action) {
      state.documentTypes = action.payload
    },
    deleteDocumentTypeAC(state, action) {
      state.documentTypes = action.payload
    },
    createDocumentTypeAC(state, action) {
      state.documentTypes.unshift({
        value: action.payload.id,
        label: action.payload.label,
        name: action.payload.name,
      })
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
    uploadDocumentTypesAC(state, action) {
      state.uploadDocumentTypes = []
      action.payload.forEach((item) => {
        const obj = [{
          uid: item?.id,
          name: item?.name,
          label: item?.label,
          status: 'done',
          url: item?.path,
        }]
        state.uploadDocumentTypes.push(obj)
      })
    },
    uploadsAC(state, action) {
      state.uploads = []
      let tempArr = []
      for (let i = 0; i < action.payload.documentTypes.length; i++) {
        for (let k = 0; k < action.payload.uploads.length; k++) {
          if (action.payload.documentTypes[i].name === action.payload.uploads[k]?.documentTypeName) {
            const obj = {
              uid: action.payload.uploads[k]?.id,
              title: action.payload.documentTypes[i].label,
              name: action.payload.uploads[k]?.name,
              label: action.payload.uploads[k]?.documentTypeName,
              status: 'done',
              url: action.payload.uploads[k]?.path,
            }
            tempArr.push(obj)
          }
        }
        state.uploads.push(tempArr)
        tempArr = []
      }
    }
  },
});

export const {
  isAuthAC,
  isSpinAC,
  claimsAC,
  userAC,
  claimInfoAC,
  uploadsAC,
  claimTypesAC,
  documentTypesAC,
  uploadDocumentTypesAC,
  selectedClaimTypesAC,
  claimTypeAC,
  resetClaimsAC,
  deleteDocumentTypeAC,
  createDocumentTypeAC,
  editDocumentTypesAC,
  createClaimTypeAC,
  editClaimTypeAC,
  deleteClaimTypeAC } = appReducer.actions;
export default appReducer.reducer;

import { createSlice } from '@reduxjs/toolkit';

const claims = createSlice({
  name: 'claims',
  initialState: {
    claims: [],
    claimInfo: {},
    uploads: [],
    uploadDocumentTypes: [],
  },
  reducers: {
    clearDocumentsAC(state) {
      state.uploads = []
      state.uploadDocumentTypes = []
    },
    resetClaimsAC(state) {
      state.claims = []
    },
    claimsAC(state, action) {
      state.claims = action.payload
    },
    claimInfoAC(state, action) {
      state.claimInfo = action.payload
    },
    editUploadsAC(state, action) {
      state.uploads[action.payload.index].push({ url:action.payload.url })
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
  }
});

export const { resetClaimsAC, claimsAC, claimInfoAC, uploadsAC, uploadDocumentTypesAC, clearDocumentsAC, editUploadsAC } = claims.actions;

export default claims.reducer;

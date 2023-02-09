import { createSlice } from '@reduxjs/toolkit';

const documents = createSlice({
  name: 'documents',
  initialState: {
    documentTypes: [],
  },
  reducers: {
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
  }
});

export const { deleteDocumentTypeAC, createDocumentTypeAC, editDocumentTypesAC, documentTypesAC } = documents.actions;

export default documents.reducer;

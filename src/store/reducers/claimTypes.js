import { createSlice } from '@reduxjs/toolkit';

const claimTypes = createSlice({
  name: 'claimTypes',
  initialState: {
    claimTypes: [],
    selectedClaimTypes: [],
    claimType: {}
  },
  reducers: {
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
  }
});

export const {
  claimTypesAC,
  selectedClaimTypesAC,
  claimTypeAC,
  createClaimTypeAC,
  editClaimTypeAC,
  deleteClaimTypeAC,
} = claimTypes.actions;

export default claimTypes.reducer;

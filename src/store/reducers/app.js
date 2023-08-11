import { createSlice } from '@reduxjs/toolkit';

const app = createSlice({
  name: 'app',
  initialState: {
    lang: 'ru',
    isSpin: false,
    isAuth: false,
    user: {},
    serviceCategories: [],
    serviceCenters: [],
    services: [],
    clients: [],
    users: [],
  },
  reducers: {
    isAuthAC(state, action) {
      state.isAuth = action.payload;
    },
    isSpinAC(state, action) {
      state.isSpin = action.payload;
    },
    userAC(state, action) {
      state.user = action.payload
    },
    serviceCategoriesAC(state, action) {
      state.serviceCategories = []
      action.payload.forEach((item) => {
        state.serviceCategories.push({
          value: item.id,
          label: item.name,
          label_tj: item.name_tj
        })
      })
    },
    serviceCentersAC(state, action) {
      state.serviceCenters = []
      action.payload.forEach((item) => {
        state.serviceCenters.push({
          value: item.id,
          label: item.name,
          address: item.address
        })
      })
    },
    servicesAC(state, action) {
      // state.services = []
      // action.payload.forEach((item) => {
      //   state.services.push({
      //     value: item.id,
      //     label: item.name,
      //   })
      // })
      state.services = action.payload
    },
    clientsAC(state, action) {
      state.clients = action.payload
    },
    usersAC(state, action) {
      state.users = action.payload
    },
  },
});

export const {
  isAuthAC,
  isSpinAC,
  userAC,
  serviceCategoriesAC,
  serviceCentersAC,
  servicesAC,
  clientsAC,
  usersAC } = app.actions;
export default app.reducer;

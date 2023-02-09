import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers";


const setupStore = () => configureStore({
    reducer: rootReducer,
    devTools: true
  })

export default setupStore

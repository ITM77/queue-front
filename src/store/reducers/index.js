import { combineReducers } from "@reduxjs/toolkit";
import app from "./app";
import cabinet from './cabinet'

export const rootReducer = combineReducers({
  app,
  cabinet
})

import { combineReducers } from "@reduxjs/toolkit";
import app from "./app";
import claims from "./claims";
import documents from "./documents";
import claimTypes from "./claimTypes";

export const rootReducer = combineReducers({
  app,
  claims,
  documents,
  claimTypes
})

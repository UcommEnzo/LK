import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer"
import ContactsReducer from "./reducers/ContactsReducer"

const rootReducers = combineReducers({
  AuthReducer,
  ContactsReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers
})}
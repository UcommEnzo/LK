import { configureStore, combineReducers } from "@reduxjs/toolkit";
// @ts-ignore
import AuthReducer from "./reducers/AuthReducer.ts"
// @ts-ignore
import ContactsReducer from "./reducers/ContactsReducer.ts"

const rootReducers = combineReducers({
  AuthReducer,
  ContactsReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers
})}

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
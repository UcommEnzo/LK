import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// @ts-ignore
import { createAccount, loginToAccount } from './ActionCreators.ts';
import { AuthState } from "../../../models/IAuth";

const initialState: AuthState = {
  isAuth: false,
  userLogin: '',

  creatingInProgress: false,
  creatingError: '',

  loginInProgress: false,
  loginError: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogout(state) {
      state.isAuth = false
    }
  },
  extraReducers: {
    [createAccount.pending.type]: (state) => {
      state.creatingInProgress = true
    },
    [createAccount.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.creatingInProgress = false
      state.creatingError = ''
      state.isAuth = true
      state.userLogin = action.payload
    },
    [createAccount.rejected.type]: (state, action: PayloadAction<string>) => {
      state.creatingInProgress = false
      state.creatingError = action.payload
    },

    [loginToAccount.pending.type]: (state) => {
      state.loginInProgress = true
    },
    [loginToAccount.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.loginInProgress = false
      state.loginError = ''
      state.isAuth = true
      state.userLogin = action.payload
    },
    [loginToAccount.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loginInProgress = false
      state.loginError = action.payload
    }
  }
})

export const logout = () => (dispatch) => {
  dispatch(authSlice.actions.userLogout())
}

export default authSlice.reducer
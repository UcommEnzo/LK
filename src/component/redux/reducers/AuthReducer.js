import { createSlice } from "@reduxjs/toolkit"
import { createAccount, loginToAccount } from './ActionCreators';


const initialState = {
  isAuth: false,
  userLogin: '',

  creatingInProgress: false,
  creatingError: '',

  loginInProgress: false,
  loginError: '',

  getContactsInProgress: false,
  contacts: [],
  getContactsError: '',
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
    [createAccount.fulfilled.type]: (state, action) => {
      state.creatingInProgress = false
      state.creatingError = ''
      state.isAuth = true
      state.userLogin = action.payload
    },
    [createAccount.rejected.type]: (state, action) => {
      state.creatingInProgress = false
      state.creatingError = action.payload
    },

    [loginToAccount.pending.type]: (state) => {
      state.loginInProgress = true
    },
    [loginToAccount.fulfilled.type]: (state, action) => {
      state.loginInProgress = false
      state.loginError = ''
      state.isAuth = true
      state.userLogin = action.payload
    },
    [loginToAccount.rejected.type]: (state, action) => {
      state.loginInProgress = false
      state.loginError = action.payload
    }
  }
})

export const logout = () => (dispatch) => {
  dispatch(authSlice.actions.userLogout())
}

export default authSlice.reducer
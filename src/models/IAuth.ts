export interface AuthState {
  isAuth: boolean
  userLogin: string

  creatingInProgress: boolean
  creatingError: string

  loginInProgress: boolean
  loginError: string
}
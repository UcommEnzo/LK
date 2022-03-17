import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate ,
} from "react-router-dom";
import { useCookies } from 'react-cookie';
import './App.scss';
import AccountPage from './component/accountPage';
import LoginPage from './component/loginPage';
import { loginToAccount } from "./redux/reducers/ActionCreators.ts"
import { useAppDispatch, useAppSelector } from './hooks/redux.ts';

const App = () => {

  const dispatch = useAppDispatch()
  const [cookies, setCookie] = useCookies(['isAuth']);
  const { isAuth } = useAppSelector(state => state.AuthReducer)

  const setCookieIsAuth = (authData) => setCookie('isAuth', authData, { path: '/' })

  useEffect(() => {
    if (!isAuth && cookies.isAuth?.email && cookies.isAuth?.password) {
      const payload = { values: cookies.isAuth }
      dispatch(loginToAccount(payload))
    }
  }, [isAuth])
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            exact path="/"
            element={
              cookies.isAuth
              ? <Navigate to="/account" />
              : <LoginPage setCookieIsAuth={setCookieIsAuth}/>
            }
          />
          <Route 
            path="/account"
            element={
              cookies.isAuth
              ? <AccountPage setCookieIsAuth={setCookieIsAuth}/>
              : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )

}

export default App;

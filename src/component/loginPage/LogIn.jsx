import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../common/Form";
import { loginToAccount } from "../redux/reducers/ActionCreators"

const Login = ({ setCookieIsAuth }) => {

  const dispatch = useDispatch()
  const { loginInProgress, login, loginError } = useSelector(state => state.AuthReducer)

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  }

  const onSubmit = (values) => {
    dispatch(loginToAccount({values, setCookieIsAuth}))
  }

  return (
    <Form
      header={'Login'}
      validate={validate}
      onSubmit={onSubmit}
      inProgress={loginInProgress}
      loginError={loginError}
    />
  )
}

export default Login
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../common/Form";
import { createAccount } from "../redux/reducers/ActionCreators"

const SignUp = ({ setCookieIsAuth }) => {

  const dispatch = useDispatch()
  const { creatingInProgress, creatingDone, creatingError } = useSelector(state => state.AuthReducer)

  const validate = (values) => {
    const errors = {};
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
  }

  const onSubmit = (values) => {
    dispatch(createAccount({values, setCookieIsAuth}))
  }

  return (
    <Form
      header={'SignUp'}
      validate={validate}
      onSubmit={onSubmit}
      inProgress={creatingInProgress}
      creatingError={creatingError}
    />
  )
}

export default SignUp
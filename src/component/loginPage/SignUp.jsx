import React from "react";
import Form from "../common/Form";
import { createAccount } from "../../redux/reducers/ActionCreators.ts"
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";

const SignUp = ({ setCookieIsAuth }) => {

  const dispatch = useAppDispatch()
  const { creatingInProgress, creatingDone, creatingError } = useAppSelector(state => state.AuthReducer)

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
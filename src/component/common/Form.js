import React from "react";
import { Formik } from 'formik';
import { Input, Button } from 'antd';

const Form = ({
  header,
  validate,
  onSubmit,
  inProgress,
  loginError = null,
  creatingError = null,
}) => {

  return (
    <div className="FormContainer">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <>
            <h1 className="FormHeader">{header}</h1>
            <form>
              <div className="EmailContainer">
                <label>Email</label>
                <Input 
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  />
              </div>
              <div className="PasswordContainer">
                <label>Password</label>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  />
              </div>
              <div className="SubmitContainer">
                <Button
                  type="submit"
                  disabled={inProgress}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </form>
            <div
              className="Errors"
              style={(errors.email && touched.email) || loginError ? null : {display: 'none'}}
            >
              <div className="Validate">
                {errors.email && touched.email && errors.email}
              </div>
              <div className="Responce">
                {loginError && loginError}
                {creatingError && creatingError}
              </div>
            </div>
          </>
        )}
      </Formik>
    </div>
  )
}

export default Form
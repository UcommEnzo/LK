import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from 'formik';
import { Input, Button } from 'antd';
import { addContact } from "../redux/reducers/ActionCreators";

const AddContactForm = ({ userLogin }) => {
  
  const dispatch = useDispatch()
  const { addContactInProgress, addContactError } = useSelector(state => state.ContactsReducer)

  const validate = (values) => {
    const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    const errors = {};
    
    if (!values.phone || !values.name) {
      errors.phone = 'Name and phone required';
    } else if (!regexPhone.test(values.phone)) {
      errors.phone = 'Invalid phone number';
    }
    return errors;
  }


  const onSubmit = (values, actions) => {
    const { resetForm } = actions
    dispatch(addContact({values, userLogin}))
    resetForm({
      name: '',
      phone: ''
    })
  }

  return (
    <div className="FormContainer">
      <Formik
        initialValues={{ name: '', phone: '' }}
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
            <h1 className="FormHeader">Add Contact</h1>
            <form>
              <div className="FirstNameContainer">
                <label>Name</label>
                <Input
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  />
              </div>
              <div className="PhoneContainer">
                <label>Phone</label>
                <Input
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  />
              </div>
              <div className="SubmitContainer">
                <Button
                  type="submit"
                  disabled={addContactInProgress}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </form>
            <div
              className="Errors"
              style={(errors.phone && touched.phone) || addContactError ? null : {display: 'none'}}
            >
              <div className="Validate">
                {errors.phone && touched.phone && errors.phone}
              </div>
              <div className="Responce">
                {addContactError && addContactError}
              </div>
            </div>
          </>
        )}
      </Formik>
    </div>
  )
}

export default AddContactForm
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  firstName: yup.string().max(250).required('First name is required'),
  lastName: yup.string().max(250).required('Last name is required')
});

const UserInfoForm = ({ id, firstName, lastName, loading, onSubmit }) => (
  <Formik
    initialValues={{
      id,
      firstName,
      lastName
    }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <Form.Input
          value={values.firstName}
          error={errors.firstName}
          label="First Name"
          placeholder="First Name"
          type="text"
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <Form.Input
          value={values.lastName}
          error={errors.lastName}
          label="Last Name"
          placeholder="Last Name"
          type="text"
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <Button
          primary
          fluid
          type="submit"
          loading={loading}
          disabled={!!(
            errors.firstName || errors.lastName
              || (values.firstName.trim() === firstName && values.lastName.trim() === lastName
              ))}
        >
            Save
        </Button>
      </Form>
    )}
  </Formik>
);

UserInfoForm.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default UserInfoForm;

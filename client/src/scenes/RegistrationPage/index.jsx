import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';

import CenteringContainer from '../../components/CenteringContainer';
import { register } from '../../services/registrationService';

import styles from './styles.module.scss';

const validationSchema = yup.object().shape({
  email: yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: yup.string()
    .min(8, 'Minimum length - 8 characters')
    .max(72)
    .matches(
      /^(?=.*)(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d].{7,}$/,
      'Password must include at least one number and one letter'
    )
    .required('Password is required'),
  firstName: yup.string().max(250),
  lastName: yup.string().max(250)
});

const RegistrationPage = ({ history }) => {
  const onFormSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    register(values).then(({ token }) => {
      localStorage.setItem('token', token);
      history.push('/moving');
    });
  };

  return (
    <CenteringContainer>
      <div className={styles.registerFormContainer}>
        <h1>Sign Up</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
            isDriver: false,
            firstName: '',
            lastName: '',
          }}
          onSubmit={onFormSubmit}
          validationSchema={validationSchema}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Input
                value={values.email}
                error={errors.email}
                label="E-mail"
                placeholder="E-mail address"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                required
              />
              <Form.Input
                value={values.password}
                error={errors.password}
                label="Password"
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                required
              />
              <Form.Checkbox
                value={values.isDriver}
                label="Register as a driver"
                id="isDriver"
                onChange={handleChange}
                disabled={isSubmitting}
                slider
              />
              <Form.Group widths="equal">
                <Form.Input
                  value={values.firstName}
                  error={errors.firstName}
                  label="First Name"
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </Form.Group>
              <Button primary fluid type="submit" loading={isSubmitting}>Sign Up</Button>
            </Form>
          )}
        </Formik>
      </div>
    </CenteringContainer>
  );
};

RegistrationPage.propTypes = {
  history: PropTypes.exact({
    length: PropTypes.number,
    action: PropTypes.string,
    location: PropTypes.object
  }).isRequired
};

export default withRouter(RegistrationPage);

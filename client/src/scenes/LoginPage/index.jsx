import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';

import CenteringContainer from '../../components/CenteringContainer';
import { login } from '../../services/authService';

const validationSchema = yup.object().shape({
  email: yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: yup.string()
    .required('Password is required')
});

const LoginPage = ({ history }) => {
  const onFormSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    login(values).then(() => {
      history.push('/moving');
    });
  };

  return (
    <CenteringContainer>
      <div className="loginRegisterFormContainer">
        <h1>Log In</h1>
        <Formik
          initialValues={{
            email: '',
            password: ''
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
              />
              <Button primary fluid type="submit" loading={isSubmitting}>Log In</Button>
            </Form>
          )}
        </Formik>
      </div>
    </CenteringContainer>
  );
};

LoginPage.propTypes = {
  history: PropTypes.exact({
    length: PropTypes.number,
    action: PropTypes.string,
    location: PropTypes.object
  }).isRequired
};

export default withRouter(LoginPage);

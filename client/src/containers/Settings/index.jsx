/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Tab } from 'semantic-ui-react';

import { updateUserRequest } from './actions';

const validationSchema = yup.object().shape({
  firstName: yup.string().max(250).required('First name is required'),
  lastName: yup.string().max(250).required('Last name is required')
});

const Settings = ({ user: { id, firstName, lastName, isDriver }, updateUserRequest }) => {
  const profileInfoTab = (
    <Formik
      initialValues={{
        id,
        firstName,
        lastName
      }}
      validationSchema={validationSchema}
      onSubmit={updateUserRequest}
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

  /*const driverDetailsTab = (

  );*/

  const panes = [
    {
      menuItem: { key: 'profile', icon: 'user', content: 'Profile Info' },
      render: () => <Tab.Pane>{profileInfoTab}</Tab.Pane>
    }
  ];

  if (isDriver) {
    panes.push({
      menuItem: { key: 'profile', icon: 'truck', content: 'Driver Details' },
      render: () => <Tab.Pane>{driverDetailsTab}</Tab.Pane>
    });
  }

  return (
    <Tab panes={panes}/>
  );
};

Settings.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    isDriver: PropTypes.bool
  }).isRequired,
  updateUserRequest: PropTypes.func.isRequired
};

const mapStateToProps = ({ user: { user } }) => ({
  user
});

const mapDispatchToProps = {
  updateUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

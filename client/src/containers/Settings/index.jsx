/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import UserInfoForm from '../../components/UserInfoForm';
import DriverDetails from '../../components/DriverDetails';
import { updateUserRequest } from './actions';

const Settings = ({ user: { id, firstName, lastName, type }, updateUserRequest }) => {
  const panes = [
    {
      menuItem: { key: 'profile', icon: 'user', content: 'Profile Info' },
      render: () => (
        <Tab.Pane>
          <UserInfoForm
            onSubmit={updateUserRequest}
            id={id}
            firstName={firstName}
            lastName={lastName}
          />
        </Tab.Pane>
      )
    }
  ];

  if (type === 'driver') {
    panes.push({
      menuItem: { key: 'driverInfo', icon: 'truck', content: 'Driver Details' },
      render: () => (
        <Tab.Pane>
          <DriverDetails
            onChangeVehicle={(data) => console.log(data)}
            onAddVehicle={(data) => console.log(data)}
          />
        </Tab.Pane>
      )
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
    type: PropTypes.string.isRequired
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

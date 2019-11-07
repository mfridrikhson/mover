/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import UserInfoForm from '../../components/UserInfoForm';
import DriverDetails from '../../components/DriverDetails';
import { addVehicle, updateDriver } from '../../routines';
import { updateUserRequest } from './actions';

const Settings = ({
  user: { id, firstName, lastName, type },
  driver,
  loading,
  updateUserRequest,
  addVehicle,
  updateDriver
}) => {
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
            driver={driver}
            loading={loading}
            onChangeVehicle={(data) => console.log(data)}
            onLoadLicense={updateDriver}
            onAddVehicle={addVehicle}
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
  driver: PropTypes.object, // TODO: Define
  loading: PropTypes.bool.isRequired,
  updateUserRequest: PropTypes.func.isRequired,
  updateDriver: PropTypes.func.isRequired,
  addVehicle: PropTypes.func.isRequired
};

const mapStateToProps = ({ profile: { user, driver, loading } }) => ({
  user,
  driver,
  loading,
});

const mapDispatchToProps = {
  updateUserRequest,
  updateDriver,
  addVehicle
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

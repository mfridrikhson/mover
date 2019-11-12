/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Tab } from 'semantic-ui-react';

import UserInfoForm from '../../components/UserInfoForm';
import DriverDetails from '../../components/DriverDetails';
import { addVehicle, updateDriver } from '../../routines';
import { updateUserRequest } from './actions';
import { getVehicleTypes } from '../../services/vehicleTypeService';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicleTypes: null
    };
  }

  async componentDidMount() {
    const vehicleTypes = await getVehicleTypes();
    this.setState({ vehicleTypes });
  }

  render() {
    const {
      user: { id, firstName, lastName, isDriver },
      driver,
      loading,
      updateUserRequest,
      addVehicle,
      updateDriver
    } = this.props;
    const { vehicleTypes } = this.state;

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

    if (isDriver) {
      panes.push({
        menuItem: { key: 'driverInfo', icon: 'truck', content: 'Driver Details' },
        render: () => {
          if (!vehicleTypes) {
            return <Loader active/>;
          }

          return (
            <Tab.Pane>
              <DriverDetails
                driver={driver}
                loading={loading}
                vehicles={[]}
                vehicleTypes={vehicleTypes}
                onChangeVehicle={(data) => console.log(data)}
                onLoadLicense={updateDriver}
                onAddVehicle={addVehicle}
              />
            </Tab.Pane>
          );
        }
      });
    }

    return (
      <Tab panes={panes}/>
    );
  }
}

Settings.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    isDriver: PropTypes.bool.isRequired
  }).isRequired,
  driver: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    currentVehicleId: PropTypes.string,
    driverLicenceUrl: PropTypes.string
  }),
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

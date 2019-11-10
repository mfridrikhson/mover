import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const VehicleTypeSelect = ({ vehicleTypeId, vehicleTypes, onChange, ...props }) => (
  <Dropdown
    value={vehicleTypeId}
    onChange={onChange}
    placeholder="Select type"
    search
    selection
    options={vehicleTypes.map(({ id, type, pricePerKm }) => ({
      key: id,
      value: id,
      text: type,
      description: `${pricePerKm}$/km`
    }))}
    {...props}
  />
);

VehicleTypeSelect.propTypes = {
  vehicleTypeId: PropTypes.string,
  vehicleTypes: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    pricePerKm: PropTypes.number.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired
};

export default VehicleTypeSelect;

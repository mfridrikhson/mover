import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const transportTypeOptions = [
  {
    key: 'Minivan',
    value: 'Minivan',
    text: 'Minivan',
    description: '2.5$/km',
    image: { src: 'https://i.imgur.com/QdwpQxs.png' }
  },
  {
    key: 'Van',
    value: 'Van',
    text: 'Van',
    description: '5$/km',
    image: { src: 'https://i.imgur.com/YplcOMg.png' }
  },
  {
    key: '3-Ton truck',
    value: '3-Ton truck',
    text: '3-Ton truck',
    description: '10$/km',
    image: { src: 'https://i.imgur.com/VNR6skE.png' }
  },
  {
    key: '5-Ton truck',
    value: '5-Ton truck',
    text: '5-Ton truck',
    description: '15$/km',
    image: { src: 'https://i.imgur.com/FbfIpM9.png' }
  }
];

const VehicleTypeSelect = ({ value, onChange, ...props }) => (
  <Dropdown
    value={value}
    onChange={onChange}
    placeholder="Select type"
    search
    selection
    options={transportTypeOptions}
    {...props}
  />
);

VehicleTypeSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default VehicleTypeSelect;

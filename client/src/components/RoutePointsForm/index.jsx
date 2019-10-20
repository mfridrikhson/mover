import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Button, Form } from 'semantic-ui-react';

import AddressPicker from '../AddressPicker';

import styles from './styles.module.scss';

const RoutePointsForm = ({ pointFrom, pointTo, onBack, onContinue }) => {
  const [addressFrom, setAddressFrom] = useState(pointFrom.address);
  const [addressTo, setAddressTo] = useState(pointTo.address);
  const [coordsFrom, setCoordsFrom] = useState(pointFrom.coords);
  const [coordsTo, setCoordsTo] = useState(pointTo.coords);

  const getCoords = async address => {
    try {
      const geocode = await geocodeByAddress(address);
      return await getLatLng(geocode[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => onContinue({
    pointFrom: {
      address: addressFrom,
      coords: coordsFrom
    },
    pointTo: {
      address: addressTo,
      coords: coordsTo
    }
  });

  const handleSelect = async (address, setAddress, setCoords) => {
    setAddress(address);
    const coords = await getCoords(address);
    setCoords(coords);
  };

  const handleSelectFrom = address => handleSelect(address, setAddressFrom, setCoordsFrom);
  const handleSelectTo = address => handleSelect(address, setAddressTo, setCoordsTo);

  return (
    <div className={styles.routePointsFormContainer}>
      <Form onSubmit={handleSubmit}>
        <Form.Field inline>
          <label>Depart from:</label>
          <AddressPicker
            address={addressFrom}
            setAddress={setAddressFrom}
            handleSelect={handleSelectFrom}
          />
        </Form.Field>
        <Form.Field inline>
          <label>Deliver to:</label>
          <AddressPicker
            address={addressTo}
            setAddress={setAddressTo}
            handleSelect={handleSelectTo}
          />
        </Form.Field>
        <Button secondary type="button" onClick={onBack}>Back</Button>
        <Button primary type="submit" disabled={!addressFrom || !addressTo}>Continue</Button>
      </Form>
    </div>
  );
};

const routePointInterface = {
  address: PropTypes.string.isRequired,
  coords: {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }
};

RoutePointsForm.propTypes = {
  pointFrom: PropTypes.exact(routePointInterface),
  pointTo: PropTypes.exact(routePointInterface),
  onBack: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired
};

const defaultPoint = {
  address: '',
  coords: null
};

RoutePointsForm.defaultProps = {
  pointFrom: defaultPoint,
  pointTo: defaultPoint
};

export default RoutePointsForm;

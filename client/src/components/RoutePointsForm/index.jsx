import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Button, Form } from 'semantic-ui-react';

import AddressPicker from '../AddressPicker';

import styles from './styles.module.scss';

const RoutePointsForm = ({ toPoint, fromPoint, onBack, onContinue }) => {
  const [addressFrom, setAddressFrom] = useState(toPoint.address);
  const [addressTo, setAddressTo] = useState(fromPoint.address);
  const [coordsFrom, setCoordsFrom] = useState(toPoint.coords);
  const [coordsTo, setCoordsTo] = useState(fromPoint.coords);

  const getCoords = async address => {
    try {
      const geocode = await geocodeByAddress(address);
      return await getLatLng(geocode[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => onContinue({
    fromPoint: {
      address: addressFrom,
      coords: coordsFrom
    },
    toPoint: {
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
  coords: PropTypes.exact({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  })
};

RoutePointsForm.propTypes = {
  fromPoint: PropTypes.exact(routePointInterface),
  toPoint: PropTypes.exact(routePointInterface),
  onBack: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired
};

const defaultPoint = {
  address: '',
  coords: null
};

RoutePointsForm.defaultProps = {
  fromPoint: defaultPoint,
  toPoint: defaultPoint
};

export default RoutePointsForm;

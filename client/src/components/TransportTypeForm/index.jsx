import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';

import VehicleTypeSelect from '../VehicleTypeSelect';

import styles from './styles.module.scss';

const TransportTypeForm = ({ vehicleTypeId, vehicleTypes, onBack, onContinue }) => {
  return (
    <div className={styles.transportTypeFormContainer}>
      <Formik
        initialValues={{
          vehicleTypeId
        }}
        onSubmit={onContinue}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field required>
              <label>Transport type</label>
              <VehicleTypeSelect
                value={values.vehicleTypeId}
                vehicleTypes={vehicleTypes}
                onChange={(event, data) => {
                  setFieldValue('vehicleTypeId', data.value);
                }}
              />
            </Form.Field>
            <Button secondary type="button" onClick={onBack}>Back</Button>
            <Button primary type="submit" disabled={!values.vehicleTypeId}>Continue</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

TransportTypeForm.propTypes = {
  vehicleTypeId: PropTypes.string.isRequired,
  vehicleTypes: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    pricePerKm: PropTypes.number.isRequired
  })).isRequired,
  onBack: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired
};

export default TransportTypeForm;

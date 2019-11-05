import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';

import VehicleTypeSelect from '../VehicleTypeSelect';

import styles from './styles.module.scss';

const TransportTypeForm = ({ transportType, onBack, onContinue }) => {
  return (
    <div className={styles.transportTypeFormContainer}>
      <Formik
        initialValues={{
          transportType
        }}
        onSubmit={onContinue}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field required>
              <label>Transport type</label>
              <VehicleTypeSelect
                value={values.transportType}
                onChange={(event, data) => {
                  setFieldValue('transportType', data.value);
                }}
              />
            </Form.Field>
            <Button secondary type="button" onClick={onBack}>Back</Button>
            <Button primary type="submit" disabled={!values.transportType}>Continue</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

TransportTypeForm.propTypes = {
  transportType: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired
};

export default TransportTypeForm;

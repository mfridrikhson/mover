import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { Formik } from 'formik';

import styles from './styles.module.scss';

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
              <Dropdown
                value={values.transportType}
                onChange={(event, data) => {
                  setFieldValue('transportType', data.value);
                }}
                placeholder="Select type"
                search
                selection
                options={transportTypeOptions}
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

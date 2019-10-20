import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
import { Formik } from 'formik';

import styles from './styles.module.scss';

const cargoTypeOptions = [
  { key: 'Furniture', value: 'Furniture', text: 'Furniture' },
  { key: 'Household appliances', value: 'Household appliances', text: 'Household appliances' },
  { key: 'Building materials', value: 'Building materials', text: 'Building materials' },
  { key: 'Pets', value: 'Pets', description: 'Caged only', text: 'Pets' },
  { key: 'Plants', value: 'Plants', text: 'Plants' },
  { key: 'Boxed cargo', value: 'Boxed cargo', text: 'Boxed cargo' },
  { key: 'Other', value: 'Other', text: 'Other' }
];

const CargoParamsForm = ({ volumeWeight, cargoType, onContinue }) => {
  return (
    <div className={styles.cargoParamsFormContainer}>
      <Formik
        initialValues={{
          volumeWeight,
          cargoType
        }}
        onSubmit={onContinue}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field
              required
              inline
            >
              <label>Volume weight</label>
              <Input
                value={values.volumeWeight}
                name="volumeWeight"
                onChange={(event, { value }) => {
                  if (value > 0) {
                    handleChange(event, value);
                  }
                }}
                label={{ basic: true, content: 'kg' }}
                labelPosition="right"
                placeholder="Enter weight"
                type="number"
                required
              />
            </Form.Field>
            <Form.Field inline>
              <label>Cargo type</label>
              <Dropdown
                value={values.cargoType}
                onChange={(event, data) => {
                  setFieldValue('cargoType', data.value);
                }}
                placeholder="Select type"
                search
                selection
                options={cargoTypeOptions}
              />
            </Form.Field>
            <Button primary type="submit" disabled={!values.volumeWeight}>Continue</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

CargoParamsForm.propTypes = {
  volumeWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  cargoType: PropTypes.string.isRequired,
  onContinue: PropTypes.func.isRequired
};

export default CargoParamsForm;

import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { SketchPicker } from 'react-color';
import { Button, Divider, Dropdown, Form, Grid } from 'semantic-ui-react';

import VehicleTypeSelect from '../VehicleTypeSelect';

import styles from './styles.module.scss';

const validationSchema = yup.object().shape({
  name: yup.string().max(250).required('Vehicle name is required'),
  registrationPlate: yup.string().max(20).required('Registration plate is required'),
  vehicleType: yup.string().required('Vehicle type is required')
});

const DriverDetails = ({ vehicles, onChangeVehicle, onAddVehicle }) => (
  <>
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Dropdown
            placeholder="Choose your current vehicle"
            selection
            fluid
            onChange={onChangeVehicle}
            options={vehicles && vehicles.map(({ id, name }) => ({ key: id, text: name, value: id }))}
          />
        </Grid.Column>
        <Grid.Column>
          <Button
            icon="drivers license"
            content="Upload Your License"
            type="button"
            fluid
            primary
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <Divider horizontal>Add vehicles</Divider>
    <Formik
      initialValues={{
        name: '',
        registrationPlate: '',
        color: '#000000',
        vehicleType: ''
      }}
      validationSchema={validationSchema}
      onSubmit={onAddVehicle}
    >
      {({ values, errors, setFieldValue, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Input
            value={values.name}
            error={errors.name}
            label="Name"
            placeholder="Name"
            type="text"
            name="name"
            fluid
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <Form.Input
            value={values.registrationPlate}
            error={errors.registrationPlate}
            label="Registration Plate"
            placeholder="Registration Plate"
            type="text"
            name="registrationPlate"
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <Form.Group>
            <div className={`${styles.colorPicker} field eight`}>
              <label>Color</label>
              <SketchPicker
                color={values.color}
                onChangeComplete={(color) => setFieldValue('color', color.hex)}
              />
            </div>
            <Form.Field required>
              <label>Transport type</label>
              <VehicleTypeSelect
                value={values.vehicleType}
                onChange={(event, data) => {
                  setFieldValue('vehicleType', data.value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Upload Photo</label>
              <Button
                icon="photo"
                content="Upload"
                type="button"
                primary
              />
            </Form.Field>
          </Form.Group>
          <Button
            primary
            fluid
            type="submit"
            disabled={!values.name || !values.registrationPlate || !values.vehicleType}
          >
            Add
          </Button>
        </Form>
      )}
    </Formik>
  </>
);

DriverDetails.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  onChangeVehicle: PropTypes.func.isRequired,
  onAddVehicle: PropTypes.func.isRequired
};

export default DriverDetails;

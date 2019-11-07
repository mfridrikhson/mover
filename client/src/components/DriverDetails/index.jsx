import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { SketchPicker } from 'react-color';
import { Button, Divider, Dropdown, Form, Grid } from 'semantic-ui-react';

import { uploadImage } from '../../services/imageService';
import VehicleTypeSelect from '../VehicleTypeSelect';

import styles from './styles.module.scss';

const validationSchema = yup.object().shape({
  name: yup.string().max(250).required('Vehicle name is required'),
  registrationPlate: yup.string().max(20).required('Registration plate is required'),
  vehicleType: yup.string().required('Vehicle type is required')
});

const DriverDetails = ({
  driver,
  loading,
  onChangeVehicle,
  onLoadLicense,
  onAddVehicle
}) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isLicenseUploading, setIsLicenseUploading] = useState(false);

  return (
    <>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Dropdown
              placeholder="Choose your current vehicle"
              selection
              fluid
              onChange={onChangeVehicle}
              options={driver && driver.vehicles.map(({ id, name }) => ({ key: id, text: name, value: id }))}
            />
          </Grid.Column>
          <Grid.Column>
            <Button
              className={styles.uploadButton}
              as="label"
              htmlFor="license"
              icon="drivers license"
              content="Upload Your License"
              type="button"
              loading={isLicenseUploading}
              fluid
              primary
            />
            <input
              id="license"
              className={styles.uploadInput}
              accept="image/*"
              type="file"
              name="license"
              multiple
              onChange={async ({ target }) => {
                setIsLicenseUploading(true);
                const { link: photo } = await uploadImage(target.files[0]);
                setIsLicenseUploading(false);
                onLoadLicense(photo);
              }}
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
          vehicleType: '',
          photo: null
        }}
        validationSchema={validationSchema}
        onSubmit={onAddVehicle}
      >
        {({ values, errors, setFieldValue, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <div className={`${styles.colorPicker} field required`}>
                <label>Color</label>
                <SketchPicker
                  color={values.color}
                  onChangeComplete={(color) => setFieldValue('color', color.hex)}
                />
              </div>
              <div className={`${styles.stackedFieldGroup} field`}>
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
                  disabled={loading}
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
                  disabled={loading}
                  required
                />
                <Form.Field required>
                  <label>Transport type</label>
                  <VehicleTypeSelect
                    value={values.vehicleType}
                    disabled={loading}
                    onChange={(event, data) => {
                      setFieldValue('vehicleType', data.value);
                    }}
                  />
                </Form.Field>
                <Button
                  className={styles.uploadButton}
                  as="label"
                  htmlFor="photo"
                  icon="photo"
                  content="Upload Image"
                  type="button"
                  loading={isImageUploading}
                  fluid
                  primary
                />
                <input
                  id="photo"
                  className={styles.uploadInput}
                  accept="image/*"
                  type="file"
                  name="photo"
                  multiple
                  onChange={async ({ target }) => {
                    setIsImageUploading(true);
                    const { link: photo } = await uploadImage(target.files[0]);
                    setIsImageUploading(false);
                    setFieldValue('photo', photo);
                  }}
                />
              </div>
            </Form.Group>
            <Button
              primary
              fluid
              type="submit"
              disabled={!values.name || !values.registrationPlate || !values.vehicleType || !values.photo}
              loading={loading}
            >
              Add
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

DriverDetails.propTypes = {
  driver: PropTypes.shape({
    vehicles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }))
  }),
  loading: PropTypes.bool.isRequired,
  onChangeVehicle: PropTypes.func.isRequired,
  onLoadLicense: PropTypes.func.isRequired,
  onAddVehicle: PropTypes.func.isRequired
};

export default DriverDetails;

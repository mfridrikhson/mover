import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { SketchPicker } from 'react-color';
import { Button, Divider, Dropdown, Form, Grid } from 'semantic-ui-react';

import { uploadImage } from '../../services/imageService';
import VehicleTypeSelect from '../VehicleTypeSelect';
import UploadFileButton from '../UploadFileButton';

import styles from './styles.module.scss';

const validationSchema = yup.object().shape({
  name: yup.string().max(250).required('Vehicle name is required'),
  registrationPlate: yup.string().max(20).required('Registration plate is required'),
  vehicleTypeId: yup.string().required('Vehicle type is required')
});

const DriverDetails = ({
  currentVehicleId,
  vehicles,
  loading,
  vehicleTypes,
  onChangeVehicle,
  onLoadLicense,
  onAddVehicle
}) => {
  const [isLicenseUploading, setIsLicenseUploading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isTechPassportUploading, setIsTechPassportUploading] = useState(false);

  return (
    <>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Dropdown
              placeholder="Choose your current vehicle"
              selection
              fluid
              value={currentVehicleId}
              onChange={(event, data) => onChangeVehicle(data.value)}
              options={vehicles && vehicles.map(({ id, name, registrationPlate }) => ({
                key: id,
                text: name,
                value: id,
                description: registrationPlate
              }))}
            />
          </Grid.Column>
          <Grid.Column>
            <UploadFileButton
              text="Upload Your License"
              icon="drivers license"
              name="license"
              acceptType="image/*"
              isLoading={isLicenseUploading}
              onFileLoad={async ({ target }) => {
                setIsLicenseUploading(true);
                const { link: license } = await uploadImage(target.files[0]);
                setIsLicenseUploading(false);
                onLoadLicense(license);
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
          vehicleTypeId: '',
          photoUrl: '',
          techPassportUrl: ''
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
                    vehicleTypes={vehicleTypes}
                    value={values.vehicleTypeId}
                    disabled={loading}
                    onChange={(event, data) => {
                      setFieldValue('vehicleTypeId', data.value);
                    }}
                  />
                </Form.Field>
                <UploadFileButton
                  text="Upload Vehicle Photo"
                  icon="photo"
                  name="photo"
                  acceptType="image/*"
                  isLoading={isImageUploading}
                  onFileLoad={async ({ target }) => {
                    setIsImageUploading(true);
                    const { link: photoUrl } = await uploadImage(target.files[0]);
                    setIsImageUploading(false);
                    setFieldValue('photoUrl', photoUrl);
                  }}
                />
                <UploadFileButton
                  text="Upload Tech Passport"
                  icon="file"
                  name="techPassportUrl"
                  acceptType="image/*"
                  isLoading={isTechPassportUploading}
                  onFileLoad={async ({ target }) => {
                    setIsTechPassportUploading(true);
                    const { link: techPassportUrl } = await uploadImage(target.files[0]);
                    setIsTechPassportUploading(false);
                    setFieldValue('techPassportUrl', techPassportUrl);
                  }}
                />
              </div>
            </Form.Group>
            <Button
              primary
              fluid
              type="submit"
              disabled={
                !values.name
                || !values.registrationPlate
                || !values.vehicleTypeId
                || !values.photoUrl
                || !values.techPassportUrl
              }
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
  currentVehicleId: PropTypes.string,
  vehicles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    registrationPlate: PropTypes.string.isRequired
  })),
  vehicleTypes: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    pricePerKm: PropTypes.number.isRequired
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  onChangeVehicle: PropTypes.func.isRequired,
  onLoadLicense: PropTypes.func.isRequired,
  onAddVehicle: PropTypes.func.isRequired
};

export default DriverDetails;

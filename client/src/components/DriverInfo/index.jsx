import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

import styles from './styles.module.scss';
import RatingLabel from '../RatingLabel';

const DriverInfo = ({ driver: { currentVehicle, ...driver } }) => {
  return (
    <div className={styles.driverInfoContainer}>
      <Card>
        <Card.Content>
          <Card.Header>{driver.firstName} {driver.lastName}</Card.Header>
          <Card.Meta>
            <RatingLabel rating={driver.rating}/>
          </Card.Meta>
        </Card.Content>
        <Card.Content>
          <Card.Header>
            <span className={styles.colorLabel} style={{ backgroundColor: currentVehicle.color }}/>
            {currentVehicle.name} <span className={styles.registrationPlate}>{currentVehicle.registrationPlate}</span>
          </Card.Header>
          <Card.Meta>{currentVehicle.vehicleType}</Card.Meta>
        </Card.Content>
        <Image src={currentVehicle.photoUrl} wrapped ui={false} />
      </Card>
    </div>
  );
};

DriverInfo.propTypes = {
  driver: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    rating: PropTypes.number,
    currentVehicle: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      registrationPlate: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      photoUrl: PropTypes.string.isRequired,
      techPassportUrl: PropTypes.string.isRequired,
      vehicleType: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default DriverInfo;

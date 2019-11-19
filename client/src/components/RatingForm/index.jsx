import React from 'react';
import PropTypes from 'prop-types';
import { Rating } from 'semantic-ui-react';

import styles from './styles.module.scss';

const RatingForm = ({ isDriver, onSubmit }) => {
  return (
    <div className={styles.ratingContainer}>
      <h3>Rate your {isDriver ? 'customer' : 'driver'}</h3>
      <Rating icon="star" defaultRating={0} maxRating={5} onRate={onSubmit}/>
    </div>
  );
};

RatingForm.propTypes = {
  isDriver: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default RatingForm;

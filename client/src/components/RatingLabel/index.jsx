import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const RatingLabel = ({ rating }) => {
  return (
    <>
      <Icon name="star" color="yellow" /> {rating === null ? 'N/A' : rating}
    </>
  );
};

RatingLabel.propTypes = {
  rating: PropTypes.number
};

export default RatingLabel;

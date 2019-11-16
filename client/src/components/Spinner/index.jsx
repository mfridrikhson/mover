import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { Loader } from 'semantic-ui-react';

const Spinner = ({ text }) => {
  return (
    <div className={styles.loaderContainer}>
      <Loader indeterminate active inline="centered">{text}</Loader>
    </div>
  );
};

Spinner.propTypes = {
  text: PropTypes.string.isRequired
};

export default Spinner;

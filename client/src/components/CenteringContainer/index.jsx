import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const CenteringContainer = ({ children }) => (
  <div className={styles.centeringContainer}>
    <div className={styles.contentContainer}>
      {children}
    </div>
  </div>
);

CenteringContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenteringContainer;

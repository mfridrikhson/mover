import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const CenteringContainer = ({ children }) => (
  <div className={styles.centeringContainer}>
    <div className={styles.contentContainer}>
      {children}
    </div>
    <a
      className={styles.unsplashBadge}
      href="https://unsplash.com/@nxvision?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
      target="_blank"
      rel="noopener noreferrer"
      title="Download free do whatever you want high-resolution photos from Nigel Tadyanehondo">
      <span style={{ display: 'inline-block', padding: '2px 3px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '12px', width: 'auto', position: 'relative', verticalAlign: 'middle', top: '-2px', fill: 'white' }} viewBox="0 0 32 32">
          <title>unsplash-logo</title>
          <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
        </svg>
      </span>
      <span style={{ display: 'inline-block', padding: '2px 3px' }}>Nigel Tadyanehondo</span>
    </a>
  </div>
);

CenteringContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenteringContainer;

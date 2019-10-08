import React from 'react';
import { Button, Divider } from 'semantic-ui-react';

import styles from './styles.module.scss';

const Homepage = () => (
  <div className={styles.homepageContainer}>
    <div className={styles.infoContainer}>
      <h1>Mover</h1>
      <Divider/>
      <h3>Application for convenient transportation</h3>
      <Divider/>
      <div className={styles.buttonRow}>
        <Button size="huge" primary>Log In</Button>
        <Button size="huge" secondary>Sign Up</Button>
      </div>
    </div>
  </div>
);

export default Homepage;

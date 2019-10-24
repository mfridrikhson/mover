import React from 'react';
import PropTypes from 'prop-types';
import { Button, Divider } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import CenteringContainer from '../../components/CenteringContainer';

import styles from './styles.module.scss';

const Homepage = ({ history }) => {
  const redirectToRegister = () => history.push('/register');
  const redirectToLogin = () => history.push('/login');

  return (
    <CenteringContainer>
      <div className={styles.infoContainer}>
        <h1 onClick={() => history.push('/moving')}>Mover</h1>
        <Divider/>
        <h3>Application for convenient transportation</h3>
        <Divider/>
        <div className={styles.buttonRow}>
          <Button size="huge" primary onClick={redirectToLogin}>Log In</Button>
          <Button size="huge" secondary onClick={redirectToRegister}>Sign Up</Button>
        </div>
      </div>
    </CenteringContainer>
  );
};

Homepage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Homepage);

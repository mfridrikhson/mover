import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Menu, Modal, Sidebar } from 'semantic-ui-react';

import Map from '../../containers/Map';
import Order from '../../containers/Order';
import AvailableOrdersList from '../../containers/AvailableOrdersList';
import ProfileInfo from '../../containers/Settings';

import styles from  './styles.module.scss';

const Moving = ({ isDriver }) => {
  const [isSidebarOpened, setSidebarOpened] = useState(false);
  const logOut = () => {
    localStorage.removeItem('token');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <>
      <Map/>

      <div className={styles.controlsContainer}>
        <Icon
          link
          size="big"
          name="bars"
          onClick={() => setSidebarOpened(true)}
        />
        {isDriver
          ? <AvailableOrdersList/>
          : <Order/>
        }
      </div>

      <Sidebar
        as={Menu}
        animation="overlay"
        width="thin"
        icon="labeled"
        inverted
        vertical
        visible={isSidebarOpened}
        onHide={() => setSidebarOpened(false)}
      >
        <Modal
          size="small"
          trigger={
            <Menu.Item link onClick={() => setSidebarOpened(false)}>
              <Icon name="cog"/>
              Settings
            </Menu.Item>
          }>
          <Modal.Content>
            <ProfileInfo/>
          </Modal.Content>
        </Modal>

        <Menu.Item
          link
          onClick={logOut}
        >
          <Icon name="log out"/>
          Log Out
        </Menu.Item>
      </Sidebar>
    </>
  );
};

Moving.propTypes = {
  isDriver: PropTypes.bool.isRequired
};

const mapStateToProps = ({ profile: { user: { isDriver } } }) => ({ isDriver });

export default connect(mapStateToProps)(Moving);

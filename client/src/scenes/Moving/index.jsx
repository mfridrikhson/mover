import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Menu, Modal, Sidebar } from 'semantic-ui-react';

import Map from '../../containers/Map';
import Order from '../../containers/Order';
import AvailableOrdersList from '../../containers/AvailableOrdersList';
import ProfileInfo from '../../containers/Settings';

import styles from  './styles.module.scss';

const Moving = ({ isDriver, order }) => {
  const [isSidebarOpened, setSidebarOpened] = useState(false);
  const [socket, setSocket] = useState(null);

  const logOut = () => {
    localStorage.removeItem('token');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const onPositionChange = ({ lat, lng }) => {
    const { lat: deliverLat, lng: deliverLng } = order.toPoint.coords;
    if (order) {
      socket.emit('newRoutePoint', { orderId: order.id, lat, lng });
      if (Math.abs(deliverLat - lat) < 0.01 && Math.abs(deliverLng - lng) < 0.01) {
        socket.emit('orderFinished', { orderId: order.id });
        socket.close();
      }
    }
  };

  return (
    <>
      <Map
        partnerPoint={!isDriver ? order && order.partnerPoint : null}
        departPoint={order && order.fromPoint.coords}
        deliverPoint={order && order.toPoint.coords}
        isDriver={isDriver}
        onPositionChange={onPositionChange}
      />

      <div className={styles.controlsContainer}>
        <Icon
          link
          size="big"
          name="bars"
          onClick={() => setSidebarOpened(true)}
        />
        {isDriver
          ? <AvailableOrdersList
            setSocket={setSocket}
          />
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
  isDriver: PropTypes.bool.isRequired,
  order: PropTypes.object
};

const mapStateToProps = ({
  profile: {
    user: {
      isDriver
    }
  },
  order: {
    order
  }
}) => ({ isDriver, order });

export default connect(mapStateToProps)(Moving);

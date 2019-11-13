import React from 'react';
import { socketInit } from '../../helpers/socketInitHelper';
import { Card } from 'semantic-ui-react';

class AvailableOrdersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: null
    };
  }

  componentDidMount() {
    this.socket = socketInit();

    this.socket.on('allOrder', orders => {
      this.setState({ orders });
    });

    this.socket.on('newOrder', newOrder => {
      this.setState(({ orders }) => ({ orders: [...orders, newOrder] }));
    });

    this.socket.on('orderFinished', async () => {
      this.setState({ isAccepted: false, driverInfo: null });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  onAcceptOrder = (orderId) => {
    this.socket.emit('acceptOrder', orderId);
  };

  render() {
    const { orders } = this.state;

    return 'OrderList';
  }
}

export default AvailableOrdersList;

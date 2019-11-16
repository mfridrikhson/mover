import React from 'react';
import { socketInit } from '../../helpers/socketInitHelper';
import { Button, Card, Header, Icon } from 'semantic-ui-react';

import Spinner from '../../components/Spinner';
import OrderInfo from '../../components/OrderInfo';

import styles from './styles.module.scss';

const orderProcessSteps = {
  selecting: 0,
  inProcess: 1,
  finished: 2
};

class AvailableOrdersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: null,
      orderStep: orderProcessSteps.selecting
    };
  }

  componentDidMount() {
    this.socket = socketInit('drivers');

    this.socket.on('allOrders', ({ orders }) => {
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

  getOrderProcessStepComponent() {
    const { orders, currentOrder, orderStep } = this.state;

    switch(orderStep) {
      case orderProcessSteps.selecting:
        return (
          <>
            <Header as="h2" attached="top">Pending orders</Header>
            {orders === null
              ? <Spinner text="Getting orders..."/>
              : (
                <div className={styles.availableOrderGrid}>
                  {orders.map(({ customer, ...order }) => (
                    <Card key={order.id}>
                      <Card.Content>
                        <Card.Header>{customer.firstName} {customer.lastName}</Card.Header>
                        <Card.Meta>
                          <Icon name="star" color="yellow" /> {customer.rating === null ? 'N/A' : customer.rating}
                        </Card.Meta>
                        <Card.Description>
                          <OrderInfo
                            volumeWeight={order.volumeWeight}
                            cargoType={order.cargoType}
                            fromAddress={order.fromPoint.address}
                            toAddress={order.toPoint.address}
                          />
                          <Button onClick={() => this.onAcceptOrder(order.id)} fluid primary>Accept</Button>
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  ))}
                </div>
              )
            }
          </>
        );
      case orderProcessSteps.inProcess:
        return (
          <>
            <Header as="h2" attached="top">Current order</Header>
            <Card className={styles.currentOrder}>
              <Card.Content>
                <Card.Header>{currentOrder.customer.firstName} {currentOrder.customer.lastName}</Card.Header>
                <Card.Meta>
                  <Icon name="star" color="yellow" /> {currentOrder.customer.rating === null ? 'N/A' : currentOrder.customer.rating}
                </Card.Meta>
                <Card.Description>
                  <OrderInfo
                    volumeWeight={currentOrder.volumeWeight}
                    cargoType={currentOrder.cargoType}
                    fromAddress={currentOrder.fromPoint.address}
                    toAddress={currentOrder.toPoint.address}
                  />
                </Card.Description>
              </Card.Content>
            </Card>
          </>
        );
    }
  }

  onAcceptOrder = (orderId) => {
    this.socket.emit('acceptOrder', orderId);
    this.setState({
      orderStep: orderProcessSteps.inProcess,
      currentOrder: this.state.orders.find(({ id }) => id === orderId)
    });
  };

  render() {
    return (
      <div className={styles.orderListContainer}>
        {this.getOrderProcessStepComponent()}
      </div>
    );
  }
}

export default AvailableOrdersList;

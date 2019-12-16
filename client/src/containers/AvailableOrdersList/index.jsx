import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card, Header, Icon } from 'semantic-ui-react';

import Spinner from '../../components/Spinner';
import OrderInfo from '../../components/OrderInfo';
import RatingLabel from '../../components/RatingLabel';
import { socketInit } from '../../helpers/socketInitHelper';
import { submitOrder } from '../../routines';

import styles from './styles.module.scss';
import RatingForm from '../../components/RatingForm';
import { updateOrder } from '../../services/orderService';

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
    const isDriver = true;
    this.socket = socketInit(isDriver);
    this.props.setSocket(this.socket);

    this.socket.on('allOrders', ({ orders }) => {
      this.setState({ orders });
    });

    this.socket.on('newOrder', newOrder => {
      this.setState(({ orders }) => ({ orders: [...orders, newOrder] }));
    });

    this.socket.on('orderFinished', async () => {
      this.setState({ orderStep: orderProcessSteps.finished });
      this.socket.emit('getAllOrders');
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
              : orders.length > 0
                ? (
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
                : <div className={styles.message}>No orders available currently :(</div>
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
                  <RatingLabel rating={currentOrder.customer.rating}/>
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
      case orderProcessSteps.finished:
        return <RatingForm onSubmit={this.onSubmitRating} isDriver={true}/>;
      default:
        return null;
    }
  }

  onSubmitRating = async (event, { rating }) => {
    await updateOrder({ id: this.state.currentOrder.id, userRating: rating });
    this.setState({ orderStep: orderProcessSteps.selecting });
  };

  onAcceptOrder = orderId => {
    this.socket.emit('joinRoom', orderId);
    this.socket.emit('acceptOrder', {
      orderId,
      driver: {
        ...this.props.driver,
        ...this.props.user,
        driverId: this.props.driver.id
      }
    });

    this.props.acceptOrder(this.state.orders.find(({ id }) => id === orderId));

    this.setState({
      orderStep: orderProcessSteps.inProcess,
      currentOrder: this.state.orders.find(({ id }) => id === orderId)
    });
  };

  render() {
    const { driver: { currentVehicle } } = this.props;

    return (
      <div className={styles.orderListContainer}>
        {currentVehicle
          ? this.getOrderProcessStepComponent()
          : <div className={styles.message}>Select your <b>current vehicle</b> to start receiving order</div>}
      </div>
    );
  }
}

AvailableOrdersList.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    rating: PropTypes.number
  }).isRequired,
  driver: PropTypes.shape({
    id: PropTypes.string.isRequired,
    currentVehicle: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      registrationPlate: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      photoUrl: PropTypes.string.isRequired,
      techPassportUrl: PropTypes.string.isRequired,
      vehicleType: PropTypes.string.isRequired
    })
  }).isRequired,
  acceptOrder: PropTypes.func.isRequired,
  setSocket: PropTypes.func.isRequired
};

const mapStateToProps = ({ profile: { user, driver } }) => ({
  user,
  driver
});

const mapDispatchToProps = {
  acceptOrder: submitOrder.success
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableOrdersList);

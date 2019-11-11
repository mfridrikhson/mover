import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Icon, Loader, Step } from 'semantic-ui-react';

import CargoParamsForm from '../../components/CargoParamsForm';
import TransportTypeForm from '../../components/TransportTypeForm';
import RoutePointsForm from '../../components/RoutePointsForm';
import ConfirmOrder from '../../components/ConfirmOrder';
import { submitOrder } from '../../routines';
import { socketInit } from '../../helpers/socketInitHelper';

import styles from './styles.module.scss';
import { getVehicleTypes } from '../../services/vehicleTypeService';

const orderSteps = {
  cargoParams: 0,
  transportType: 1,
  routePoints: 2,
  confirmation: 3
};

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: orderSteps.cargoParams,
      volumeWeight: '',
      cargoType: '',
      vehicleTypeId: '',
      vehicleTypes: null,
      fromPoint: undefined,
      toPoint: undefined,
      isAccepted: false,
      driverInfo: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.order && !prevProps.order) {
      this.initSocket();
    }
  }

  initSocket() {
    this.socket = socketInit();
    const { order: { id } } = this.props;

    this.socket.emit('createRoom', id);

    this.socket.on('acceptedOrder', driverInfo => {
      this.setState({ isAccepted: true, driverInfo });
    });

    this.socket.on('orderFinished', async () => {
      this.setState({ isAccepted: false, driverInfo: null });
    });
  }

  goToStep = step => this.setState({ step });

  onBack = () => this.setState(({ step }) => ({ step: step - 1 }));

  onContinue = values => this.setState(({ step }) => ({ step: step + 1, ...values }));

  onSubmit = () => {
    const {
      volumeWeight,
      cargoType,
      vehicleTypeId,
      fromPoint,
      toPoint
    } = this.state;

    this.props.submitOrder({
      volumeWeight,
      cargoType,
      vehicleTypeId,
      fromPoint,
      toPoint
    });
  };

  getStepComponent = step => {
    const {
      volumeWeight,
      cargoType,
      vehicleTypeId,
      vehicleTypes,
      fromPoint,
      toPoint
    } = this.state;
    const { loading } = this.props;

    switch (step) {
      case orderSteps.cargoParams:
        return <CargoParamsForm
          volumeWeight={volumeWeight}
          cargoType={cargoType}
          onContinue={this.onContinue}
        />;
      case orderSteps.transportType:
        if (!vehicleTypes) {
          getVehicleTypes().then(vehicleTypes => this.setState({ vehicleTypes }));

          return <Loader active />;
        }

        return <TransportTypeForm
          vehicleTypeId={vehicleTypeId}
          vehicleTypes={vehicleTypes}
          onBack={this.onBack}
          onContinue={this.onContinue}
        />;
      case orderSteps.routePoints:
        return <RoutePointsForm
          fromPoint={fromPoint}
          toPoint={toPoint}
          onBack={this.onBack}
          onContinue={this.onContinue}
        />;
      case orderSteps.confirmation:
        return <ConfirmOrder
          volumeWeight={volumeWeight}
          cargoType={cargoType}
          transportType={vehicleTypes.find(({ id }) => id === vehicleTypeId).type}
          fromAddress={fromPoint.address}
          toAddress={toPoint.address}
          loading={loading}
          onBack={this.onBack}
          onConfirm={this.onSubmit}
        />;
      default:
        return <CargoParamsForm
          volumeWeight={volumeWeight}
          cargoType={cargoType}
          onContinue={this.onContinue}
        />;
    }
  };

  render() {
    const { step, volumeWeight, transportType } = this.state;
    const stepComponent = this.getStepComponent(step);

    return (
      <div className={styles.orderContainer}>
        <Header as="h2" attached="top">Your Order</Header>
        {stepComponent}
        {step !== orderSteps.confirmation && (
          <Step.Group attached="bottom" size="mini">
            <Step
              link
              active={step === orderSteps.cargoParams}
              onClick={() => this.goToStep(orderSteps.cargoParams)}
            >
              <Icon name="boxes" />
              <Step.Content>
                <Step.Title>Cargo info</Step.Title>
                <Step.Description>Enter cargo parameters</Step.Description>
              </Step.Content>
            </Step>

            <Step
              link
              disabled={!volumeWeight}
              active={step === orderSteps.transportType}
              onClick={() => this.goToStep(orderSteps.transportType)}
            >
              <Icon name="truck" />
              <Step.Content>
                <Step.Title>Transport</Step.Title>
                <Step.Description>Choose truck type</Step.Description>
              </Step.Content>
            </Step>

            <Step
              link
              disabled={!volumeWeight || !transportType}
              active={step === orderSteps.routePoints}
              onClick={() => this.goToStep(orderSteps.routePoints)}
            >
              <Icon name="map marker alternate" />
              <Step.Content>
                <Step.Title>Route points</Step.Title>
                <Step.Description>Select route points</Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>
        )}
      </div>
    );
  }
}

Order.propTypes = {
  order: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  submitOrder: PropTypes.func.isRequired
};

const mapStateToProps = ({ order: { order, loading } }) => ({
  order,
  loading
});

const mapDispatchToProps = {
  submitOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);

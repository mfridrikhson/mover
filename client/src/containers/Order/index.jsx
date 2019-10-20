import React from 'react';
import { Header, Icon, Step } from 'semantic-ui-react';

import CargoParamsForm from '../../components/CargoParamsForm';
import TransportTypeForm from '../../components/TransportTypeForm';
import RoutePointsForm from '../../components/RoutePointsForm';

import styles from './styles.module.scss';
import ConfirmOrder from '../../components/ConfirmOrder';

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
      transportType: '',
      pointFrom: undefined,
      pointTo: undefined
    };
  }

  goToStep = step => this.setState({ step });

  onBack = () => this.setState(({ step }) => ({ step: step - 1 }));

  onContinue = values => this.setState(({ step }) => ({ step: step + 1, ...values }));

  onSubmit = () => null;

  getStepComponent = step => {
    const {
      volumeWeight,
      cargoType,
      transportType,
      pointFrom,
      pointTo
    } = this.state;

    switch (step) {
      case orderSteps.cargoParams:
        return <CargoParamsForm
          volumeWeight={volumeWeight}
          cargoType={cargoType}
          onContinue={this.onContinue}
        />;
      case orderSteps.transportType:
        return <TransportTypeForm
          transportType={transportType}
          onBack={this.onBack}
          onContinue={this.onContinue}
        />;
      case orderSteps.routePoints:
        return <RoutePointsForm
          pointFrom={pointFrom}
          pointTo={pointTo}
          onBack={this.onBack}
          onContinue={this.onContinue}
        />;
      case orderSteps.confirmation:
        return <ConfirmOrder
          volumeWeight={volumeWeight}
          cargoType={cargoType}
          transportType={transportType}
          addressFrom={pointFrom.address}
          addressTo={pointTo.address}
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

export default Order;

import React from 'react';
import { Header, Icon, Step } from 'semantic-ui-react';

import CargoParamsForm from '../../components/CargoParamsForm';
import TransportTypeForm from '../../components/TransportTypeForm';

import styles from './styles.module.scss';

const orderSteps = {
  cargoParams: 0,
  transportType: 1,
  confirm: 2
};

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: orderSteps.cargoParams,
      volumeWeight: '',
      cargoType: '',
      transportType: ''
    };
  }

  goToStep = step => this.setState({ step });

  onBack = () => this.setState(({ step }) => ({ step: step - 1 }));

  onContinue = values => this.setState(({ step }) => ({ step: step + 1, ...values }));

  getStepComponent = step => {
    const { volumeWeight, cargoType, transportType } = this.state;

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
              <Step.Description>Choose truck type </Step.Description>
            </Step.Content>
          </Step>

          <Step
            link
            disabled={!volumeWeight || !transportType}
            active={step === orderSteps.confirm}
            onClick={() => this.goToStep(orderSteps.confirm)}
          >
            <Icon name="info" />
            <Step.Content>
              <Step.Title>Confirm Order</Step.Title>
              <Step.Description>Verify order details</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
      </div>
    );
  }
}

export default Order;

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import OrderInfo from '../OrderInfo';

import styles from './styles.module.scss';

const ConfirmOrder = ({
  volumeWeight,
  cargoType,
  transportType,
  fromAddress,
  toAddress,
  loading,
  onBack,
  onConfirm
}) => {
  return (
    <div className={styles.confirmOrderContainer}>
      <OrderInfo
        volumeWeight={volumeWeight}
        cargoType={cargoType}
        transportType={transportType}
        fromAddress={fromAddress}
        toAddress={toAddress}
      />
      <Button onClick={onBack}>Edit</Button>
      <Button primary loading={loading} onClick={onConfirm}>Confirm Order & Submit</Button>
    </div>
  );
};

ConfirmOrder.propTypes = {
  volumeWeight: PropTypes.number.isRequired,
  cargoType: PropTypes.string,
  transportType: PropTypes.string.isRequired,
  fromAddress: PropTypes.string.isRequired,
  toAddress: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ConfirmOrder;

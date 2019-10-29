import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'semantic-ui-react';

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
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              Volume weight
            </Table.Cell>
            <Table.Cell>
              {`${volumeWeight} kg`}
            </Table.Cell>
          </Table.Row>
          {cargoType && (
            <Table.Row>
              <Table.Cell>
                Cargo type
              </Table.Cell>
              <Table.Cell>
                {cargoType}
              </Table.Cell>
            </Table.Row>
          )}
          <Table.Row>
            <Table.Cell>
              Transport type
            </Table.Cell>
            <Table.Cell>
              {transportType}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Depart from
            </Table.Cell>
            <Table.Cell>
              {fromAddress}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Deliver to
            </Table.Cell>
            <Table.Cell>
              {toAddress}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button onClick={onBack}>Edit</Button>
      <Button primary loading={loading} onClick={onConfirm}>Confirm Order & Submit</Button>
    </div>
  );
};

ConfirmOrder.propTypes = {
  volumeWeight: PropTypes.number.isRequired,
  cargoType: PropTypes.string.isRequired,
  transportType: PropTypes.string.isRequired,
  fromAddress: PropTypes.string.isRequired,
  toAddress: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ConfirmOrder;

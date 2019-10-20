import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'semantic-ui-react';

import styles from './styles.module.scss';

const ConfirmOrder = ({
  volumeWeight,
  cargoType,
  transportType,
  addressFrom,
  addressTo,
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
              {addressFrom}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Deliver to
            </Table.Cell>
            <Table.Cell>
              {addressTo}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button onClick={onBack}>Edit</Button>
      <Button primary onClick={onConfirm}>Confirm Order & Submit</Button>
    </div>
  );
};

ConfirmOrder.propTypes = {
  volumeWeight: PropTypes.string.isRequired,
  cargoType: PropTypes.string.isRequired,
  transportType: PropTypes.string.isRequired,
  addressFrom: PropTypes.string.isRequired,
  addressTo: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ConfirmOrder;

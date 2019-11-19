import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import styles from './styles.module.scss';

const OrderInfo = ({ volumeWeight, cargoType, fromAddress, transportType, toAddress }) => {
  return (
    <Table definition className={styles.orderInfoTable}>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            Volume weight
          </Table.Cell>
          <Table.Cell>
            {`${volumeWeight} kg`}
          </Table.Cell>
        </Table.Row>
        {cargoType
          ? (
            <Table.Row>
              <Table.Cell>
              Cargo type
              </Table.Cell>
              <Table.Cell>
                {cargoType}
              </Table.Cell>
            </Table.Row>
          )
          : null
        }
        {transportType
          ? (
            <Table.Row>
              <Table.Cell>
              Transport type
              </Table.Cell>
              <Table.Cell>
                {transportType}
              </Table.Cell>
            </Table.Row>
          )
          : null
        }
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
  );
};

OrderInfo.propTypes = {
  volumeWeight: PropTypes.number.isRequired,
  cargoType: PropTypes.string,
  transportType: PropTypes.string,
  fromAddress: PropTypes.string.isRequired,
  toAddress: PropTypes.string.isRequired
};

export default OrderInfo;

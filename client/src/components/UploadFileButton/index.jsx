import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import styles from './styles.module.scss';

const UploadFileButton = ({
  text,
  icon,
  name,
  acceptType,
  isLoading,
  onFileLoad
}) => (
  <>
    <Button
      className={styles.uploadButton}
      as="label"
      htmlFor={name}
      icon={icon}
      content={text}
      type="button"
      loading={isLoading}
      fluid
      primary
    />
    <input
      id={name}
      className={styles.uploadInput}
      accept={acceptType}
      type="file"
      name={name}
      multiple
      onChange={onFileLoad}
    />
  </>
);

UploadFileButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  acceptType: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onFileLoad: PropTypes.func.isRequired
};

export default UploadFileButton;

import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import PlacesAutocomplete from 'react-places-autocomplete';

const AddressPicker = ({ address, setAddress, handleSelect }) => (
  <PlacesAutocomplete
    value={address}
    onChange={setAddress}
    onSelect={handleSelect}
  >
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
      const { onChange } = getInputProps();
      return (
        <Dropdown
          value={address}
          search
          selection
          loading={loading}
          placeholder="Search address"
          searchQuery={address}
          onSearchChange={(event, data) => {
            onChange(event);
            setAddress(data.searchQuery);
          }}
          options={suggestions.map((suggestion) => ({
            value: suggestion.description,
            text: suggestion.description,
            ...getSuggestionItemProps(suggestion)
          }))}
        />
      );
    }}
  </PlacesAutocomplete>
);

AddressPicker.propTypes = {
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired
};

export default AddressPicker;

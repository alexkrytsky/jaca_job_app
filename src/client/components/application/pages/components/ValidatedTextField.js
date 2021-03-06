import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import ValidatedField from '../../../../store/application/ValidatedField';


@observer
class ValidatedTextField extends Component {
  handleChange = (event) => {
    const { target } = event;
    const { state } = this.props;

    state.update(target.value);
  };

  render() {
    const { props } = this;
    const { state } = props;
    const { value, validation } = state;
    return (
      <TextField
        {...props}
        required // The field is required
        fullWidth
        value={value} // Value to bind the field to
        error={validation} // If true, show validation error
        onChange={this.handleChange} // Event to update state when input changes
      />
    );
  }
}

// Tell React that we require this property
ValidatedTextField.propTypes = {
  state: PropTypes.instanceOf(ValidatedField).isRequired
};

export default ValidatedTextField;

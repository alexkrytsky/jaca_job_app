import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import ValidatedTextField from './ValidatedTextField';
import Field from '../../../../store/application/Field';

@observer
class ReactiveTextField extends Component {
  handleChange = (event) => {
    const { target } = event;
    const { state } = this.props;

    state.update(target.value);
  };

  render() {
    const { props } = this;
    const { state } = props;
    const { value } = state;
    return (
      <TextField
        {...props}
        fullWidth
        value={value} // Value to bind the field to>
        onChange={this.handleChange} // Event to update state when input changes
      />
    );
  }
}

// Tell React that we require this property
ValidatedTextField.propTypes = {
  state: PropTypes.instanceOf(Field).isRequired
};

export default ReactiveTextField;

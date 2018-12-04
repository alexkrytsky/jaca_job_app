import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { RadioGroup } from '@material-ui/core';
import ValidatedField from '../../../../store/application/ValidatedField';


@observer
class ValidatedRadioGroup extends Component {
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
      <RadioGroup
        {...props}
        required // The field is required
        value={value} // Value to bind the field to
        onChange={this.handleChange} // Event to update state when input changes
      />
    );
  }
}

// Tell React that we require this property
ValidatedRadioGroup.propTypes = {
  state: PropTypes.instanceOf(ValidatedField).isRequired
};

export default ValidatedRadioGroup;




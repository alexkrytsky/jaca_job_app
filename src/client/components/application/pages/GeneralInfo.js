import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import StatesList from '../../../constants/states';


const styles = () => ({
  typography: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  formControlLabel: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  formControl: {
    minWidth: 120,
  },
});

@inject('store')
@observer
class GeneralInfo extends Component {
  handleChange = (event) => {
    const { target } = event;
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    const { store } = this.props;
    const { application } = store;
    const { generalInfo } = application;

    generalInfo.update(name, value);
  };

  render() {
    const { store, classes } = this.props;
    const {
      firstName,
      firstNameValidation,
      lastName,
      lastNameValidation,
      middleName,
      address1,
      address1Validation,
      address2,
      city,
      cityValidation,
      state,
      stateValidation,
      zipCode,
      zipCodeValidation,
      homePhone,
      homePhoneValidation,
      cellPhone,
      cellPhoneValidation,
      email,
      emailValidation,
      ageCheck,
      authorizedCheck
    } = store.application.generalInfo;
    return (
      <Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              value={firstName}
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              onChange={this.handleChange}
              error={firstNameValidation}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              value={lastName}
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              onChange={this.handleChange}
              error={lastNameValidation}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              value={middleName}
              id="middleName"
              name="middleName"
              label="Middle Name"
              fullWidth
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subheading" className={classes.typography}>
              Present Address
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              value={address1}
              id="address1"
              name="address1"
              label="Address 1"
              fullWidth
              onChange={this.handleChange}
              error={address1Validation}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={address2}
              id="address2"
              name="address2"
              label="Address 2"
              fullWidth
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              value={city}
              id="city"
              name="city"
              label="City"
              fullWidth
              onChange={this.handleChange}
              error={cityValidation}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className={classes.formControl} error={stateValidation}>
              <InputLabel htmlFor="state">State</InputLabel>
              <Select
                required
                value={state}
                onChange={this.handleChange}
                inputProps={{
                  name: 'state',
                  id: 'state'
                }}
              >
                {StatesList.map(s => (
                  <MenuItem key={s.name} value={s.name}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              value={zipCode}
              id="zipCode"
              name="zipCode"
              label="Zip Code"
              fullWidth
              onChange={this.handleChange}
              error={zipCodeValidation}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subheading" className={classes.typography}>
              Contact Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              value={homePhone}
              id="homePhone"
              name="homePhone"
              label="Home Phone"
              fullWidth
              onChange={this.handleChange}
              error={homePhoneValidation}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              value={cellPhone}
              id="cellPhone"
              name="cellPhone"
              label="Cell Phone"
              fullWidth
              onChange={this.handleChange}
              error={cellPhoneValidation}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              value={email}
              id="email"
              name="email"
              label="Email"
              fullWidth
              onChange={this.handleChange}
              error={emailValidation}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={(
                <Checkbox
                  color="secondary"
                  name="ageCheck"
                  value="true"
                  checked={ageCheck}
                  onChange={this.handleChange}
                />
              )}
              label="Check if you are 18 years or older"
              className={classes.formControlLabel}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={(
                <Checkbox
                  color="secondary"
                  name="authorizedCheck"
                  value="true"
                  checked={authorizedCheck}
                  onChange={this.handleChange}
                />
              )}
              label="Check if you are legally authorized to work in the United States"
              className={classes.formControlLabel}
            />
            <Typography variant="caption" className={classes.typography}>
              Proof of eligibility documentation must be provided at time of hire as required by law
            </Typography>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

GeneralInfo.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(GeneralInfo));

import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import StatesList from '../../../constants/states';
import ValidatedTextField from './components/ValidatedTextField';
import ReactiveTextField from './components/ReactiveTextField';

// Component Styles
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
  }
});

/**
 * General Information Form
 */
@inject('store')
@observer
class GeneralInfo extends Component {
  render() {
    const { store, classes } = this.props;
    const {
      firstName,
      lastName,
      middleName,
      address1,
      address2,
      city,
      state,
      zipCode,
      primaryPhone,
      secondaryPhone,
      email,
      ageCheck,
      authorizedCheck
    } = store.application.generalInfo;

    return (
      <Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <ValidatedTextField state={firstName} label="First Name" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ValidatedTextField state={lastName} label="Last Name" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ReactiveTextField state={middleName} label="Middle Name" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subheading">Present Address</Typography>
          </Grid>
          <Grid item xs={12}>
            <ValidatedTextField state={address1} label="Address 1" />
          </Grid>
          <Grid item xs={12}>
            <ReactiveTextField state={address2} label="Address 2" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ValidatedTextField state={city} label="City" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              required
              fullWidth
              className={classes.formControl}
              error={state.validation}
            >
              <InputLabel htmlFor="state">State</InputLabel>
              <Select value={state.value} onChange={event => state.update(event.target.value)}>
                {StatesList.map(s => (
                  <MenuItem key={s.name} value={s.name}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ValidatedTextField state={zipCode} label="Zip Code" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subheading">Contact Information</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ValidatedTextField state={primaryPhone} label="Primary Phone" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReactiveTextField state={secondaryPhone} label="Secondary Phone" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ValidatedTextField state={email} label="Email" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              className={classes.formControlLabel}
              label="Check if you are 18 years or older"
              control={(
                <Checkbox
                  color="secondary"
                  value="true"
                  checked={ageCheck.value}
                  onChange={event => ageCheck.update(event.target.checked)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              className={classes.formControlLabel}
              label="Check if you are legally authorized to work in the United States"
              control={(
                <Checkbox
                  color="secondary"
                  value="true"
                  checked={authorizedCheck.value}
                  onChange={event => authorizedCheck.update(event.target.checked)}
                />
              )}
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

// Tell React that these properties are provided
GeneralInfo.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(GeneralInfo));

import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import {
  Checkbox, FormControl,
  FormControlLabel,
  Grid,
  InputLabel, MenuItem, Select,
  Typography,
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';

import ValidatedTextField from './components/ValidatedTextField';
import StatesList from '../../../constants/states';

const styles = theme => ({
  padding: {
    padding: theme.spacing.unit * 2
  }
});

@inject('store')
@observer
class EmploymentDesired extends Component {
  componentWillMount() {
    const { store } = this.props;
    store.fetchJobs();
  }

  render() {
    const { store, classes } = this.props;
    const {
      employmentDesired,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      salaryExpectations,
      startDate,
      applied,
      workedAtMsc
    } = store.application.employmentDesired;
    const { jobs } = store.session;

    return (
      <Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <FormControl
              required
              fullWidth
              className={classes.formControl}
              error={employmentDesired.validation}
            >
              <InputLabel htmlFor="state">Position Applying For</InputLabel>
              <Select
                value={employmentDesired.value}
                onChange={event => employmentDesired.update(event.target.value)}
              >
                {jobs.map(s => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <ValidatedTextField
              state={startDate}
              id="startDate"
              name="startDate"
              label="Start Date"
            />
          </Grid>
          <Grid item xs={12}>
            <ValidatedTextField
              state={salaryExpectations}
              id="salaryExpectations"
              name="salaryExpectations"
              label="Salary Expectations"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={(
                <Checkbox
                  color="secondary"
                  name="applied"
                  value="true"
                  checked={applied.value}
                  onChange={event => applied.update(event.target.checked)}
                />
              )}
              label="Have you applied to MSC within the last 12 months?"
              className={classes.formControlLabel}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={(
                <Checkbox
                  color="secondary"
                  name="workedAtMsc"
                  value="true"
                  checked={workedAtMsc.value}
                  onChange={event => workedAtMsc.update(event.target.checked)}
                />
              )}
              label="Have you worked at MSC before?"
              className={classes.formControlLabel}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subheading">Days Available</Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            <FormControlLabel
              control={(
                <Checkbox
                  color="secondary"
                  name="monday"
                  value="true"
                  checked={monday.value}
                  onChange={event => monday.update(event.target.checked)}
                />
              )}
              label="Monday"
              className={classes.formControlLabel}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <FormControlLabel
              control={(
                <Checkbox
                  color="secondary"
                  name="tuesday"
                  value="true"
                  checked={tuesday.value}
                  onChange={event => tuesday.update(event.target.checked)}
                />
              )}
              label="Tuesday"
              className={classes.formControlLabel}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <FormControlLabel
              control={(
                <Checkbox
                  color="secondary"
                  name="tuesday"
                  value="true"
                  checked={wednesday.value}
                  onChange={event => wednesday.update(event.target.checked)}
                />
              )}
              label="Wednesday"
              className={classes.formControlLabel}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <FormControlLabel
              control={(
                <Checkbox
                  color="secondary"
                  name="thursday"
                  value="true"
                  checked={thursday.value}
                  onChange={event => thursday.update(event.target.checked)}
                />
              )}
              label="Thursday"
              className={classes.formControlLabel}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <FormControlLabel
              control={(
                <Checkbox
                  color="secondary"
                  name="friday"
                  value="true"
                  checked={friday.value}
                  onChange={event => friday.update(event.target.checked)}
                />
              )}
              label="Friday"
              className={classes.formControlLabel}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

EmploymentDesired.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(EmploymentDesired));

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
import ReactiveTextField from './components/ReactiveTextField';
import ValidatedTextField from './components/ValidatedTextField';

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
      salaryExpectations,
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
              <InputLabel htmlFor="state">Job Applying For</InputLabel>
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
            <ReactiveTextField
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

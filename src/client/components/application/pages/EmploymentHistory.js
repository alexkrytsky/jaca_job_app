import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Button, Checkbox, Collapse, FormControlLabel, Grid, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import ValidatedTextField from './components/ValidatedTextField';
import EmploymentHistoryTable from './components/EmploymentHistoryTable';

// Component Styles
const styles = theme => ({
  padding: {
    padding: theme.spacing.unit * 2
  }
});

/**
 * Employment History Form
 */
@inject('store')
@observer
class EmploymentHistory extends Component {
  state = {
    adding: false
  };

  /**
   * Open the form
   */
  openForm = () => {
    this.setState({ adding: true });
  };

  /**
   * Close and clear the form
   */
  closeForm = () => {
    this.setState({ adding: false });
    const { store } = this.props;
    store.application.employmentHistory.clear();
  };

  render() {
    const { adding } = this.state;
    const { store, classes } = this.props;
    const {
      history,
      employer,
      address,
      contactNumber,
      position,
      startDate,
      endDate,
      supervisorName,
      supervisorTitle,
      reasonLeft,
      description,
      contactPermission,
      save,
    } = store.application.employmentHistory;

    return (
      <Fragment>
        <Collapse in={!adding}>
          <Grid container spacing={24}>
            {history.length > 0 && (
              <Grid item xs={12}>
                <EmploymentHistoryTable />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="raised"
                color="secondary"
                onClick={this.openForm}
              >
                <Add /> Add Record
              </Button>
            </Grid>
          </Grid>
        </Collapse>
        <Collapse in={adding}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                state={employer}
                id="employer"
                name="employer"
                label="Employer"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                state={address}
                id="address"
                name="address"
                label="Address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                state={contactNumber}
                id="contactNumber"
                name="contactNumber"
                label="Contact Number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                state={position}
                id="position"
                name="position"
                label="Position"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                state={startDate}
                id="startDate"
                name="startDate"
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                state={endDate}
                id="endDate"
                name="endDate"
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                state={supervisorName}
                id="supervisorName"
                name="supervisorName"
                label="Supervisor Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ValidatedTextField
                state={supervisorTitle}
                id="supervisorTitle"
                name="supervisorTitle"
                label="Supervisor Title"
              />
            </Grid>
            <Grid item xs={12}>
              <ValidatedTextField
                state={reasonLeft}
                id="reasonLeft"
                name="reasonLeft"
                label="Reason for Leaving"
              />
            </Grid>
            <Grid item xs={12}>
              <ValidatedTextField
                state={description}
                multiline
                rowsMax="4"
                margin="normal"
                helperText="Description"
                id="description"
                name="description"
                label="Description of work"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={(
                  <Checkbox
                    color="secondary"
                    name="contactPermission"
                    value="true"
                    checked={contactPermission.value}
                    onChange={event => contactPermission.update(event.target.checked)}
                  />
                )}
                label="Check if you authorize us to contact your previous employer."
                className={classes.formControlLabel}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (save()) {
                    this.closeForm();
                  }
                }}
              >Save
              </Button>
              <Button
                onClick={this.closeForm}
              >Cancel
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Fragment>
    );
  }
}

// Tell React that these properties are provided
EmploymentHistory.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.instanceOf(RootState).isRequired
};

export default withStyles(styles)(withRouter(EmploymentHistory));

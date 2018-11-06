import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import {
  Button,
  Collapse,
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  withStyles,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import ValidatedTextField from './components/ValidatedTextField';
import ValidatedRadioGroup from './components/ValidatedRadioGroup';
import EducationTable from './components/EducationTable';


// Component Styles
const styles = theme => ({
  padding: {
    padding: theme.spacing.unit * 2
  }
});

@inject('store')
@observer
class Education extends Component {
  state = {
    adding: false,
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
    store.application.education.clear();
  };

  render() {
    const { adding } = this.state;
    const { store, classes } = this.props;
    const {
      school,
      educationLevel,
      schoolName,
      schoolLocation,
      yearsCompleted,
      graduate,
      diploma,
      save,
    } = store.application.education;


    return (
      <Fragment>
        <Collapse in={!adding}>
          <Grid container spacing={24}>
            {school.length > 0 && (
              <Grid item xs={12}>
                <EducationTable />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="raised"
                color="secondary"
                onClick={this.openForm}
              >
                <Add /> Add School
              </Button>
            </Grid>
          </Grid>

        </Collapse>
        <Collapse in={adding}>
          <Grid container spacing={24}>

            {/*add radio button for type of education*/}
            <Grid item xs={12} sm={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Choose Education Level</FormLabel>
                <ValidatedRadioGroup
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                  aria-label="schoolType"
                  className={classes.group}
                  state={educationLevel}
                >
                  <FormControlLabel
                    value="High School"
                    control={<Radio />}
                    label="High School"
                  />
                  <FormControlLabel
                    value="College"
                    control={<Radio />}
                    label="College"
                  />
                  <FormControlLabel
                    value="Graduate School"
                    control={<Radio />}
                    label="Graduate School"
                  />
                </ValidatedRadioGroup>
              </FormControl>
            </Grid>

            {/*school name*/}

            <Grid item xs={12} sm={12}>
              <ValidatedTextField
                state={schoolName}
                label="School Name"
              />
            </Grid>


            {/*School Location*/}
            <Grid item xs={12} sm={12}>
              <ValidatedTextField
                state={schoolLocation}
                label="School Location"
              />
            </Grid>


            {/*Number of years completed*/}

            <Grid item xs={12} sm={12}>
              <ValidatedTextField
                state={yearsCompleted}
                label="Years Completed"
                type="number"
              />
            </Grid>


            {/*did the person graduate?*/}

            <Grid item xs={12} sm={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Did you graduate?</FormLabel>
                <ValidatedRadioGroup
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                  aria-label="Graduate"
                  className={classes.group}
                  state={graduate}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="yes" />
                  <FormControlLabel value="no" control={<Radio />} label="no" />
                </ValidatedRadioGroup>
              </FormControl>
            </Grid>


            {/*what diploma the person got*/}

            <Grid item xs={12} sm={12}>
              <ValidatedTextField
                state={diploma}
                id="diploma"
                name="diploma"
                label="Diploma/Degree/Certificate"
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

Education.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(Education));







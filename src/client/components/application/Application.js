import React, { Component, Fragment } from 'react';
import {
  Button,
  CssBaseline,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  withStyles
} from '@material-ui/core';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import RootState from '../../store/RootState';
import {
  GeneralInfo,
  EmploymentDesired,
  EmploymentHistory,
  Education,
  SpecialSkills,
  References,
  VoluntarySurvey,
  Submit
} from './pages';
import Success from './Success';
import CustomNavBar from '../common/CustomNavBar';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 10,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = [
  'General Information',
  'Employment Desired',
  'Education',
  'Special Skills',
  'Employment History',
  'References',
  'Voluntary Survey',
  'Submit'
];

@inject('store')
@observer
class Application extends Component {
  static getStepComponent(step) {
    switch (step) {
      case 0:
        return <GeneralInfo />;
      case 1:
        return <EmploymentDesired />;
      case 2:
        return <Education />;
      case 3:
        return <SpecialSkills />;
      case 4:
        return <EmploymentHistory />;
      case 5:
        return <References />;
      case 6:
        return <VoluntarySurvey />;
      case 7:
        return <Submit />;
      default:
        throw new Error('Unknown Step');
    }
  }

  render() {
    const { store, classes } = this.props;
    const { formBack, formNext, application } = store;
    const { step } = application;
    return (
      <Fragment>
        <CssBaseline />
        <CustomNavBar />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center">
              Job Application Process
            </Typography>
            <Fragment>
              {step === steps.length ? (
                <Fragment>
                  <Success />
                </Fragment>
              ) : (
                <Fragment>
                  <Stepper activeStep={step} orientation="vertical" className={classes.stepper}>
                    {steps.map(label => (
                      <Step key={label}>
                        <StepLabel>
                          <Typography variant="title">{label}</Typography>
                        </StepLabel>
                        <StepContent>
                          {Application.getStepComponent(step)}
                          <div className={classes.buttons}>
                            {step !== 0 && (
                              <Button onClick={formBack} className={classes.button}>Back</Button>
                            )}
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={formNext}
                              className={classes.button}
                            >
                              {step === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                          </div>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Fragment>
              )}
            </Fragment>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

Application.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(Application));

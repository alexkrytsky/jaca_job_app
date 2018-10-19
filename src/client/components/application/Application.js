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
import Success from './Success';
import CustomNavBar from '../common/CustomNavBar';

// Application paper max width
const appWidth = 800;

// Component Styles
const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(appWidth + theme.spacing.unit * 2 * 2)]: {
      width: appWidth,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up(appWidth + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    backgroundColor: theme.palette.background.default,
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  padding: {
    padding: theme.spacing.unit * 2
  }
});

/**
 * Job Application Component
 */
@inject('store')
@observer
class Application extends Component {
  componentWillMount() {
    const { store } = this.props;
    // Reset drawer if in open state
    store.open = false;
  }

  render() {
    const { store, classes } = this.props;
    const {
      step,
      listOfSteps,
      backStep,
      nextStep,
      setStep
    } = store.application;
    return (
      <Fragment>
        <CssBaseline />
        <CustomNavBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography variant="display1" align="center">
                Job Application Process
              </Typography>
              <Fragment>
                {step === listOfSteps.length ? (
                  <Fragment>
                    <Success />
                  </Fragment>
                ) : (
                  <Fragment>
                    <Stepper activeStep={step} orientation="vertical" className={classes.stepper}>
                      {listOfSteps.map((section, index) => (
                        <Step key={section.label}>
                          <StepLabel
                            error={section.error}
                            optional={section.error && (
                              <Typography
                                variant="caption"
                                color="error"
                              >{section.errorMessage}
                              </Typography>
                            )}
                          >
                            <Typography
                              variant="title"
                              onClick={() => setStep(index)}
                            >{section.label}
                            </Typography>
                          </StepLabel>
                          <StepContent>
                            <div className={classes.padding}>
                              {section.component}
                              <div className={classes.buttons}>
                                {step !== 0 && (
                                  <Button
                                    onClick={backStep}
                                    className={classes.button}
                                  >Back
                                  </Button>
                                )}
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={nextStep}
                                  className={classes.button}
                                >
                                  {step === listOfSteps.length - 1 ? 'Submit' : 'Next'}
                                </Button>
                              </div>
                            </div>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </Fragment>
                )}
              </Fragment>
            </Paper>
          </div>
        </main>
      </Fragment>
    );
  }
}

// Tell React that these properties are provided
Application.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(Application));

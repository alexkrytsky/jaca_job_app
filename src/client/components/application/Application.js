import React, { Component, Fragment } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  ListItemIcon,
  Typography,
  ListItemText,
  withStyles
} from '@material-ui/core';
import { FlashAuto, SkipNext } from '@material-ui/icons';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import RootState from '../../store/RootState';
import Success from './Success';

// Application paper max width
const appWidth = 1000;

const topOffset = 60;

// Component Styles
const styles = theme => ({
  layout: {
    width: 'auto',
    paddingTop: `${topOffset}px`,
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
  padding: {
    padding: theme.spacing.unit * 2
  },
  devTools: {
    zIndex: 10000,
    position: 'fixed',
    top: '16px',
    right: '72px'
  },
});

/**
 * Job Application Component
 */
@inject('store')
@observer
class Application extends Component {
  state = {
    anchorEl: null,
  };

  componentWillMount() {
    const { store } = this.props;
    // Reset drawer if in open state
    store.open = false;
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { store, classes } = this.props;
    const {
      step,
      listOfSteps,
      backStep,
      nextStep,
      setStep
    } = store.application;
    return (
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
        <div className={classes.devTools}>
          <Button
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >Dev Tools
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={() => {
              this.handleClose();
              (store.application.step = step + 1);
            }}
            >
              <ListItemIcon>
                <SkipNext />
              </ListItemIcon>
              <ListItemText inset primary="Skip Section" />
            </MenuItem>
            <MenuItem onClick={() => {
              this.handleClose();
              store.application.fillData();
            }}
            >
              <ListItemIcon>
                <FlashAuto />
              </ListItemIcon>
              <ListItemText inset primary="Fill Section" />
            </MenuItem>
          </Menu>
        </div>
      </div>
    );
  }
}

// Tell React that these properties are provided
Application.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(Application));

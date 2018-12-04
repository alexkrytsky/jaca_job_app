import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import {
  Avatar,
  Button,
  Chip,
  Grid,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';
import { Error, Lock, FiberNewOutlined } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RootState from '../../store/RootState';
import ValidatedTextField from '../application/pages/components/ValidatedTextField';

const styles = theme => ({
  paper: {
    width: 'auto',
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  avatarSecondary: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

@inject('store')
@observer
class Login extends Component {
  render() {
    const { store, classes } = this.props;
    const { email, password, login, error } = store.authentication;
    return (
      <Grid
        container
        spacing={40}
        direction="row"
        justify="space-around"
        alignItems="stretch"
      >
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatarSecondary}>
              <FiberNewOutlined />
            </Avatar>
            <Typography variant="display3">
              Apply Here
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              component={Link}
              to="/app"
            >
              Go to Application
            </Button>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Lock />
            </Avatar>
            <Typography variant="display2">
              Staff Sign in
            </Typography>
            {error !== '' ? (<Chip label={error} color="secondary" icon={<Error />} />) : (
              <Fragment />)}
            <ValidatedTextField
              state={email}
              label="Email Address"
              autoFocus
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  login();
                }
              }}
            />
            <ValidatedTextField
              state={password}
              label="Password"
              type="password"
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  login();
                }
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              Sign in
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Login.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(Login));

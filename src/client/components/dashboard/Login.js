import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import {
  Avatar,
  Button,
  Chip,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';
import { Error, Lock } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import RootState from '../../store/RootState';
import ValidatedTextField from '../application/pages/components/ValidatedTextField';
import { Link } from 'react-router-dom';

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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
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
      <Fragment>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Lock />
          </Avatar>
          <Typography variant="display3">
            Sign in
          </Typography>
          {error !== '' ? (<Chip label={error} color="secondary" icon={<Error />} />) : (<Fragment />)}
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
          <Typography className={classes.submit} variant="subheading">
            ----- OR -----
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
      </Fragment>
    );
  }
}

Login.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(Login));

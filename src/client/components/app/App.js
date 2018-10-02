import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';
import './app.css';
import ReactImage from '../../react.png';
import TestState from '../../store/TestState';
import Jobs from '../jobs/Jobs';
import { withStyles } from '@material-ui/core';

const Dashboard = () => <h1>Dashboard</h1>;
const Default = () => <img src={ReactImage} alt="404" />;

const HomeLink = props => <Link to="/" {...props} />;
const DashboardLink = props => <Link to="/dashboard" {...props} />;
const JobsLink = props => <Link to="/jobs" {...props} />;

// Component Styling
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  }
});

// Component Creation
@inject('store')
@observer
class App extends Component {
  render() {
    const { store, classes } = this.props;
    return (
      <Fragment>
        <h1>{store.username}</h1>
        <Button variant="contained" color="primary" component={HomeLink} className={classes.button}>
          Home
        </Button>
        <Button variant="contained" color="primary" component={DashboardLink} className={classes.button}>
          Dashboard
        </Button>
        <Button variant="contained" color="primary" component={JobsLink} className={classes.button}>
          Jobs
        </Button>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/jobs" component={Jobs} />
          <Route component={Default} />
        </Switch>
      </Fragment>
    );
  }
}

// Component Hard requirements
App.propTypes = {
  classes: PropTypes.object.isRequired
};

// Properties to be passed in by Providers
App.wrappedComponent.propTypes = {
  store: PropTypes.shape({ store: PropTypes.instanceOf(TestState) }).isRequired
};

export default withStyles(styles)(withRouter(App));

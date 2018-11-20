import { List, Typography, withStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RootState from '../../../../store/RootState';
import JobListing from './JobListing';


@withStyles(theme => ({
  paper: {
    width: '100%',
    margin: theme.spacing.unit,
  },
}))
@inject('store')
@observer
class OpenPositions extends Component {
  componentDidMount() {
    const { store } = this.props;
    store.fetchJobs();
  }

  render() {
    const { classes, store } = this.props;

    return (
      <div className={classes.paper}>
        <Typography variant="display1">Open Positions</Typography>
        <Typography variant="subheading">Job openings available to applicants</Typography>
        <List dense>
          {store.session.jobs.map(job => (<JobListing position={job} key={job} />))}
        </List>
      </div>
    );
  }
}

OpenPositions.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired,
};

export default OpenPositions;

import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  Avatar,
  ListItemText
} from '@material-ui/core';
import { Work } from '@material-ui/icons';
import RootState from '../../store/RootState';

@inject('store')
@observer
class Jobs extends Component {
  componentDidMount() {
    const { store } = this.props;
    store.fetchJobs();
  }

  render() {
    const { store } = this.props;
    const jobs = store.jobs.map(job => (
      <ListItem key={job}>
        <Avatar><Work /></Avatar>
        <ListItemText primary={job} secondary={'Location: TBA'}/>
      </ListItem>));
    return (
      <List>
        {jobs}
      </List>
    );
  }
}

Jobs.wrappedComponent.propTypes = {
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default Jobs;

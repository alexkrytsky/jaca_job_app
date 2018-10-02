import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TestState from '../../store/TestState';
import List from '@material-ui/core/es/List/List';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import Avatar from '@material-ui/core/es/Avatar/Avatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import WorkIcon from '@material-ui/icons/Work';

@inject('store')
@observer
class Jobs extends Component {
  render() {
    const { store } = this.props;
    const jobs = store.jobs.map(job =>
      <ListItem key={job}>
        <Avatar><WorkIcon /></Avatar>
        <ListItemText primary={job} secondary={'Location: TBA'}/>
      </ListItem>);
    return (
      <List>
        {jobs}
      </List>
    );
  }
}

Jobs.wrappedComponent.propTypes = {
  store: PropTypes.shape({ store: PropTypes.instanceOf(TestState) }).isRequired
};

export default Jobs;

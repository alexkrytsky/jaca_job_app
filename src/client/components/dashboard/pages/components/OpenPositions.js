import React, { Component } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  withStyles
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { MoreVert, Work } from '@material-ui/icons';
import RootState from '../../../../store/RootState';

const styles = theme => ({
  root: {},
});

@inject('store')
@observer
class OpenPositions extends Component {
  componentDidMount() {
    const { store } = this.props;
    store.fetchJobs();
  }

  render() {
    const { store } = this.props;
    const jobs = store.session.jobs.map(job => (
      <ListItem key={job}>
        <Avatar><Work /></Avatar>
        <ListItemText primary={job} />
      </ListItem>));

    return (
      <Card>
        <CardHeader
          title="Open Positions"
          subheader="Job openings available to applicants"
        />
        <CardContent>
          <List dense>
            {jobs}
          </List>
        </CardContent>
      </Card>
    );
  }
}

OpenPositions.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired,
};

export default withStyles(styles)(OpenPositions);

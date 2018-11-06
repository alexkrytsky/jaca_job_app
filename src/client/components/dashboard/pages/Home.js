import React, { Component } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  withStyles
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Add, Close, MoreVert, Work } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import RecentApplications from './components/RecentApplications';
import OpenPositions from './components/OpenPositions';

const topOffset = 60;

const styles = theme => ({
  layout: {
    width: 'auto',
    paddingTop: `${topOffset}px`,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
});

@inject('store')
@observer
class Home extends Component {
  render() {
    const { store, classes } = this.props;
    const { logout } = store.authentication;

    return (
      <div className={classes.layout}>
        <Grid container spacing={24}>
          <Grid item xs={12} md={6} lg={2}>
            <Card>
              <CardHeader
                title="Quick Actions"
                subheader="Jump to other pages"
              />
              <CardContent>
                <List dense component="nav">
                  <Link to="/app">
                    <ListItem>
                      <Avatar><Add /></Avatar>
                      <ListItemText primary="Create Application" />
                    </ListItem>
                  </Link>
                  <ListItem onClick={logout}>
                    <Avatar><Close /></Avatar>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <RecentApplications />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <OpenPositions />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(Home));

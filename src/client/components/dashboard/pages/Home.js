import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  withStyles
} from '@material-ui/core';
import { Add, Close, Search } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import RootState from '../../../store/RootState';
import OpenPositions from './components/OpenPositions';
import RecentApplications from './components/RecentApplications';

const topOffset = 60;

const styles = theme => ({
  layout: {
    width: 'auto',
    paddingTop: `${topOffset}px`,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  marginTop: {
    marginTop: theme.spacing.unit * 10,
  }
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
          <Hidden smDown>
            <Grid item xs={12} md={3}>
              <Card>
                <CardHeader
                  title="Quick Actions"
                  subheader="Jump to other pages"
                />
                <CardContent>
                  <List dense component="nav">
                    <ListItem button to="/app" component={Link}>
                      <Avatar><Add /></Avatar>
                      <ListItemText primary="Start an Application" />
                    </ListItem>
                    <ListItem button to="/search" component={Link}>
                      <Avatar><Search /></Avatar>
                      <ListItemText primary="Search for Applications" />
                    </ListItem>
                    <ListItem button onClick={logout}>
                      <Avatar><Close /></Avatar>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={9} container spacing={24} className={classes.marginTop}>
            <Grid item xs={12} lg={6}>
              <RecentApplications />
            </Grid>
            <Grid item xs={12} lg={6}>
              <OpenPositions />
            </Grid>
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

import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  withStyles
} from '@material-ui/core';
import {
  Assignment,
  ChevronLeft,
  ChevronRight,
  Close,
  Dashboard,
  Search
} from '@material-ui/icons';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import RootState from '../../store/RootState';

const drawerWidth = 240;

@withStyles(theme => ({
  drawerPaper: {
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}), { withTheme: true })
@withRouter
@inject('store')
@observer
export default class FixedSidebar extends Component {
  static wrappedComponent = {
    propTypes: {
      classes: PropTypes.object.isRequired,
      theme: PropTypes.object.isRequired,
      store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
    }
  };

  render() {
    const { store, classes, theme } = this.props;
    const { open, toggleDrawer } = store;


    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={toggleDrawer}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Tooltip title="Dashboard" placement="right">
            <ListItem button to="/" component={Link}>
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText inset primary="Dashboard" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Search" placement="right">
            <ListItem button to="/search" component={Link}>
              <ListItemIcon><Search /></ListItemIcon>
              <ListItemText inset primary="Search" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Application" placement="right">
            <ListItem button to="/app" component={Link} onClick={store.application.reset}>
              <ListItemIcon><Assignment /></ListItemIcon>
              <ListItemText inset primary="Application" />
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
        <List>
          <Tooltip title="Logout" placement="right">
            <ListItem button onClick={store.authentication.logout}>
              <ListItemIcon><Close /></ListItemIcon>
              <ListItemText inset primary="Logout" />
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>
    );
  }
}

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from '@material-ui/core';
import { ChevronRight, ChevronLeft, Dashboard, Assignment, List as ListIcon } from '@material-ui/icons';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import RootState from '../../store/RootState';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
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
});

const DashboardLink = props => <Link to="/" {...props} />;
const AppLink = props => <Link to="/app" {...props} />;
const Jobs = props => <Link to="/jobs" {...props} />;

@inject('store')
@observer
class FixedSidebar extends Component {
  toggleDrawer = () => {
    const { store } = this.props;
    store.open = !store.open;
  };

  render() {
    const { store, classes, theme } = this.props;
    const { open } = store;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.toggleDrawer}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={DashboardLink}>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText inset primary="Dashboard" />
          </ListItem>
          <ListItem button component={AppLink}>
            <ListItemIcon><Assignment /></ListItemIcon>
            <ListItemText inset primary="Application" />
          </ListItem>
          <ListItem button component={Jobs}>
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText inset primary="Jobs" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

FixedSidebar.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter(FixedSidebar));

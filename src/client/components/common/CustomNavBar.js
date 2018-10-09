import React, { Component } from 'react';
import { AppBar, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Edit, Menu } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import RootState from '../../store/RootState';

const drawerWidth = 240;

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  flex: {
    display: 'flex'
  },
});


@inject('store')
@observer
class CustomNavBar extends Component {
  toggleTheme = () => {
    const { store } = this.props;
    store.paletteType = store.paletteType === 'dark' ? 'light' : 'dark';
  };

  toggleDrawer = () => {
    const { store, useDrawer } = this.props;
    if (useDrawer) {
      store.open = !store.open;
    }
  };

  render() {
    const { store, classes, useDrawer } = this.props;
    const { open } = store;
    return (
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar disableGutters={!open}>
          {useDrawer ? (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <Menu />
            </IconButton>
          ) : (<IconButton />)
          }
          <Typography className={classes.title} variant="title" color="inherit" noWrap>
            Multi-Service Center
          </Typography>
          <div className={classes.grow} />
          <div className={classes.flex}>
            <IconButton color="inherit" onClick={this.toggleTheme}>
              <Edit />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

CustomNavBar.defaultProps = {
  useDrawer: false,
};

CustomNavBar.propTypes = {
  useDrawer: PropTypes.bool,
};

CustomNavBar.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(CustomNavBar));

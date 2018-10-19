import React, { Component, Fragment } from 'react';
import { AppBar, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Edit, Menu } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import RootState from '../../store/RootState';

// Drawer width when extended
const drawerWidth = 240;

// Component Styles
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

// Theme names to display
const themesNames = [
  'LIGHT - MSC General',
  'LIGHT - Education / Employment',
  'LIGHT - Energy',
  'LIGHT - Food Bank',
  'LIGHT - Housing',
  'LIGHT - LTCOP',
  'DARK - MSC General',
  'DARK - Education / Employment',
  'DARK - Energy',
  'DARK - Food Bank',
  'DARK - Housing',
  'DARK - LTCOP',
];

/**
 * Top Navbar component
 */
@inject('store')
@observer
class CustomNavBar extends Component {
  /**
   * Increment the theme counter until it ticks over
   */
  toggleTheme = () => {
    const { store } = this.props;
    store.paletteType = (store.paletteType + 1) % 12;
  };

  /**
   * Open or close the drawer
   */
  toggleDrawer = () => {
    const { store, useDrawer } = this.props;
    if (useDrawer) {
      store.toggleDrawer();
    }
  };

  /**
   * Get the current theme name
   * @param id {Number} Current theme
   * @returns {string} Theme name
   */
  getThemeName = id => themesNames[id];

  render() {
    const { store, classes, useDrawer } = this.props;
    const { open } = store;
    return (
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar disableGutters={!open}>
          {/* Show the menu icon if we are using the sidebar drawer */}
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

          {/* Left Navbar */}
          <Typography variant="title" color="inherit" noWrap>
            Multi-Service Center
          </Typography>

          <div className={classes.grow} />

          {/* Right Navbar */}
          <Typography className={classes.title} variant="title" color="inherit" noWrap>
            {this.getThemeName(store.paletteType)}
          </Typography>
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

// Tell React to use default properties if not provided
CustomNavBar.defaultProps = {
  useDrawer: false,
};

// Tell React what properties to expect
CustomNavBar.propTypes = {
  useDrawer: PropTypes.bool,
};

// Tell React that these properties are provided
CustomNavBar.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(CustomNavBar));

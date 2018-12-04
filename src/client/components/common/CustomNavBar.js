import { AppBar, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import MSC from '../../msc.png';
import RootState from '../../store/RootState';

// Drawer width when extended
const drawerWidth = 240;

/**
 * Top Navbar component
 */
@withStyles(theme => ({
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
    paddingLeft: theme.spacing.unit * 2,
    textDecoration: 'none'
  },
  flex: {
    display: 'flex'
  },
}))
@withRouter
@inject('store')
@observer
export default class CustomNavBar extends Component {
  // Tell React to use default properties if not provided
  static defaultProps = {
    useDrawer: false,
  };

  // Tell React what properties to expect
  static propTypes = {
    useDrawer: PropTypes.bool,
  };

  // Tell React that these properties are provided
  static wrappedComponent = {
    propTypes: {
      classes: PropTypes.object.isRequired,
      store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
    }
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

  render() {
    const { store, classes, useDrawer } = this.props;
    const { open } = store;
    return (
      <AppBar
        position="fixed"
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
          <Link to="/">
            <img src={MSC} alt="MSC" height={64} />
          </Link>
          <Typography
            to="/"
            component={Link}
            className={classes.title}
            variant="display1"
            noWrap
          >
            Multi-Service Center
          </Typography>

          <div className={classes.grow} />

          {/* Right Navbar */}
          <div className={classes.flex} />
        </Toolbar>
      </AppBar>
    );
  }
}

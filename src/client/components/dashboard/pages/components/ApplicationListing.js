import React, { Component, Fragment } from 'react';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  withStyles
} from '@material-ui/core';
import { Menu as MenuIcon, Person } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

@withStyles(theme => ({}))
@inject('store')
@observer
export default class ApplicationListing extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired
  };

  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  searchUser = () => {
    const { app, store } = this.props;
    const { filter } = store;
    filter.clear();
    filter.search.update(app.email);
    this.handleClose();
  };

  render() {
    const { anchorEl } = this.state;
    const { app } = this.props;
    const link = `/application/${app.id}`;
    return (
      <ListItem key={app.id}>
        <Avatar><Person /></Avatar>
        <ListItemText
          primary={`${app.firstName} ${app.lastName} - ${app.email}`}
          secondary={app.position || app.employmentDesired.employmentDesired}
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem
              onClick={this.handleClose}
              component={Link}
              to={link}
            >View Application
            </MenuItem>
            <MenuItem
              onClick={this.searchUser}
              component={Link}
              to="/search"
            >View All Users Applications
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

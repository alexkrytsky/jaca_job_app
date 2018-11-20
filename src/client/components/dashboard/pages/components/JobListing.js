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
import { Menu as MenuIcon, Work } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RootState from '../../../../store/RootState';

@withStyles(theme => ({}))
@inject('store')
@observer
export default class JobListing extends Component {
  static wrappedComponent = {
    propTypes: {
      store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
    }
  };

  static propTypes = {
    position: PropTypes.string.isRequired
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

  searchJob = () => {
    const { position, store } = this.props;
    const { filter } = store;
    filter.clear();
    filter.job.update(position);
    this.handleClose();
  };

  render() {
    const { anchorEl } = this.state;
    const { position, store } = this.props;
    const { filter } = store;
    return (
      <ListItem>
        <Avatar><Work /></Avatar>
        <ListItemText
          primary={position}
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
              onClick={this.searchJob}
              component={Link}
              to="/search"
            >View All Applications
            </MenuItem>
            <MenuItem
              disabled
              onClick={this.handleClose}
            >Remove Position
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

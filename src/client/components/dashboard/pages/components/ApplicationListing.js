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
import { observer } from 'mobx-react';

const styles = theme => ({
  root: {},
});

@observer
class ApplicationListing extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { app } = this.props;
    const link = `/application/${app.key.id}`;
    return (
      <ListItem key={app.key.id}>
        <Avatar><Person /></Avatar>
        <ListItemText
          primary={`${app.firstName} ${app.lastName}`}
          secondary={app.employmentDesired.employmentDesired}
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
              onClick={this.handleClose}
              component={Link}
              to={link}
            >View User
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

ApplicationListing.propTypes = {
  app: PropTypes.object.isRequired
};

export default withStyles(styles)(ApplicationListing);

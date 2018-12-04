import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  withStyles,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import RootState from '../../../../store/RootState';

// Component Styles
const styles = theme => ({
  layout: {
    width: 'auto',
  },
});

@inject('store')
@observer
class Resume extends Component {
  render() {
    const { store, classes } = this.props;
    const { identity } = store.session;

    const documents = identity != null && 'files' in identity ? identity.files : [];

    return (
      <div className={classes.layout}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="display2">Documents</Typography>
          </Grid>

          {/* If statement to check if there are any files. If its is empty show message */}
          {documents.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="display1">No Documents uploaded</Typography>
            </Grid>
          )}

          {/* ---Mapping the files--- */}
          <Grid item xs={12}>
            <List>
              {documents.map(entry => (
                <ListItem
                  key={entry.name}
                  button
                  component={props => (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={entry.url}
                      {...props}
                    >
                      {props.children}
                    </a>
                  )}
                >
                  <ListItemIcon>
                    <CloudDownload />
                  </ListItemIcon>
                  <ListItemText inset primary={entry.name} />
                </ListItem>

              ))}
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// Tell React that these properties are provided
Resume.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(Resume);

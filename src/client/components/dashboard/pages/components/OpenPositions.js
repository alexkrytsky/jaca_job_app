import {
  Avatar,
  Button,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import { Add, Save } from '@material-ui/icons';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RootState from '../../../../store/RootState';
import JobListing from './JobListing';

@withStyles(theme => ({
  paper: {
    width: '100%',
    margin: theme.spacing.unit,
  },
}))
@inject('store')
@observer
class OpenPositions extends Component {
  @observable adding = false;
  @observable newJob = '';

  componentDidMount() {
    const { store } = this.props;
    store.fetchJobs();
  }

  openForm = () => {
    this.adding = true;
  };

  cancelForm = () => {
    this.adding = false;
    this.newJob = '';
  };

  savePosition = () => {
    const { store } = this.props;
    this.adding = false;
    store.addJob(this.newJob).then(() => {
      this.newJob = '';
      store.fetchJobs();
    });
  };

  render() {
    const { classes, store } = this.props;

    return (
      <div className={classes.paper}>
        <Typography variant="display1">Open Positions</Typography>
        <Typography variant="subheading">Job openings available to applicants</Typography>
        <List dense>
          {store.session.jobs.map(job => (<JobListing position={job} key={job} />))}
          <Collapse in={!this.adding}>
            <ListItem button onClick={this.openForm}>
              <Avatar><Add /></Avatar>
              <ListItemText
                primary="Add Position"
              />
            </ListItem>
          </Collapse>
          <Collapse in={this.adding}>
            <ListItem>
              <Avatar><Save /></Avatar>
              <ListItemText
                primary={(
                  <Grid container spacing={8}>
                    <Grid item xs={8}>
                      <TextField
                        fullWidth
                        label="New Position"
                        value={this.newJob}
                        onChange={(event) => {
                          this.newJob = event.target.value;
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        onClick={this.savePosition}
                        variant="raised"
                        color="secondary"
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        onClick={this.cancelForm}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                )}
              />
            </ListItem>
          </Collapse>
        </List>
      </div>
    );
  }
}

OpenPositions.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired,
};

export default OpenPositions;

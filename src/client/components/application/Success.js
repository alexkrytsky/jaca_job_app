import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../store/RootState';


const styles = () => ({
  root: {}
});

@inject('store')
@observer
class Success extends Component {
  reset = () => {
    const { store } = this.props;
    store.application.reset();
  };

  render() {
    const { store, classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="headline">Success</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="raised" onClick={this.reset}>
            Start another application
          </Button>
        </Grid>
      </Grid>
    );
  }
}

Success.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(Success));

import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import {
  Button,
  Collapse,
  FormControlLabel,
  Grid,
  withStyles
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import ValidatedTextField from './components/ValidatedTextField';

import ReferenceTable from './components/ReferenceTable';

// Component Styles
const styles = theme => ({
  padding: {
    padding: theme.spacing.unit * 2
  }
});

/**
 * References Form
 */
@inject('store')
@observer
class References extends Component {
  state = {
    adding: false
  };

  // Open the form
  openForm = () => {
    this.setState({ adding: true });
  };

  // close and clear the form
  closeForm = () => {
    this.setState({ adding: false });
  };

  render() {
    const { adding } = this.state;
    const { store, classes } = this.props;
    const {
      references,
      referenceName,
      contactNumber,
      address,
      relation,
      save,
    } = store.application.references;
    return (
      <Fragment>
        <Collapse in={!adding}>
          <Grid container spacing={24}>
            {references.length > 0 && (
              <Grid item xs={12}>
                <ReferenceTable />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="raised"
                color="secondary"
                onClick={this.openForm}
              ><Add />Add Reference</Button>
            </Grid>
          </Grid>
        </Collapse>
        <Collapse in={adding}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <ValidatedTextField state={referenceName} label="Reference Name" />
            </Grid>
            <Grid item xs={12}>
              <ValidatedTextField state={contactNumber} label="Contact Number" />
            </Grid>
            <Grid item xs={12}>
              <ValidatedTextField state={address} label="Address" />
            </Grid>
            <Grid item xs={12}>
              <ValidatedTextField state={relation} label="Relation" />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => save() && this.closeForm()}>Save</Button>
              <Button onClick={this.closeForm}>Cancel</Button>
            </Grid>
          </Grid>
        </Collapse>
      </Fragment>
    );
  }
}

References.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(References));

import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Button, Collapse, Grid, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import ValidatedTextField from './components/ValidatedTextField';
import SpecialSkillsTable from './components/SpecialSkillsTable';

// Component Styles
const styles = theme => ({
  padding: {
    padding: theme.spacing.unit * 2
  }
});


@inject('store')
@observer
class SpecialSkills extends Component {
  /**
   * Open the form
   */
  openForm = () => {
    const { store } = this.props;
    const { application } = store;
    application.specialSkills.adding = true;
    application.popupOpen = true;
  };

  /**
   * Close and clear the form
   */
  closeForm = () => {
    const { store } = this.props;
    const { application } = store;
    application.specialSkills.adding = false;
    application.popupOpen = false;
    application.specialSkills.clear();
  };

  render() {
    const { store } = this.props;
    const {
      adding,
      certificate,
      name,
      issuedDate,
      expirationDate,
      save,
    } = store.application.specialSkills;

    return (
      <Fragment>
        <Collapse in={!adding}>
          <Grid container spacing={24}>
            {certificate.length > 0 && (
              <Grid item xs={12}>
                <SpecialSkillsTable />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="raised"
                color="secondary"
                onClick={this.openForm}
              ><Add /> Add Certificate
              </Button>
            </Grid>
          </Grid>

        </Collapse>
        <Collapse in={adding}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <ValidatedTextField
                state={name}
                label="name of certificate"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <ValidatedTextField
                state={issuedDate}
                label="issued Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <ValidatedTextField
                state={expirationDate}
                label="expiration Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (save()) {
                    this.closeForm();
                  }
                }}
              >Save
              </Button>
              <Button
                onClick={this.closeForm}
              >Cancel
              </Button>
            </Grid>

          </Grid>
        </Collapse>
      </Fragment>
    );
  }
}

SpecialSkills.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(SpecialSkills));

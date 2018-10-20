import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Button, Typography, Collapse, Grid, TextField, withStyles } from '@material-ui/core';
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
  state = {
    adding: false
  };

  /**
   * Open the form
   */
  openForm = () => {
    this.setState({ adding: true });
  };

  /**
   * Close and clear the form
   */
  closeForm = () => {
    this.setState({ adding: false });
    const { store } = this.props;
    store.application.specialSkills.clear();
  };

  render() {
    const { adding } = this.state;
    const { store } = this.props;
    const {
      certificate,
      name: name,
      issuedDate: issuedDate,
      expirationDate: expirationDate,
      description,
      save,
    } = store.application.specialSkills;

    return (
      <Fragment>
        <Grid item xs={12}>
          <Typography variant="subheading">
            Skills:
          </Typography>
        </Grid>
        <Grid item xs={12}>
           <TextField
            state={description}
            multiline
            rowsMax="4"
            margin="normal"
            helperText="Description"
            id="description"
            name="description"
            label="Description of skills"
          />

         {/* <ValidatedTextField
            state={description}
            multiline
            rowsMax="4"
            margin="normal"
            helperText="Description"
            id="description"
            name="description"
            label="Description of skills"
          />*/}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subheading">
            Certifications
          </Typography>
        </Grid>

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
              >
                <Add /> Add Certificate
              </Button>
            </Grid>
          </Grid>

        </Collapse>
        <Collapse in={adding}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <ValidatedTextField
                state={name}
                id="name"
                name="name"
                label="name of certificate"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <ValidatedTextField
                state={issuedDate}
                id="issuedDate"
                name="issuedDate"
                label="issued Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <ValidatedTextField
                state={expirationDate}
                id="expirationDate"
                name="expirationDate"
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

import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import {
  Grid,
  TextField,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../../store/RootState';
import Tab from '@material-ui/core/Tab/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import MapIcon from '@material-ui/icons/Map';
import CheckIcon from '@material-ui/icons/AlarmOn';
// THIS PAGE IS USED TO DISPLAY ADMIN CONSOLE GENERAL INFORMATION SECTION

// Component Styles
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontWeight: 'bold',
  },
  inputCenter: {
    textAlign: "center"
  },
});

/**
 * GeneralInfo to show saved results
 */
@inject('store')
@observer
class GeneralInfo extends Component {

  render() {
    const { store, classes } = this.props;
    const { identity } = store.session;
    const generalInfo = identity != null && 'generalInfo' in identity ? identity.generalInfo : {};

    return (
        /*form which holds class for the styles*/
      <form className={classes.container} noValidate autoComplete="off">
          {/*Title and Icon*/}
        <Grid item xs={12}>
            <Tab icon={<PhoneIcon />} label="Contact" style={{ marginBottom: 10, marginTop: 10}}/>
        </Grid>
          {/*holds the Primary phone information*/}
        <TextField
          label="Primary Phone"
          className={classes.textField}
          value={generalInfo.homePhone}
          margin="normal"
          variant="filled"
          disabled={true}
        />

          {/*Title and Icon*/}
        <Grid item xs={12}>
            <Tab icon={<MapIcon />} label="Location" style={{ marginBottom: 10, marginTop: 30}}/>
        </Grid>
          {/*holds the address 1 information*/}
        <TextField
          label="Address"
          style={{ margin: 8 }}
          fullWidth
          className={classes.textField}
          value={generalInfo.address1}
          margin="normal"
          variant="filled"
          disabled={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
          {/*holds the address 2 information*/}
          {generalInfo.address2 ?
              <TextField
                  label="Address 2"
                  style={{margin: 8}}
                  fullWidth
                  className={classes.textField}
                  value={generalInfo.address2}
                  margin="normal"
                  variant="filled"
                  disabled={true}
                  InputLabelProps={{
                      shrink: true,
                  }}
              />
              :
              false
          }
          {/*holds the city information*/}
        <TextField
          label="City"
          className={classes.textField}
          value={generalInfo.city}
          margin="normal"
          variant="filled"
          disabled={true}
        />
          {/*holds the state information*/}
        <TextField
          label="State"
          className={classes.textField}
          value={generalInfo.state}
          margin="normal"
          variant="filled"
          disabled={true}
        />
          {/*holds the zip code information*/}
        <TextField
          label="zip Code"
          className={classes.textField}
          value={generalInfo.zipCode}
          margin="normal"
          variant="filled"
          disabled={true}
        />

          {/*Title and Icon*/}
          <Grid item xs={12}>
              <Tab icon={<CheckIcon />} label="Age & Work" style={{ marginBottom: 10, marginTop: 30}}/>
          </Grid>

          {/*checked if person is over 18 years old*/}
          {generalInfo.ageCheck ?
              <TextField
                  label="Is the applicant 18 years or older?"
                  style={{margin: 8}}
                  fullWidth
                  className={classes.textField}
                  value="Yes"
                  margin="normal"
                  variant="filled"
                  disabled={true}
              />
              :
              <TextField
                  label="Is the applicant 18 years or older?"
                  style={{margin: 8}}
                  fullWidth
                  className={classes.textField}
                  value="No"
                  margin="normal"
                  variant="filled"
                  disabled={true}
              />
          }

          {/*checked if person is authorixed to work in the U.S.*/}
          {generalInfo.authorizedCheck ?
              <TextField
                  label="Is the applicant authorized to work in the United States?"
                  style={{margin: 8}}
                  fullWidth
                  className={classes.textField}
                  value="Yes"
                  margin="normal"
                  variant="filled"
                  disabled={true}
              />
              :
              <TextField
                  label="Is the applicant authorized to work in the United States?"
                  style={{margin: 8}}
                  fullWidth
                  className={classes.textField}
                  value="No"
                  margin="normal"
                  variant="filled"
                  disabled={true}
              />
          }


      </form>
    );
  }
}

// Tell React that these properties are provided
GeneralInfo.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(GeneralInfo);

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
    console.log(generalInfo);

    return (
      <form className={classes.container} noValidate autoComplete="off">

        <Grid item xs={12}>
            <Tab icon={<PhoneIcon />} label="Contact" style={{ marginBottom: 10, marginTop: 10}}/>
        </Grid>

        <TextField
          label="Home Phone"
          className={classes.textField}
          value={generalInfo.homePhone}
          margin="normal"
          variant="filled"
          disabled={true}
        />
        <TextField
          label="Cell Phone"
          className={classes.textField}
          value={generalInfo.cellPhone}
          margin="normal"
          variant="filled"
          disabled={true}
        />
        {/*<TextField
          label="Email"
          className={classes.textField}
          value={generalInfo.email}
          margin="normal"
          variant="filled"
          disabled={true}
        />*/}

        <Grid item xs={12}>
            <Tab icon={<MapIcon />} label="Location" style={{ marginBottom: 10, marginTop: 30}}/>
        </Grid>

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
        <TextField
          label="Address 2"
          style={{ margin: 8 }}
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

        <TextField
          label="City"
          className={classes.textField}
          value={generalInfo.city}
          margin="normal"
          variant="filled"
          disabled={true}
        />
        <TextField
          label="State"
          className={classes.textField}
          value={generalInfo.state}
          margin="normal"
          variant="filled"
          disabled={true}
        />
        <TextField
          label="zip Code"
          className={classes.textField}
          value={generalInfo.zipCode}
          margin="normal"
          variant="filled"
          disabled={true}
        />
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

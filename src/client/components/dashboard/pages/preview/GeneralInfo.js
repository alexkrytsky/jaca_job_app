import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import {
  Grid,
  ListItemIcon,
  Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../../store/RootState';
import {
  Phone,
  Map,
  AlarmOn
} from '@material-ui/icons';
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
    textAlign: 'center'
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
        <Grid item xs={12} style={{marginLeft: 80, marginTop: 40}}>
          <ListItemIcon><Phone /></ListItemIcon>
        </Grid>
        <Grid item xs={12} style={{marginLeft: 40, marginBottom: 20}}>
          <Typography style={{ fontSize: 20 }} gutterBottom>
            CONTACT
          </Typography>
        </Grid>

        {/*holds the Primary phone information*/}
        <Grid item xs={12} style={{marginBottom: 20}}>
          <Typography style={{ fontSize: 15 }} gutterBottom>
            <span style={{fontWeight: 'bold'}}>Phone:</span> {generalInfo.homePhone}
          </Typography>
        </Grid>

        {/*Title and Icon*/}
        <Grid item xs={12} style={{marginLeft: 80, marginTop: 20}}>
          <ListItemIcon><Map /></ListItemIcon>
        </Grid>
        <Grid item xs={12} style={{marginLeft: 40, marginBottom: 20}}>
          <Typography style={{ fontSize: 20 }} gutterBottom>
            LOCATION
          </Typography>
        </Grid>

        {/*holds the address 1 information*/}

        <Grid item xs={12} style={{marginBottom: 20}}>
          <Typography style={{ fontSize: 15}} gutterBottom>
            <span style={{fontWeight: 'bold'}}>Address:</span> {generalInfo.address1}
          </Typography>
        </Grid>

        {/*holds the address 2 information*/}

        {generalInfo.address2 ?
          <Grid item xs={12} style={{marginBottom: 20}}>
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Address 2:</span> {generalInfo.address2}
            </Typography>
          </Grid>
          :
          false}


        {/*holds the city information*/}
        <Grid item xs={4}>
          <Typography style={{ fontSize: 15 }} gutterBottom>
            <span style={{fontWeight: 'bold'}}>City:</span> {generalInfo.city}
          </Typography>
        </Grid>
        {/*holds the state information*/}
        <Grid item xs={4}>
          <Typography style={{ fontSize: 15 }} gutterBottom>
            <span style={{fontWeight: 'bold'}}>State:</span> {generalInfo.state}
          </Typography>
        </Grid>
        {/*holds the zip code information*/}
        <Grid item xs={3}>
          <Typography style={{ fontSize: 15 }} gutterBottom>
            <span style={{fontWeight: 'bold'}}>Zip Code:</span> {generalInfo.zipCode}
          </Typography>
        </Grid>

        {/*Title and Icon*/}
        <Grid item xs={12} style={{marginLeft: 80, marginTop: 20}}>
          <ListItemIcon><AlarmOn /></ListItemIcon>
        </Grid>
        <Grid item xs={12} style={{marginLeft: 40, marginBottom: 20}}>
          <Typography style={{ fontSize: 20 }} gutterBottom>
            AGE & WORK
          </Typography>
        </Grid>

        {/*checked if person is over 18 years old*/}
        <Grid item xs={12} style={{marginBottom: 20}}>
          {generalInfo.ageCheck ?
            <Typography style={{ fontSize: 15 }} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Is the applicant 18 years or older?</span> Yes
            </Typography>
            :
            <Typography style={{ fontSize: 15 }} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Is the applicant 18 years or older?</span> No
            </Typography>
          }
        </Grid>

        {/*checked if person is authorixed to work in the U.S.*/}
        <Grid item xs={12} style={{marginBottom: 20}}>
          {generalInfo.authorizedCheck ?
            <Typography style={{ fontSize: 15 }} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Is the applicant authorized to work in the United States?</span> Yes
            </Typography>
            :
            <Typography style={{ fontSize: 15 }} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Is the applicant authorized to work in the United States?</span> No
            </Typography>
          }
        </Grid>
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

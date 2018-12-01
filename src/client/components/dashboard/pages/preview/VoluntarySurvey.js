import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {
  Grid, ListItemIcon,
  TextField, Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../../store/RootState';
import {
  Wc,
  Group,
  AccessibilityNew,
  Star
} from '@material-ui/icons';


// THIS PAGE IS USED TO DISPLAY ADMIN CONSOLE Voluntary Survey SECTION

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
});

/**
 * VoluntarySurvey to show saved results
 */
@inject('store')
@observer
class VoluntarySurvey extends Component {
  state = {
    expanded: null,
  };


  render() {
    const {store, classes} = this.props;
    const {identity} = store.session;
    const voluntarySurvey = identity != null && 'voluntarySurvey' in identity ? identity.voluntarySurvey : [];

    //console.log(voluntarySurvey);

    return (
      /*form which holds class for the styles*/
      <form className={classes.container} noValidate autoComplete="off">
        {/*Title and Icon for gender*/}
        <Grid item xs={12} style={{marginLeft: 80, marginTop: 40}}>
          <ListItemIcon><Wc /></ListItemIcon>
        </Grid>
        <Grid item xs={12} style={{marginLeft: 40, marginBottom: 20}}>
          <Typography style={{ fontSize: 20 }} gutterBottom>
            GENDER
          </Typography>
        </Grid>

        {/*holds the gender information*/}
        {voluntarySurvey.gender ?
          <Typography style={{ fontSize: 15}} gutterBottom>
            <span style={{fontWeight: 'bold'}}>Gender:</span> {voluntarySurvey.gender}
          </Typography>
          :
          <Typography style={{ fontSize: 15}} gutterBottom>
            <span style={{fontWeight: 'bold'}}>NO GENDER WAS CHOSEN:</span>
          </Typography>
        }

        {/*holds the Ethnic Code information*/}
        {/*Title and Icon for Ethnic Code*/}
        <Grid item xs={12} style={{marginLeft: 80, marginTop: 20}}>
          <ListItemIcon><Group /></ListItemIcon>
        </Grid>
        <Grid item xs={12} style={{marginLeft: 40, marginBottom: 20}}>
          <Typography style={{ fontSize: 20 }} gutterBottom>
            ETHNICITY
          </Typography>
        </Grid>

        {/*Show information if person is African American */}
        {voluntarySurvey.afroAmerican ?
          <Grid item xs={2}>
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Black/African-American</span>
            </Typography>
          </Grid>
          :
          false
        }

        {/*Show information if person is Asian */}
        {voluntarySurvey.asian ?
          <Grid item xs={1}>
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Asian</span>
            </Typography>
          </Grid>
          :
          false}

        {/*Show information if person is Pacific Islander */}
        {voluntarySurvey.pacificIslander ?
          <Grid item xs={1}>
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Pacific Islander</span>
            </Typography>
          </Grid>
          :
          false}

        {/*Show information if person is White */}
        {voluntarySurvey.white ?
          <Grid item xs={1}>
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>White</span>
            </Typography>
          </Grid>
          :
          false}

        {/*Show information if person is Hispanic */}
        {voluntarySurvey.hispanic ?
          <Grid item xs={1}>
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Hispanic</span>
            </Typography>
          </Grid>
          :
          false}


        {/*Show information if person is American Native */}
        {voluntarySurvey.americanNative ?
          <Grid item xs={3}>
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>American Native/Indian</span>
            </Typography>
          </Grid>
          :
          false}

        {/*Show information if person is other Ethnicity */}
        {voluntarySurvey.otherEthnicity ?
          <Grid item xs={3}>
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Other</span>
            </Typography>
          </Grid>
          :
          false}


        {/*shows if no ethnicity is chosen on the list*/}
        {voluntarySurvey.otherEthnicity || voluntarySurvey.afroAmerican || voluntarySurvey.asian
        || voluntarySurvey.pacificIslander || voluntarySurvey.white || voluntarySurvey.otherEthnicity
        || voluntarySurvey.hispanic || voluntarySurvey.americanNative ?
          ""
          :
          <Grid item xs={12}>
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>NO ETHNICITY WAS CHOSEN</span>
            </Typography>
          </Grid>
        }

        {/*Title and Icon*/}
        <Grid item xs={12} style={{marginLeft: 80, marginTop: 20}}>
          <ListItemIcon><AccessibilityNew /></ListItemIcon>
        </Grid>
        <Grid item xs={12} style={{marginLeft: 40, marginBottom: 20}}>
          <Typography style={{ fontSize: 20 }} gutterBottom>
            ACCESSIBILITY
          </Typography>
        </Grid>

        {/*Show information if person has a disability */}
        {voluntarySurvey.disability ?
          <Grid item xs={12}>
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Does the individual have a disability?</span> Yes
            </Typography>
          </Grid>
          :
          <Grid item xs={12}>
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Does the individual have a disability?</span> No
            </Typography>
          </Grid>
        }

        {/*Title and Icon*/}
        <Grid item xs={12} style={{marginLeft: 80, marginTop: 20}}>
          <ListItemIcon><Star /></ListItemIcon>
        </Grid>
        <Grid item xs={12} style={{marginLeft: 40, marginBottom: 20}}>
          <Typography style={{ fontSize: 20 }} gutterBottom>
            VETERAN
          </Typography>
        </Grid>

        <Grid item xs={5} style={{marginBottom: 20, marginRight: 20}}>
          {/*Show information if person is a Vietnam Era Veteran */}
          {voluntarySurvey.vietnamVeteran ?
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Is the individual a Vietnam Era Veteran?</span> Yes
            </Typography>
            :
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Is the individual a Vietnam Era Veteran?</span> No
            </Typography>
          }
        </Grid>


        <Grid item xs={5} style={{marginBottom: 20}}>
          {/*Show information if person is a veteran */}
          {voluntarySurvey.activeDutyVeteran ?
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Is the individual a veteran?</span> Yes
            </Typography>
            :
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Is the individual a veteran?</span> No
            </Typography>
          }
        </Grid>

        <Grid item xs={5} style={{marginRight: 20}}>
          {/*Show information if person is a a special disabled American Veteran */}
          {voluntarySurvey.disabledVeteran ?
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Is the individual a special disabled American Veteran?</span> Yes
            </Typography>
            :
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Is the individual a special disabled American Veteran?</span> No
            </Typography>
          }
        </Grid>

        <Grid item xs={5}>
          {/*Show information if person is a newly separated veteran */}
          {voluntarySurvey.newVeteran ?
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Is the individual a newly separated veteran?</span>
               Yes
            </Typography>
            :
            <Typography style={{ fontSize: 15}} gutterBottom>
              <span style={{fontWeight: 'bold'}}>Is the individual a newly separated veteran?</span> No
            </Typography>
          }
        </Grid>
      </form>
    );
  }

}

// Tell React that these properties are provided
VoluntarySurvey.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({store: PropTypes.instanceOf(RootState)}).isRequired
};

export default withStyles(styles)(VoluntarySurvey);

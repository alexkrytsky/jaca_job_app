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
import { School } from '@material-ui/icons';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// THIS PAGE IS USED TO DISPLAY ADMIN CONSOLE EDUCATION SECTION

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
 * Education to show saved results
 */
@inject('store')
@observer
class Education extends Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { store, classes } = this.props;
    const { expanded } = this.state;
    const { identity } = store.session;
    const education = identity != null && 'education' in identity ? identity.education : [];

    return (
      /*form which holds class for the styles*/
      <form className={classes.container} noValidate autoComplete="off">

        {/*Title and Icon*/}
        <Grid item xs={12} style={{
          marginLeft: 80,
          marginTop: 40
        }}>
          <ListItemIcon><School/></ListItemIcon>
        </Grid>
        <Grid item xs={12} style={{
          marginLeft: 40,
          marginBottom: 20
        }}>
          <Typography style={{ fontSize: 20 }} gutterBottom>
            EDUCATION
          </Typography>
        </Grid>

        {/*If statement to check if there is any listing. If its is empty show message*/}
        {education.school.length === 0 ?
          <Grid item xs={12}>
            <Typography style={{ fontSize: 15 }} gutterBottom>
              <span style={{ fontWeight: 'bold' }}>NO SCHOOL INFORMATION WAS ADDED</span>
            </Typography>
          </Grid>
          :
          ''
        }

        {/*map that loops over array and shows each part as entry*/}
        {education.school.map(entry => (
          /*expansion panel to hold the data*/
          <Grid item xs={12} style={{ marginBottom: 20 }} key={entry.id}>

            <ExpansionPanel expanded={expanded === entry.schoolName}
                            onChange={this.handleChange(entry.schoolName)}>

              {/*Main title the admin will see*/}
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                {/*holds the diploma information*/}
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 15 }} gutterBottom>
                    <span style={{ fontWeight: 'bold' }}>Diploma/Degree:</span> {entry.diploma}
                  </Typography>
                </Grid>
              </ExpansionPanelSummary>
              {/*holds the school name information*/}
              <ExpansionPanelDetails>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 15 }} gutterBottom>
                    <span style={{ fontWeight: 'bold' }}>School Name:</span> {entry.schoolName}
                  </Typography>
                </Grid>
              </ExpansionPanelDetails>

              {/*holds the school location information*/}
              <ExpansionPanelDetails>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 15 }} gutterBottom>
                    <span
                      style={{ fontWeight: 'bold' }}>School Location:</span> {entry.schoolLocation}
                  </Typography>
                </Grid>
              </ExpansionPanelDetails>

              {/*holds the education level information*/}
              <ExpansionPanelDetails>
                <Grid item xs={4}>
                  <Typography style={{ fontSize: 15 }} gutterBottom>
                    <span style={{ fontWeight: 'bold' }}>Level:</span> {entry.educationLevel}
                  </Typography>
                </Grid>

                {/*holds the graduated information*/}
                <Grid item xs={4}>
                  <Typography style={{ fontSize: 15 }} gutterBottom>
                    <span style={{ fontWeight: 'bold' }}>Graduated:</span> {entry.graduate}
                  </Typography>
                </Grid>

                {/*holds the years completed information*/}
                <Grid item xs={4}>
                  <Typography style={{ fontSize: 15 }} gutterBottom>
                    <span
                      style={{ fontWeight: 'bold' }}>Years Completed:</span> {entry.yearsCompleted}
                  </Typography>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        ))}
      </form>
    );
  }
}

// Tell React that these properties are provided
Education.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(Education);

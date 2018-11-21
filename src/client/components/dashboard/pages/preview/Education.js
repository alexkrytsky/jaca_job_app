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
import SchoolIcon from '@material-ui/icons/School';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        <Grid item xs={12}>
          <Tab icon={<SchoolIcon />} label="Education" style={{ marginBottom: 10, marginTop: 10}}/>
        </Grid>

        {/*map that loops over array and shows each part as entry*/}
        {education.school.map(entry => (
          /*expansion panel to hold the data*/
        <ExpansionPanel expanded={expanded === entry.schoolName} onChange={this.handleChange(entry.schoolName)} key={entry.id}>
          {/*Main title the person will see*/}
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
           {/*holds the diploma information*/}
            <TextField
              label="Diploma/Degree/Certificate"
              className={classes.textField}
              value={entry.diploma}
              margin="normal"
              variant="filled"
              fullWidth
              disabled={true}
            />
          </ExpansionPanelSummary>
          {/*holds the school name information*/}
          <ExpansionPanelDetails>
            <TextField
              label="School Name"
              className={classes.textField}
              value={entry.schoolName}
              margin="normal"
              variant="filled"
              fullWidth
              disabled={true}
            />
          </ExpansionPanelDetails>
          {/*holds the school location information*/}
          <ExpansionPanelDetails>
            <TextField
              label="School Location"
              className={classes.textField}
              value={entry.schoolLocation}
              margin="normal"
              variant="filled"
              fullWidth
              disabled={true}
            />
          </ExpansionPanelDetails>
          {/*holds the education level information*/}
          <ExpansionPanelDetails>
            <TextField
              label="Education Level"
              className={classes.textField}
              value={entry.educationLevel}
              margin="normal"
              variant="filled"
              disabled={true}
            />
            {/*holds the graduated information*/}
            <TextField
              label="Graduated"
              className={classes.textField}
              value={entry.graduate}
              margin="normal"
              variant="filled"
              disabled={true}
            />
            {/*holds the years completed information*/}
            <TextField
              label="Years Completed"
              className={classes.textField}
              value={entry.yearsCompleted}
              margin="normal"
              variant="filled"
              disabled={true}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
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


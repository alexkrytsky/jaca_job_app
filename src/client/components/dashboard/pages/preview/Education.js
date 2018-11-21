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
      <form className={classes.container} noValidate autoComplete="off">

        <Grid item xs={12}>
          <Tab icon={<SchoolIcon />} label="Education" style={{ marginBottom: 10, marginTop: 10}}/>
        </Grid>

        {/*map up here and goes around the expansion panel*/}

        {/*panel1 should be the school name*/}

        {/*change this to this  ======== onChange={() => this.handleChange('panel1')}*/}
        {education.school.map(entry => (
        <ExpansionPanel expanded={expanded === entry.schoolName} onChange={this.handleChange(entry.schoolName)} key={entry.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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

          <ExpansionPanelDetails>
            <TextField
              label="Education Level"
              className={classes.textField}
              value={entry.educationLevel}
              margin="normal"
              variant="filled"
              disabled={true}
            />

            <TextField
              label="Graduated"
              className={classes.textField}
              value={entry.graduate}
              margin="normal"
              variant="filled"
              disabled={true}
            />

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


import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  Grid, ListItemIcon, Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../../store/RootState';
import { Person, School } from '@material-ui/icons';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// THIS PAGE IS USED TO DISPLAY ADMIN CONSOLE REFERENCE SECTION

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
 * References to show saved results
 */
@inject('store')
@observer
class References extends Component {
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
    const references = identity != null && 'references' in identity ? identity.references : [];

    return (
      /*form which holds class for the styles*/
      <form className={classes.container} noValidate autoComplete="off">

        {/*Title and Icon*/}
        <Grid item xs={12} style={{
          marginLeft: 80,
          marginTop: 40
        }}>
          <ListItemIcon><Person/></ListItemIcon>
        </Grid>
        <Grid item xs={12} style={{
          marginLeft: 40,
          marginBottom: 20
        }}>
          <Typography style={{ fontSize: 20 }} gutterBottom>
            REFERENCES
          </Typography>
        </Grid>

        {/*If statement to check if there is any listing. If its is empty show message*/}
        {references.references.length === 0 ?
          <Grid item xs={12}>
            <Typography style={{ fontSize: 15 }} gutterBottom>
              <span style={{ fontWeight: 'bold' }}>NO REFERENCES WERE ADDED</span>
            </Typography>
          </Grid>
          :
          ''
        }

        {/*map that loops over array and shows each part as entry*/}
        {references.references.map(entry => (
          /*expansion panel to hold the data*/
          <Grid item xs={4} style={{
            marginRight: 10,
            marginBottom: 20
          }} key={entry.id}>

            <ExpansionPanel expanded={expanded === entry.schoolName}
                            onChange={this.handleChange(entry.schoolName)}>
              {/*Main title the admin will see*/}
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                {/*holds the reference name information*/}
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 15 }} gutterBottom>
                    <span style={{ fontWeight: 'bold' }}>Name:</span> {entry.referenceName}
                  </Typography>
                </Grid>
              </ExpansionPanelSummary>

              {/*holds the reference contact name information*/}
              <ExpansionPanelDetails>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 15 }} gutterBottom>
                    <span
                      style={{ fontWeight: 'bold' }}>Contact Number:</span> {entry.contactNumber}
                  </Typography>
                </Grid>
              </ExpansionPanelDetails>

              {/*holds the reference relationship information*/}
              <ExpansionPanelDetails>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 15 }} gutterBottom>
                    <span style={{ fontWeight: 'bold' }}>Relationship:</span> {entry.relation}
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
References.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(References);

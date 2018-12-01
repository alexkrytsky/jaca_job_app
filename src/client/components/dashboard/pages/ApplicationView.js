import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import {
  Divider,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  withStyles,
  withWidth
} from '@material-ui/core';
import PropTypes from 'prop-types';
import RootState from '../../../store/RootState';
import Notes from './components/Notes';
import DataPanel from './DataPanel';
import EmploymentDesired from './preview/EmploymentDesired';
import GeneralInfo from './preview/GeneralInfo';
import Education from './preview/Education';
import References from './preview/References';
import VoluntarySurvey from "./preview/VoluntarySurvey";

const topOffset = 60;

const styles = theme => ({
  layout: {
    width: 'auto',
    paddingTop: `${topOffset}px`,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  paper: {
    padding: '5px 10px'
  },
  main: {
    marginTop: 0,
    [theme.breakpoints.up('md')]: {
      marginTop: '80px',
    }
  }
});

@inject('store')
@observer
class ApplicationView extends Component {
  state = {
    selectedIndex: 0,
  };

  componentWillMount() {
    const { store, match } = this.props;
    store.fetchApps(true)
      .then(() => {
        store.session.identity = store.session.apps.filter(a => (a.id || a.key.id) === match.params.appId)[0];
      });
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { selectedIndex } = this.state;
    const { store, classes } = this.props;
    const { identity } = store.session;

    //const generalInfo = identity != null && 'generalInfo' in identity ? identity.generalInfo : {};
    // const employmentDesired = identity != null && 'employmentDesired' in identity ? identity.employmentDesired : {};
    //const education = identity != null && 'education' in identity ? identity.education : {};
    const specialSkills = identity != null && 'specialSkills' in identity ? identity.specialSkills : {};
    const employmentHistory = identity != null && 'employmentHistory' in identity ? identity.employmentHistory : {};
    //const references = identity != null && 'references' in identity ? identity.references : {};
    //const voluntarySurvey = identity != null && 'voluntarySurvey' in identity ? identity.voluntarySurvey : {};

    const sections = [
      {
        label: 'General Information',
        subLabel: 'Address, phone, etc...',
        component: (<GeneralInfo/>),
      },
      {
        label: 'Employment Desired',
        subLabel: 'Start date, availability, etc...',
        component: (<EmploymentDesired/>),
      },
      {
        label: 'Education',
        subLabel: 'College, High School, Degrees, etc...',
        component: (<Education/>),
      },
      {
        label: 'Special Skills',
        subLabel: 'Skills, Certifications, etc...',
        component: (
          <DataPanel
            title="Special Skills"
            subTitle="Skills, Certifications, etc..."
            data={specialSkills}
          />
        ),
      },
      {
        label: 'Employment History',
        subLabel: 'Previous Employer contact, etc...',
        component: (
          <DataPanel
            title="Employment History"
            subTitle="Previous Employer contact, etc..."
            data={employmentHistory}
          />
        ),
      },
      {
        label: 'References',
        subLabel: 'Co-workers, Bosses, etc...',
        component: (<References/>)
      },
      {
        label: 'Voluntary Survey',
        subLabel: 'Gender, Ethnicity, etc...',
        component: (<VoluntarySurvey/>)
      },
      {
        label: 'Notes',
        subLabel: 'Staff comments, Interview Times, etc...',
        component: (<Notes />)
      },
    ];

    return (
      <div className={classes.layout}>
        <Grid container spacing={24}>
          <Grid item xs={12} md={3}>
            <Paper className={classes.paper}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography
                    variant="title"
                    gutterBottom
                  >Name: {`${identity.firstName} ${identity.lastName}`}
                  </Typography>
                  <Typography
                    noWrap
                    variant="subheading"
                  >Email: {identity.email}
                  </Typography>
                  <Typography
                    noWrap
                    variant="subheading"
                  >Submitted: {new Date(identity.created).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper>
              <Hidden smDown>
                <List component="nav" dense>
                  {sections.map((value, index) => (
                    <ListItem
                      key={index}
                      button
                      selected={selectedIndex === index}
                      onClick={event => this.handleListItemClick(event, index)}
                    >
                      <ListItemText primary={value.label} secondary={value.subLabel} />
                    </ListItem>
                  ))}
                </List>
              </Hidden>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} className={classes.main}>
            {sections[selectedIndex].component}
          </Grid>
        </Grid>
      </div>
    );
  }
}

ApplicationView.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(ApplicationView));


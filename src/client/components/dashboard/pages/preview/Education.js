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

  render() {
    const { store, classes } = this.props;
    const { identity } = store.session;
    const education = identity != null && 'education' in identity ? identity.education : {};

    /* const schoolList = education.school.map(school => {
         return(
             <TextField
                 key={school.id}
                 label="School Location"
                 className={classes.textField}
                 value={school.schoolLocation}
                 margin="normal"
                 variant="filled"
                 fullWidth
                 disabled={true}
             />
         )

        /!*console.log(school.schoolName);
         console.log(school.schoolLocation);
         console.log("diploma" + school.diploma);
         console.log(school.schoolName);*!/
     });*/

    return (
      <form className={classes.container} noValidate autoComplete="off">

        <Grid item xs={12}>
          <Tab icon={<SchoolIcon />} label="Education" style={{ marginBottom: 10, marginTop: 10}}/>
        </Grid>

        {education.school.map(school => (
          <TextField
            key={school.id}
            label="Education Level"
            className={classes.textField}
            value={school.educationLevel}
            margin="normal"
            variant="filled"
            disabled={true}
          />
        ))}

        {education.school.map(school => (
          <TextField
            key={school.id}
            label="Graduated"
            className={classes.textField}
            value={school.graduate}
            margin="normal"
            variant="filled"
            disabled={true}
          />
        ))}

        {education.school.map(school => (
          <TextField
            key={school.id}
            label="Years Completed"
            className={classes.textField}
            value={school.yearsCompleted}
            margin="normal"
            variant="filled"
            disabled={true}
          />
        ))}

        {education.school.map(school => (
          <TextField
            key={school.id}
            label="School Name"
            className={classes.textField}
            value={school.schoolName}
            margin="normal"
            variant="filled"
            fullWidth
            disabled={true}
          />
        ))}

        {education.school.map(school => (
          <TextField
            key={school.id}
            label="School Location"
            className={classes.textField}
            value={school.schoolLocation}
            margin="normal"
            variant="filled"
            fullWidth
            disabled={true}
          />
        ))}

        {education.school.map(school => (
          <TextField
            key={school.id}
            label="Diploma/Degree/Certificate"
            className={classes.textField}
            value={school.diploma}
            margin="normal"
            variant="filled"
            fullWidth
            disabled={true}
          />
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


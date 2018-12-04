import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, ListItemIcon, Typography,
  withStyles,
} from '@material-ui/core';
import File_Copy from '@material-ui/icons/filecopy';
import RootState from '../../../../store/RootState';


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
@inject('store')
@observer
class Resume extends Component {
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
    // Getting Files
    // const resume = identity != null && 'resume' in identity ? identity.files : [];
    const documents = identity.files;
    return (<form className={classes.container} noValidate autoComplete="off">
      {console.dir(documents)};
      {console.dir(identity)};

      {/* Title and Icon */}
      <Grid item xs={12} style={{ marginLeft: 80, marginTop: 40 }}>
        <ListItemIcon><File_Copy /></ListItemIcon>
      </Grid>
      {/* If statement to check if there are any files. If its is empty show message */}
      {documents.files === 0
        ? (
          <Grid item xs={12}>
            <Typography style={{ fontSize: 15 }} gutterBottom>
              <span style={{ fontWeight: 'bold' }}>NO DOCUMENTS UPLOADED</span>
            </Typography>
          </Grid>
        )
        : ''
        }
      {/*
        ---Mapping the files---
        */}
      {/* {resume.files.map(entry, id => ( */}
      {/* <Grid item xs={12}  key={entry.id}> */}

      {/* <iframe src={resume.files[id]}/> */}
      {/* </Grid> */}
      {/* ))} */}


            </form>


    );
  }
}
// Tell React that these properties are provided
Resume.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(Resume);

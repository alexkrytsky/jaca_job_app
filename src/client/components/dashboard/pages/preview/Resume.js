import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  Grid, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography,
  withStyles,
} from '@material-ui/core';
import File_Copy from '@material-ui/icons/filecopy';
import DownLoad from '@material-ui/icons/archive';

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

    const documents = identity != null && 'files' in identity ? identity.files : {};

    return (<form className={classes.container} noValidate autoComplete="off">


      {/* Title and Icon */}
        <Grid item xs={12} style={{
          marginLeft: 80,
          marginTop: 40
        }}>
        <ListItemIcon><File_Copy/></ListItemIcon>
        </Grid>
      <Grid item xs={12} style={{
        marginLeft: 40,
        marginBottom: 20
      }}>
        <Typography style={{ fontSize: 20 }} gutterBottom>
          DOCUMENTS
        </Typography>
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
       {documents.map((entry, id) => (
       <Grid item xs={12}  key={id}>
         <List>

             <ListItem button to="/" component={(props) => <a target="_blank" href={entry.url} {...props} />}>
               <ListItemIcon>
                 <DownLoad/></ListItemIcon>
               <ListItemText inset primary={entry.name} />
             </ListItem>

       </List>

       </Grid>
       ))}


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

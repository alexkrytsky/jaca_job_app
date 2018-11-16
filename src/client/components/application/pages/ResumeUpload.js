import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Avatar, List, ListItem, ListItemText, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import DropZone from 'react-dropzone';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Input,
  Button
} from '@material-ui/core';
import RootState from '../../../store/RootState';
import { Work } from '@material-ui/icons';
const getFiles = field => (e) => {
  e.preventDefault();
  field.file.forEach(function (file) {
    console.log(file.name,'>>',file.size)
  });
  console.log(field.file[0], '>> getFiles', field.files,"   ",field.file);


};


const styles = () => ({
  root: {}
});
@inject('store')
@observer
class ResumeUpload extends Component {

  render() {
    const { store, classes } = this.props;
    const file = store.application.resumeUpload;
    //const files = store.application.resumeUpload.map(file=>({file}));
    return {file};
    // const jobs = store.jobs.map(job => (
    //   <ListItem key={job}>
    //     <Avatar><Work /></Avatar>
    //     <ListItemText primary={job} secondary={'Location: TBA'}/>
    //   </ListItem>));
    // return (
    //   <List>
    //     {jobs}
    //   </List>
    // );
    return (

      <Fragment>
        <Grid container spacing={24}>
          <input
            accept="application/pdf/*"
            className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            state={file}
            onChange={file.onDrop.bind(this)}

          />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span" className={classes.button}>
              Upload
            </Button>
          </label>
          <div >{(file.name)}</div>
          {/*<DropZone onDrop={file.onDrop.bind(this)} >*/}
            {/*<div>Try dropping some files here, or click to select files to upload.</div>*/}
          {/*</DropZone>*/}
          {/*<aside>*/}
            {/*<h2>Dropped files</h2>*/}
            {/*<button*/}
              {/*onClick={getFiles(file)}*/}
            {/*>*/}
            {/*</button>*/}

          {/*</aside>*/}
        </Grid>
      </Fragment>
    );
  }
}
ResumeUpload.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};
export default withStyles(styles)(withRouter(ResumeUpload));

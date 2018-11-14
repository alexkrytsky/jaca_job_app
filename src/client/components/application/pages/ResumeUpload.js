import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import DropZone from 'react-dropzone';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel
} from '@material-ui/core';
import RootState from '../../../store/RootState';
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

    return (

      <Fragment>
        <Grid container spacing={24}>
          <label>Hello</label>
          <input type="file" state={file}/>
          <DropZone onDrop={file.onDrop.bind(this)} >
            <div>Try dropping some files here, or click to select files to upload.</div>
          </DropZone>
          <aside>
            <h2>Dropped files</h2>
            <button
              onClick={getFiles(file)}
            >
            </button>
            <label >
              {(file.file[0])? file.file.getState():"aasdadads"}
            </label>
              {/*{(this.field.file && field.file[0].length) ? <div>*/}
                  {/*<h2>Uploading {field.file[0].length} files...</h2>*/}
                  {/*<div>{field.file[0].map(file =>*/}
                    {/*<button*/}
                      {/*key={file.name}*/}
                    {/*>*/}
                      {/*<img*/}
                        {/*className="w-10 h-10"*/}
                        {/*src={file.preview}*/}
                        {/*alt={file.name}*/}
                      {/*/>*/}
                    {/*</button>)};*/}
                  {/*</div>*/}
                {/*</div>:null};*/}
          </aside>
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

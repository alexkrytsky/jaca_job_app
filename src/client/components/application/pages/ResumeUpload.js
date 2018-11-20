import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import {
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemText, Table, TableBody, TableCell,
  TableHead, TableRow,
  withStyles
} from '@material-ui/core';
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
import SpecialSkillsTable from './components/SpecialSkillsTable';
import { Delete } from '@material-ui/icons';

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
    const files = store.application.resumeUpload;

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
            state={files}
           onChange={files.onDrop.bind(this)}
          />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span" className={classes.button}>
              Upload
            </Button>
          </label>
          {files.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <DarkTableCell>File Name</DarkTableCell>
                <DarkTableCell>File Type</DarkTableCell>

                <DarkTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map(entry => (
                <TableRow className={classes.row} key={entry.id}>
                  <TableCell component="th" scope="row">
                    {entry.name}
                  </TableCell>
                  <TableCell>{entry.size}</TableCell>
                  <TableCell>{entry.expirationDate}</TableCell>


                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
          </Grid>


      </Fragment>
    )
  }
}
ResumeUpload.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};
export default withStyles(styles)(withRouter(ResumeUpload));

import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import {

 Table, TableBody, TableCell,
 TableRow, Typography,
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
import ValidatedTextField from './components/ValidatedTextField';
import ReactiveTextField from './components/ReactiveTextField';

const getFiles = field => (e) => {
  e.preventDefault();
  field.file.forEach(function (file) {
    console.log(file.name, '>>', file.size);
  });
  console.log(field.file[0], '>> getFiles', field.files, '   ', field.file);


};


const styles = () => ({
  root: {}
});

@inject('store')
@observer
class ResumeUpload extends Component {

  render() {
    const { store, classes } = this.props;
    const { files, fileIssues, save,remove } = store.application.resumeUpload;

    return (

      <Fragment>
        <Grid container spacing={24}>
          <input

            className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"

            onChange={(event) => {
              // this.file.bind;
              //console.dir(event.target);s
              if(!save(event.target.files)){
                return "Hello please fix the errors"
              }
            }}
          />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span" className={classes.button}>
              Upload
            </Button>

          </label>
          {fileIssues !=="" &&

              <Typography

                color="error"
              >{fileIssues}
              </Typography>



          }
          {files.length > 0 && (
            files.map((entry, id) => {

                return (

                  <Table key={id}>
                    <TableBody>
                      <TableRow className={classes.row}>
                        <TableCell component="th" scope="row">
                          {entry.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <button variant="raised" color="error" component="span" className={classes.button} onClick={(event) => {

                            remove(id);
                          }}>X
                            </button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>);
              }
            )
          )
          }





          {/*<Table>*/}
          {/*<TableHead>*/}
          {/*<TableRow>*/}
          {/*<DarkTableCell>File Name</DarkTableCell>*/}
          {/*<DarkTableCell>File Type</DarkTableCell>*/}

          {/*<DarkTableCell />*/}
          {/*</TableRow>*/}
          {/*</TableHead>*/}
          {/*<TableBody>*/}


          {/*</TableRow>*/}
          {/*))}*/}
          {/*</TableBody>*/}
          {/*</Table>*/}
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

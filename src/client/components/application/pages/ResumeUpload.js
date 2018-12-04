import {
  Button,
  FormLabel,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  withStyles
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import RootState from '../../../store/RootState';

const styles = () => ({
  root: {}
});

@inject('store')
@observer
class ResumeUpload extends Component {

  render() {
    const { store, classes } = this.props;
    const { files, fileIssues, save, remove } = store.application.resumeUpload;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <input
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={event => (save(event.target.files) ? '' : 'Hello please fix the errors')}
          />
          <FormLabel htmlFor="raised-button-file">
            <Button variant="raised" color="secondary" component="span">
              Upload
            </Button>
          </FormLabel>

          {fileIssues !== '' && <Typography color="error">{fileIssues}</Typography>}

          {files.length > 0 && (
            <Table>
              <TableBody>
                {files.map((entry, id) => (
                  <TableRow className={classes.row} key={id}>
                    <TableCell component="th" scope="row">
                      {entry.name}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="raised"
                        color="secondary"
                        component="span"
                        className={classes.button}
                        onClick={() => remove(id)}
                      >X
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Grid>
      </Grid>
    );
  }
}

ResumeUpload.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};
export default withStyles(styles)(withRouter(ResumeUpload));

import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  withStyles
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import PropTypes from 'prop-types';
import RootState from '../../../../store/RootState';

// Component Styles
const styles = theme => ({
  paper: {
    margin: theme.spacing.unit * 2
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    }
  }
});

/**
 * Table for Employment History to show saved results
 */
@inject('store')
@observer
class EmploymentHistoryTable extends Component {
  render() {
    // Style the Table header
    const DarkTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
      }
    }))(TableCell);

    const { store, classes } = this.props;
    const { history, removeHistory } = store.application.employmentHistory;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <DarkTableCell>Employer</DarkTableCell>
              <DarkTableCell>Position</DarkTableCell>
              <DarkTableCell>Contact Authorized</DarkTableCell>
              <DarkTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map(entry => (
              <TableRow className={classes.row} key={entry.id}>
                <TableCell component="th" scope="row">
                  {entry.employer}
                </TableCell>
                <TableCell>{entry.position}</TableCell>
                <TableCell>{entry.contactPermission ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button
                    mini
                    color="secondary"
                    aria-label="Delete"
                    onClick={() => removeHistory(entry.id)}
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

// Tell React that these properties are provided
EmploymentHistoryTable.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(EmploymentHistoryTable);

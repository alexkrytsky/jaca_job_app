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
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    }
  },
});

/**
 * Table for school to show saved results
 */
@inject('store')
@observer
class EducationTable extends Component {
  render() {
    // Style the Table header
    const DarkTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
      }
    }))(TableCell);

    const { store, classes } = this.props;
    const { school, removeSchool } = store.application.education;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <DarkTableCell>Education Level</DarkTableCell>
              <DarkTableCell>School Name</DarkTableCell>
              <DarkTableCell>School Location</DarkTableCell>
              <DarkTableCell numeric>Years Completed</DarkTableCell>
              <DarkTableCell>Graduated</DarkTableCell>
              <DarkTableCell>Diploma/Degree</DarkTableCell>
              <DarkTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {school.map(entry => (
              <TableRow className={classes.row} key={entry.id}>
                <TableCell component="th" scope="row">
                  {entry.educationLevel}
                </TableCell>
                <TableCell>{entry.schoolName}</TableCell>
                <TableCell>{entry.schoolLocation}</TableCell>
                <TableCell>{entry.yearsCompleted}</TableCell>
                <TableCell>{entry.graduate}</TableCell>
                <TableCell>{entry.diploma}</TableCell>
                <TableCell>
                  <Button
                    mini
                    color="secondary"
                    aria-label="Delete"
                    onClick={() => removeSchool(entry.id)}
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
EducationTable.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(EducationTable);





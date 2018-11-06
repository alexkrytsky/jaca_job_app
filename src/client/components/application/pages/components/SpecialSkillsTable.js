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
 * Table for Ecertificate to show saved results
 */
@inject('store')
@observer
class SpecialSkillsTable extends Component {
  render() {
    // Style the Table header
    const DarkTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
      }
    }))(TableCell);

    const { store, classes } = this.props;
    const { certificate, removeCertificate } = store.application.specialSkills;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <DarkTableCell>Name</DarkTableCell>
              <DarkTableCell>Issued Date</DarkTableCell>
              <DarkTableCell>Expiration Date</DarkTableCell>
              <DarkTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {certificate.map(entry => (
              <TableRow className={classes.row} key={entry.id}>
                <TableCell component="th" scope="row">
                  {entry.name}
                </TableCell>
                <TableCell>{entry.issuedDate}</TableCell>
                <TableCell>{entry.expirationDate}</TableCell>
                <TableCell>
                  <Button
                    mini
                    color="secondary"
                    aria-label="Delete"
                    onClick={() => removeCertificate(entry.id)}
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
SpecialSkillsTable.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(SpecialSkillsTable);

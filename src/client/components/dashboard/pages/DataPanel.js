import React, { Component, Fragment } from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const styles = theme => ({
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  padding: {
    paddingRight: theme.spacing.unit * 3,
  },
  expansionPanelDetails: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  table: {
    overflowX: 'auto'
  },
  paper: {
    width: '100%',
    ...theme.mixins.gutters(),
  }
});

@observer
class DataPanel extends Component {
  static wrappedComponent = {
    propTypes: {
      classes: PropTypes.object.isRequired
    }
  };

  static propTypes = {
    data: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
  };

  render() {
    const {
      classes,
      data,
      title,
      subTitle
    } = this.props;

    const basic = [];
    const arr = [];

    Object.keys(data)
      .forEach((key) => {
        if (data[key] instanceof Array) {
          arr.push(data[key]);
        } else {
          basic.push(
            <TableRow key={key} className={classes.row}>
              <TableCell>{key}:</TableCell>
              <TableCell>{data[key].toString()}</TableCell>
            </TableRow>
          );
        }
      });

    const objMap = arr.map((value, i) => {
      if (value.length > 0) {
        const keys = Object.keys(value[0])
          .filter(value1 => value1 !== 'id');

        return (
          <Fragment key={i}>
            <br />
            <Paper className={classes.table}>
              <Table>
                <TableHead>
                  <TableRow>
                    {keys.map((value1, j) => <TableCell key={j}>{value1}</TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {value.map((values, j) => (
                    <TableRow key={j} className={classes.row}>
                      {keys.map((key, k) => <TableCell
                        key={k}>{values[key].toString()}</TableCell>)}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Fragment>
        );
      }
      return (
        <Fragment key={i} />
      );
    });

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="title">{title}</Typography>
          <Typography variant="subheading">{subTitle}</Typography>
        </Grid>
        <Grid item xs={12}>
          {basic.length > 0 && (
            <Paper>
              <Table>
                <TableBody>
                  {basic}
                </TableBody>
              </Table>
            </Paper>
          )}
          {objMap}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DataPanel);

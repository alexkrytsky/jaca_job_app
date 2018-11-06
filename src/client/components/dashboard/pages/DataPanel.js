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
  layout: {
    width: 'auto',
    height: '100%',
    overflow: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
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
          <Grid key={i} container spacing={24}>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    {keys.map((value1, j) => <TableCell key={j}>{value1}</TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {value.map((values, j) => (
                    <TableRow key={j} className={classes.row}>
                      {keys.map((key, k) => (
                        <TableCell key={k}>{values[key].toString()}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        );
      }
      return (
        <Fragment key={i} />
      );
    });

    return (
      <div className={classes.layout}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="title">{title}</Typography>
            <Typography variant="subheading">{subTitle}</Typography>
          </Grid>
          <Grid item xs={12} container spacing={24}>
            {basic.length > 0 ? (
              <Grid item xs={12}>
                <Table>
                  <TableBody>
                    {basic}
                  </TableBody>
                </Table>
              </Grid>
            ) : (<Fragment />)}
          </Grid>
          <Grid item xs={12}>
            {objMap}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(DataPanel);

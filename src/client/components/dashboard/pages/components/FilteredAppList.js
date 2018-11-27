import {
  Checkbox,
  Grid,
  Hidden,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  withStyles,
  withWidth,
} from '@material-ui/core';
import { Delete, OpenInNew } from '@material-ui/icons';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import ReactiveTextField from '../../../application/pages/components/ReactiveTextField';

/**
 * Comparator function
 * @param a {object} Object one
 * @param b {object} Object two
 * @param orderBy {string} parameter to sort by
 * @returns {number} sorting order
 */
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Sort an array
 * @param array {array} array to sort
 * @param cmp
 * @returns {*}
 */
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

/**
 * get sorting function
 * @param order {string} order to sort by
 * @param orderBy {string} parameter to sort by
 * @returns {function(*=, *=): number}
 */
function getStorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    hide: false,
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
    hide: false,
  },
  {
    id: 'job',
    numeric: false,
    disablePadding: true,
    label: 'Position',
    hide: true,
  },
  {
    id: 'created',
    numeric: false,
    disablePadding: true,
    label: 'Applied On',
    hide: true,
  },
];

@withStyles(theme => ({}))
@withWidth()
@observer
class SortableTableHead extends Component {
  static wrappedComponent = {
    propTypes: {
      width: PropTypes.string.isRequired,
    }
  };

  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      numSelected,
      onRequestSort,
      onSelectAllClick,
      order,
      orderBy,
      rowCount,
      width
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => (
            <Hidden key={row.id} mdDown={row.hide}>
              <TableCell
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            </Hidden>
          ), this)}
          <TableCell />
        </TableRow>
      </TableHead>
    );
  }
}

@withStyles(theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.light,
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  floatRight: {
    float: 'right',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  }
}))
@inject('store')
@observer
class SortableTableToolbar extends Component {
  static wrappedComponent = {
    propTypes: {
      classes: PropTypes.object.isRequired,
    }
  };

  static propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  render() {
    const { store, numSelected, classes } = this.props;
    const { filter } = store;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <Grid container spacing={8} justify="space-between">
          <Grid item xs>
            <div className={classes.title}>
              {numSelected > 0 ? (
                <Typography color="inherit" variant="title">{numSelected} selected</Typography>
              ) : (
                <Typography variant="display1" id="tableTitle">Applications</Typography>
              )}
            </div>
          </Grid>
          <Grid item xs>
            <div className={classNames(classes.actions, numSelected > 0 && classes.floatRight)}>
              {numSelected > 0 ? (
                <Tooltip title="Delete">
                  <IconButton aria-label="Delete">
                    <Delete />
                  </IconButton>
                </Tooltip>
              ) : (
                <ReactiveTextField label="Search" state={filter.search} />
              )}
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    );
  }
}

@withStyles(theme => ({
  root: {
    width: 'auto',
  },
  table: {
    // minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  }
}))
@withRouter
@observer
export default class FilteredAppList extends Component {
  static wrappedComponent = {
    propTypes: {
      classes: PropTypes.object.isRequired,
    }
  };

  static propTypes = {
    apps: PropTypes.object.isRequired
  };

  // Default State
  state = {
    order: 'desc',
    orderBy: 'created',
    selected: [],
    page: 0,
    rowsPerPage: 10
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({
      order,
      orderBy
    });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.apps.list.map(app => app.key.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { apps, classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, apps.list.length - page * rowsPerPage);

    return (
      <div className={classes.root}>
        <SortableTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <SortableTableHead
              numSelected={selected.length}
              onRequestSort={this.handleRequestSort}
              onSelectAllClick={this.handleSelectAllClick}
              order={order}
              orderBy={orderBy}
              rowCount={apps.list.length}
            />
            <TableBody>
              {
                stableSort(apps.list, getStorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(app => {
                    const isSelected = this.isSelected(app.key.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, app.key.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={app.key.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell component="th"
                                   scope="row">{app.firstName} {app.lastName}</TableCell>
                        <TableCell padding="none">{app.email}</TableCell>
                        <Hidden mdDown>
                          <TableCell
                            padding="none">{app.employmentDesired.employmentDesired}</TableCell>
                          <TableCell
                            padding="none">{new Date(app.created).toLocaleString()}</TableCell>
                        </Hidden>
                        <TableCell>
                          <Tooltip title="View Application">
                            <IconButton component={Link} to={`/application/${app.key.id}`}
                                        aria-label="View Application">
                              <OpenInNew fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={apps.list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

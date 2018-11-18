import {
  Button,
  Paper,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  IconButton,
  InputLabel,
  Select,
  Switch,
  Tooltip,
  Typography,
  withStyles,
  withWidth
} from '@material-ui/core';
import { FilterList, Undo } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import StatesList from '../../../constants/states';
import RootState from '../../../store/RootState';
import FilteredAppList from './components/FilteredAppList';

const topOffset = 60;

@withStyles(theme => ({
  layout: {
    width: 'auto',
    paddingTop: `${topOffset}px`,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  marginTop: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 10,
    }
  },
  paper: {
    padding: theme.spacing.unit,
  },
}))
@withWidth()
@withRouter
@inject('store')
@observer
export default class Search extends Component {
  static wrappedComponent = {
    propTypes: {
      classes: PropTypes.object.isRequired,
      width: PropTypes.string.isRequired,
      store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
    }
  };

  state = {
    open: true,
  };

  componentWillMount() {
    const { store } = this.props;
    store.fetchJobs();
    store.fetchApps();
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { store, classes, width } = this.props;
    const { filter } = store;
    const { jobs } = store.session;

    return (
      <div className={classes.layout}>
        <Grid
          container
          spacing={24}
        >
          <Grid item xs={12} md={3} lg={2}>
            <Paper className={classes.paper}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <Typography variant="title">Application Search</Typography>
                  <Typography>Showing {filter.filteredApps.count} of {filter.filteredApps.total}.</Typography>
                </div>
                <Hidden mdUp>
                  <Tooltip title={'Filters'}>
                    <IconButton onClick={this.handleToggle}>
                      <FilterList fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Hidden>
              </div>

              <Collapse in={width === 'md' || width === 'lg' || width === 'xl' || this.state.open}>
                <Grid container spacing={8} justify="space-between">
                  <Grid item xs={6} md={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="state">Position</InputLabel>
                      <Select
                        native
                        value={filter.job.value}
                        onChange={event => filter.job.update(event.target.value)}
                      >
                        <option value="" />
                        {jobs.map(s => (
                          <option style={{ color: '#000' }} key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="state">State</InputLabel>
                      <Select
                        native
                        value={filter.state.value}
                        onChange={event => filter.state.update(event.target.value)}
                      >
                        <option value="" />
                        {StatesList.map(s => (
                          <option style={{ color: '#000' }} key={s.name} value={s.name}>

                            {s.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} md={12}>
                    <FormControlLabel
                      control={(
                        <Switch
                          checked={filter.ageCheck.value}
                          onChange={event => filter.ageCheck.update(event.target.checked)}
                        />
                      )}
                      label="18 or older"
                    />
                  </Grid>
                  <Grid item xs={6} md={12}>
                    <FormControlLabel
                      control={(
                        <Switch
                          checked={filter.authCheck.value}
                          onChange={event => filter.authCheck.update(event.target.checked)}
                        />
                      )}
                      label={<Typography>Authorized to work in US</Typography>}
                    />
                  </Grid>
                  <Grid item xs={2} md={12}>
                    <Tooltip title="Clear Search Filters">
                      <Button variant="raised" color="secondary" onClick={filter.clear}>
                        <Hidden mdUp>
                          <Undo />
                        </Hidden>
                        <Hidden smDown>
                          Clear Filters
                        </Hidden>
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Collapse>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} lg={10} className={classes.marginTop}>
            <FilteredAppList apps={filter.filteredApps} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

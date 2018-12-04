import {
  Button,
  Chip,
  Collapse,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Typography,
  withStyles
} from '@material-ui/core';
import { CheckCircle, Face, NotInterested, Phone, RemoveRedEye, Send } from '@material-ui/icons';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup';
import classnames from 'classnames';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RootState from '../../../../store/RootState';
import ReactiveTextField from '../../../application/pages/components/ReactiveTextField';

const iconMap = [
  {
    label: 'Reviewed',
    icon: <RemoveRedEye />,
    color: 'default'
  },
  {
    label: 'Phone Screened',
    icon: <Phone />,
    color: 'secondary'
  },
  {
    label: 'Interviewed',
    icon: <Face />,
    color: 'secondary'
  },
  {
    label: 'Offer Made',
    icon: <Send />,
    color: 'primary'
  },
  {
    label: 'Hired',
    icon: <CheckCircle />,
    color: 'primary'
  },
  {
    label: 'Rejected',
    icon: <NotInterested />,
    color: 'primary'
  },
];

@withStyles(theme => ({
  layout: {
    width: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  toggleContainer: {
    height: 56,
    // padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
  hide: {
    width: 0,
  },
  chip: {
    marginLeft: theme.spacing.unit,
    float: 'right',
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main)
  },
  default: {}
}))
@inject('store')
@observer
class Notes extends Component {
  static wrappedComponent = {
    propTypes: {
      classes: PropTypes.object.isRequired,
      store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
    }
  };

  toggleOpen = () => {
    const {
      store
    } = this.props;

    store.addingNote = !store.addingNote;
  };

  handleLabels = (event, labels) => {
    const {
      store
    } = this.props;

    store.noteLabels = labels !== null ? labels : [];
  };

  render() {
    const {
      classes,
      store
    } = this.props;

    const { addingNote, noteMessage, noteName, noteLabels, saveNote } = store;
    const { notes } = store.session.identity;

    return (
      <div className={classes.layout}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="display2">Notes</Typography>
          </Grid>
          <Grid item xs={12}>
            <Collapse in={!addingNote}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Button color="secondary" variant="raised" onClick={this.toggleOpen}>
                    Add Note
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {notes && notes.slice()
                    .sort((first, second) => second.added - first.added)
                    .map((note) => {
                      const date = new Date(note.added);
                      return (
                        <ExpansionPanel key={note.added}>
                          <ExpansionPanelSummary>
                            <Grid container spacing={8} justify="space-between">
                              <Grid item xs>
                                <Typography
                                  variant="subheading">{note.noteName} at {date.toLocaleString()}</Typography>
                              </Grid>
                              <Grid item xs>
                                {note.noteLabels && note.noteLabels.map(label => (
                                  <Chip
                                    key={label}
                                    icon={iconMap.filter(value => value.label === label)[0].icon}
                                    color={iconMap.filter(value => value.label === label)[0].color}
                                    className={classes.chip}
                                    label={label}
                                  />
                                ))}
                              </Grid>
                            </Grid>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Typography variant="body2">{note.noteMessage}</Typography>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      );
                    })}
                </Grid>
              </Grid>
            </Collapse>
            <Collapse in={addingNote}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant="subheading">Labels:</Typography>
                  <div className={classes.toggleContainer}>
                    <ToggleButtonGroup value={noteLabels} onChange={this.handleLabels}>
                      {iconMap.map(value => (
                        <ToggleButton
                          key={value.label}
                          value={value.label}
                          className={classes[value.color]}
                        >
                          {value.icon}
                          <Collapse
                            className={classnames(!noteLabels.includes(value.label) && classes.hide)}
                            in={noteLabels.includes(value.label)}
                          >
                            <Typography>{value.label}</Typography>
                          </Collapse>
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <ReactiveTextField
                    label="Staff Name"
                    state={noteName}
                  />
                  <ReactiveTextField
                    label="Message"
                    state={noteMessage}
                    multiline
                    rows={4}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button color="primary" onClick={this.toggleOpen}>
                    Cancel
                  </Button>
                  <Button color="secondary" variant="raised" onClick={saveNote}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Notes;

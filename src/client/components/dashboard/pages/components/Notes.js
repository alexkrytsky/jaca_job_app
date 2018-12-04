import {
  Button,
  Collapse,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Chip,
  Typography,
  withStyles, ListItemIcon
} from '@material-ui/core';
import {
  FormatBold,
  FormatItalic,
  CheckCircle,
  FormatUnderlined, NotInterested, Phone, RemoveRedEye, Send, Face
} from '@material-ui/icons';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RootState from '../../../../store/RootState';
import ReactiveTextField from '../../../application/pages/components/ReactiveTextField';
import Note from '@material-ui/icons/note';


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
    margin: theme.spacing.unit,
    float: 'right',
  },
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
        <Grid item xs={12} style={{
          marginLeft: 80,
          marginTop: 40
        }}>
          <ListItemIcon><Note/></ListItemIcon>
        </Grid>
        <Grid item xs={12} style={{
          marginLeft: 60,
          marginBottom: 20
        }}>
          <Typography style={{ fontSize: 20 }} gutterBottom>
               NOTES
          </Typography>



        </Grid>
        <Grid container spacing={24}>

          <Grid item xs={12}>

            <Typography variant="subheading">Staff comments, Interview Times, etc...</Typography>
          </Grid>
          <Grid item xs={12}>
            <Collapse in={!addingNote}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Button color="primary" variant="raised" onClick={this.toggleOpen}>
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
                                <Typography>{note.noteName} at {date.toLocaleString()}</Typography>
                              </Grid>
                              <Grid item xs>
                                {note.noteLabels && note.noteLabels.map(label =>
                                  <Chip key={label} className={classes.chip} label={label} />
                                )}
                              </Grid>
                            </Grid>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {note.noteMessage}
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
                      <ToggleButton value="Reviewed">
                        <RemoveRedEye />
                        <Collapse
                          className={classnames(!noteLabels.includes('Reviewed') && classes.hide)}
                          in={noteLabels.includes('Reviewed')}
                        >
                          <Typography>Reviewed</Typography>
                        </Collapse>
                      </ToggleButton>
                      <ToggleButton value="Phone Screened">
                        <Phone />
                        <Collapse
                          className={classnames(!noteLabels.includes('Phone Screened') && classes.hide)}
                          in={noteLabels.includes('Phone Screened')}
                        >
                          <Typography>Phone Screened</Typography>
                        </Collapse>
                      </ToggleButton>
                      <ToggleButton value="Interviewed">
                        <Face />
                        <Collapse
                          className={classnames(!noteLabels.includes('Interviewed') && classes.hide)}
                          in={noteLabels.includes('Interviewed')}
                        >
                          <Typography>Interviewed</Typography>
                        </Collapse>
                      </ToggleButton>
                      <ToggleButton value="Offer Made">
                        <Send />
                        <Collapse
                          className={classnames(!noteLabels.includes('Offer Made') && classes.hide)}
                          in={noteLabels.includes('Offer Made')}
                        >
                          <Typography>Offer Made</Typography>
                        </Collapse>
                      </ToggleButton>
                      <ToggleButton value="Rejected">
                        <NotInterested />
                        <Collapse
                          className={classnames(!noteLabels.includes('Rejected') && classes.hide)}
                          in={noteLabels.includes('Rejected')}
                        >
                          <Typography>Rejected</Typography>
                        </Collapse>
                      </ToggleButton>
                      <ToggleButton value="Hired">
                        <CheckCircle />
                        <Collapse
                          className={classnames(!noteLabels.includes('Hired') && classes.hide)}
                          in={noteLabels.includes('Hired')}
                        >
                          <Typography>Hired</Typography>
                        </Collapse>
                      </ToggleButton>
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

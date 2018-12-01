import { action, observable } from 'mobx';
import axios from 'axios';
import ApplicationState from './application/ApplicationState';
import Field from './application/Field';
import AuthenticationState from './auth/AuthenticationState';
import LocalState from './LocalState';
import FilterState from './search/FilterState';
import SessionState from './SessionState';

/**
 * Default state of the site
 */
export default class RootState {
  // Whether the sidebar is open or not
  @observable open = false;

  // Application State
  @observable application = new ApplicationState(this);

  // Authentication State
  @observable authentication = new AuthenticationState(this);

  // Filter State
  @observable filter = new FilterState(this);

  // Persistent State
  @observable local = new LocalState(this);

  @observable session = new SessionState(this);

  // Various Forms
  @observable addingNote = false;

  @observable noteMessage = new Field('');

  @observable noteName = new Field('');

  @observable noteLabels = [];

  @action saveNote = () => {
    axios.post('/api/app/note', {
      id: this.session.identity.id,
      noteName: this.noteName.value,
      noteMessage: this.noteMessage.value,
      noteLabels: this.noteLabels
    })
      .then(() => {
        this.noteMessage.update('');
        this.noteName.update('');
        this.noteLabels = [];
        this.addingNote = false;
        this.fetchApps(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  @action toggleDrawer = () => {
    this.open = !this.open;
  };

  @action closeDrawer = () => {
    this.open = false;
  };

  /**
   * Fetch jobs from the backend
   */
  @action fetchJobs = () => {
    return new Promise((resolve => {
      fetch('/api/jobs')
        .then(res => res.json())
        .then((res) => {
          this.session.jobs.replace(res.jobs);
          resolve();
        });
    }));
  };

  @action fetchApps(full = false) {
    return new Promise((resolve) => {
      axios.get(full ? '/api/app/search' : '/api/app/list')
        .then((response) => {
          this.session.apps.replace(response.data);
          this.session.identity = this.session.apps[0];
          resolve();
        });
    });
  }
}

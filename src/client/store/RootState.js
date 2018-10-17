import { action, observable } from 'mobx';
import ApplicationState from './application/ApplicationState';

/**
 * Authentication State
 */
export class Authentication {
  // Whether the user is logged in to the system
  @observable loggedIn = false;

  // The users email
  @observable email = '';

  // The users username
  @observable userName = '';

  /**
   * Fetch the username of the user
   */
  @action fetchUsername = (auth) => {
    // Login on the server
  };
}

/**
 * Default state of the site
 */
export default class RootState {
  // List of available jobs
  @observable jobs = ['Loading... please wait!'];

  // Theme to use
  @observable paletteType = 1;

  // Whether the sidebar is open or not
  @observable open = false;

  // Application State
  @observable application = new ApplicationState();

  // Authentication State
  @observable authentication = new Authentication();

  /**
   * Fetch jobs from the backend
   */
  @action fetchJobs = () => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then((res) => {
        this.jobs.replace(res.jobs);
      });
  };
}

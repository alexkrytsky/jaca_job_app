import { observable } from 'mobx';
import BaseState from './BaseState';


export default class SessionState extends BaseState {
  // Whether the user is logged in to the system
  @observable loggedIn = false;

  // List of available jobs
  @observable jobs = ['Loading... please wait!'];

  @observable apps = [];

  @observable identity = {
    generalInfo: {},
    employmentDesired: {},
    specialSkills: {
      certificate: [],
    },
    employmentHistory: {
      history: [],
    },
    references: {
      references: [],
    },
  };

  constructor(root) {
    super(root, 'sessionState');
  }
}

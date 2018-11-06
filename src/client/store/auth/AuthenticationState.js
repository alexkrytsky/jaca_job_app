import { action, observable } from 'mobx';
import axios from 'axios';
import ValidatedField from '../application/ValidatedField';
import { emailRegex } from '../../constants/GeneralRegex';

/**
 * Authentication State
 */
export default class AuthenticationState {
  // The users email
  @observable email = new ValidatedField('', s => !emailRegex.test(s));

  @observable password = new ValidatedField('');

  @observable error = '';

  constructor(root) {
    this.root = root;
  }

  @action login = () => {
    this.email.changed = true;
    this.password.changed = true;

    if (!this.email.validation && !this.password.validation) {
      this.error = '';
      axios.post('/api/auth/login', {
        email: this.email.value,
        password: this.password.value
      })
        .then((response) => {
          if (response.data.status === 'success') {
            this.error = '';
            this.root.session.loggedIn = true;
            this.password.reset();
            this.email.reset();
          } else {
            this.error = 'Invalid Credentials';
          }
        });
    } else {
      this.error = 'Incorrect Formatting';
    }
  };

  @action logout = () => {
    this.email.changed = false;
    this.password.changed = false;
    axios.post('/api/auth/logout')
      .then((response) => {
        if (response.data.status === 'success') {
          this.root.session.loggedIn = false;
        }
      });
  };

  @action getStatus = () => {
    axios.get('/api/auth/status')
      .then((response) => {
        this.root.session.loggedIn = response.data.loggedIn;
      });
  };
}

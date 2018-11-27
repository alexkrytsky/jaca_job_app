import { action, computed, observable } from 'mobx';
import Field from '../application/Field';

/**
 * Authentication State
 */
export default class FilterState {
  // generic search
  @observable search = new Field('');

  @observable job = new Field('');

  @observable city = new Field('');

  @observable state = new Field('');

  @observable ageCheck = new Field(false);

  @observable authCheck = new Field(false);

  constructor(root) {
    this.root = root;
  }

  @computed get filteredApps() {
    const filterJob = app => this.job.value === '' || this.job.value === app.employmentDesired.employmentDesired;
    const filterState = app => this.state.value === '' || this.state.value === app.generalInfo.state;
    const filterAge = app => !this.ageCheck.value || app.generalInfo.ageCheck;
    const filterAuth = app => !this.authCheck.value || app.generalInfo.authorizedCheck;
    const filterSearch = app => this.search.value === '' || (
      app.firstName.toLowerCase().includes(this.search.value.toLowerCase())
      || app.lastName.toLowerCase().includes(this.search.value.toLowerCase())
      || app.email.toLowerCase().includes(this.search.value.toLowerCase())
    );

    const filtered = this.root.session.apps.filter(
      app => filterJob(app)
        && filterState(app)
        && filterAge(app)
        && filterAuth(app)
        && filterSearch(app)
    );

    return {
      list: filtered,
      count: filtered.length,
      total: this.root.session.apps.length
    };
  }

  /**
   * Clear the form
   */
  @action clear = () => {
    // Reset fields to empty
    this.search.update('');
    this.job.update('');
    this.city.update('');
    this.state.update('');
    this.ageCheck.update(false);
    this.authCheck.update(false);
  };
}

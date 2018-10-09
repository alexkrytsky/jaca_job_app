import { action, observable, computed } from 'mobx';

export class GeneralInfoState {
  @observable hasChanged = {
    firstName: false,
    lastName: false,
    middleName: false,
    address1: false,
    address2: false,
    city: false,
    state: false,
    zipCode: false,
    homePhone: false,
    cellPhone: false,
    email: false
  };

  @observable firstName = '';

  @computed get firstNameValidation() {
    return this.firstName === '' && this.hasChanged.firstName;
  }

  @observable lastName = '';

  @computed get lastNameValidation() {
    return this.lastName === '' && this.hasChanged.lastName;
  }

  @observable middleName = '';

  @observable address1 = '';

  @computed get address1Validation() {
    return this.address1 === '' && this.hasChanged.address1;
  }

  @observable address2 = '';

  @observable city = '';

  @computed get cityValidation() {
    return this.city === '' && this.hasChanged.city;
  }

  @observable state = '';

  @computed get stateValidation() {
    return this.state === '' && this.hasChanged.state;
  }

  @observable zipCode = '';

  @computed get zipCodeValidation() {
    return this.zipCode === '' && this.hasChanged.zipCode;
  }

  @observable homePhone = '';

  @computed get homePhoneValidation() {
    return this.homePhone === '' && this.hasChanged.homePhone;
  }

  @observable cellPhone = '';

  @computed get cellPhoneValidation() {
    return this.cellPhone === '' && this.hasChanged.cellPhone;
  }

  @observable email = '';

  @computed get emailValidation() {
    return this.email === '' && this.hasChanged.email;
  }

  @observable ageCheck = false;

  @observable authorizedCheck = false;

  @action update = (name, value) => {
    this[name] = value;
    this.hasChanged[name] = true;
  };

  validateFields = () => {
    // Force all required fields to be updated
    const keys = Object.keys(this.hasChanged);
    keys.forEach((field) => {
      this.hasChanged[field] = true;
    });

    return this.firstNameValidation
      || this.lastNameValidation
      || this.address1Validation
      || this.cityValidation
      || this.stateValidation
      || this.zipCodeValidation
      || this.homePhoneValidation
      || this.cellPhoneValidation
      || this.emailValidation;
  };
}

export class ApplicationState {
  @observable step = 0;

  @observable generalInfo = new GeneralInfoState();
}

export class Authentication {
  @observable loggedIn = false;

  @observable email = '';

  @observable userName = '';

  @action
  fetchUsername = (auth) => {
    // Login on the server
  };
}

export default class RootState {
  @observable jobs = ['Loading... please wait!'];

  @observable paletteType = 'light';

  @observable open = false;

  @observable application = new ApplicationState();

  @observable authentication = new Authentication();

  @action
  formBack = () => {
    this.application.step -= 1;
  };

  @action
  formNext = () => {
    console.log(this.application.step);
    switch (this.application.step) {
      case 0:
        if (this.application.generalInfo.validateFields()) {
          return;
        }
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      default:
        throw new Error('No Verification Available');
    }
    this.application.step += 1;
  };

  @action
  fetchJobs = () => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then((res) => {
        this.jobs.replace(res.jobs);
      });
  };
}

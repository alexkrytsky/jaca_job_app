import { action, observable } from 'mobx';
import ValidatedField from './ValidatedField';
import Field from './Field';
import { zipCodeRegex, phoneNumberRegex, emailRegex } from '../../constants/GeneralRegex';

/**
 * The State for the General Info Form
 */
export default class GeneralInfoState {
  @observable firstName = new ValidatedField('');

  @observable lastName = new ValidatedField('');

  @observable middleName = new Field('');

  @observable address1 = new ValidatedField('');

  @observable address2 = new Field('');

  @observable city = new ValidatedField('');

  @observable state = new ValidatedField('');

  @observable zipCode = new ValidatedField('', s => !zipCodeRegex.test(s));

  @observable homePhone = new ValidatedField('', s => !phoneNumberRegex.test(s));

  @observable cellPhone = new ValidatedField('', s => !phoneNumberRegex.test(s));

  @observable email = new ValidatedField('', s => !emailRegex.test(s));

  @observable ageCheck = new Field(false);

  @observable authorizedCheck = new Field(false);

  /**
   * Set all validated fields to a set changed state
   *
   * @param to {boolean} value to change to
   */
  setAllChangedState(to) {
    this.firstName.changed = to;
    this.lastName.changed = to;
    this.address1.changed = to;
    this.city.changed = to;
    this.state.changed = to;
    this.zipCode.changed = to;
    this.homePhone.changed = to;
    this.cellPhone.changed = to;
    this.email.changed = to;
  }

  /**
   * Validate the fields
   *
   * @returns {boolean} true if the form is incomplete
   */
  @action validateFields = () => {
    this.setAllChangedState(true);
    return this.firstName.validation
      || this.lastName.validation
      || this.address1.validation
      || this.city.validation
      || this.state.validation
      || this.zipCode.validation
      || this.homePhone.validation
      || this.cellPhone.validation
      || this.email.validation;
  };
}

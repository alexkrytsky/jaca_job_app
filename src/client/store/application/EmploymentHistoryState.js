import { action, observable } from 'mobx';
import ValidatedField from './ValidatedField';
import Field from './Field';
import { phoneNumberRegex } from '../../constants/GeneralRegex';

/**
 * The State for the Employment History Form
 */
export default class EmploymentHistoryState {
  idCounter = 0;

  // Array of entries
  @observable history = [];

  @observable employer = new ValidatedField('');

  @observable address = new ValidatedField('');

  @observable contactNumber = new ValidatedField('', s => phoneNumberRegex.test(s));

  @observable position = new ValidatedField('');

  @observable startDate = new ValidatedField('');

  @observable endDate = new ValidatedField('');

  @observable supervisorName = new ValidatedField('');

  @observable supervisorTitle = new ValidatedField('');

  @observable reasonLeft = new ValidatedField('');

  @observable description = new ValidatedField('');

  @observable contactPermission = new Field(false);

  /**
   * Set all validated fields to a set changed state
   *
   * @param to {boolean} value to change to
   */
  setAllChangedState(to) {
    this.employer.changed = to;
    this.address.changed = to;
    this.contactNumber.changed = to;
    this.position.changed = to;
    this.startDate.changed = to;
    this.endDate.changed = to;
    this.supervisorName.changed = to;
    this.supervisorTitle.changed = to;
    this.reasonLeft.changed = to;
    this.description.changed = to;
  }

  /**
   * Validate the fields
   *
   * @returns {boolean} true if the form is incomplete
   */
  @action validateFields = () => {
    this.setAllChangedState(true);
    return this.employer.validation
      || this.address.validation
      || this.contactNumber.validation
      || this.position.validation
      || this.startDate.validation
      || this.endDate.validation
      || this.supervisorName.validation
      || this.supervisorTitle.validation
      || this.reasonLeft.validation
      || this.description.validation;
  };

  /**
   * Save the entry and clears the form
   *
   * @return {boolean} successful if true
   */
  @action save = () => {
    // Check all fields validation before saving
    if (this.validateFields()) {
      return false;
    }

    // Add the entry to the array
    this.history.push({
      id: this.idCounter,
      employer: this.employer.value,
      address: this.address.value,
      contactNumber: this.contactNumber.value,
      position: this.position.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      supervisorName: this.supervisorName.value,
      supervisorTitle: this.supervisorTitle.value,
      reasonLeft: this.reasonLeft.value,
      description: this.description.value,
      contactPermission: this.contactPermission.value
    });

    // Increment the id counter
    this.idCounter += 1;

    this.clear();

    return true;
  };

  /**
   * Clear the form
   */
  @action clear = () => {
    // Reset fields to empty
    this.employer.update('');
    this.address.update('');
    this.contactNumber.update('');
    this.position.update('');
    this.startDate.update('');
    this.endDate.update('');
    this.supervisorName.update('');
    this.supervisorTitle.update('');
    this.reasonLeft.update('');
    this.description.update('');
    this.contactPermission.update(false);

    // Clear all the change state
    this.setAllChangedState(false);
  };

  /**
   * Remove an entry from the history by ID
   *
   * @param id {Number} entry id to remove
   */
  @action removeHistory = (id) => {
    // Filter out the entry to delete
    this.history = this.history.filter(obj => obj.id !== id);
  };
}

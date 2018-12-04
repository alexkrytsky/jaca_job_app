import React from 'react';
import { action, observable } from 'mobx';
import ValidatedField from './ValidatedField';
import Field from './Field';
import { phoneNumberRegex } from '../../constants/GeneralRegex';
import EmploymentHistory from '../../components/application/pages/EmploymentHistory';
import FormState from './FormState';

/**
 * The State for the Employment History Form
 */
export default class EmploymentHistoryState extends FormState {
  constructor() {
    super('Employment History', <EmploymentHistory />, 'Errors Remaining to save.');
  }

  idCounter = 0;

  @observable adding = false;

  // Array of entries
  @observable history = [];

  @observable employer = new ValidatedField('');

  @observable address = new ValidatedField('');

  @observable contactNumber = new ValidatedField('', s => !phoneNumberRegex.test(s));

  @observable position = new ValidatedField('');

  @observable startDate = new ValidatedField('');

  @observable endDate = new ValidatedField('');

  @observable supervisorName = new ValidatedField('');

  @observable supervisorTitle = new ValidatedField('');

  @observable reasonLeft = new ValidatedField('');

  @observable description = new ValidatedField('');

  @observable contactPermission = new Field(false);

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
   * Reset all
   */
  @action clear = () => {
    this.setAllChangedState(false);
    this.employer.reset();
    this.address.reset();
    this.contactNumber.reset();
    this.position.reset();
    this.startDate.reset();
    this.endDate.reset();
    this.supervisorName.reset();
    this.supervisorTitle.reset();
    this.reasonLeft.reset();
    this.description.reset();
    this.contactPermission.reset();
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

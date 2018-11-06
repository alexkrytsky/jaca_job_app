import React from 'react';
import { action, observable } from 'mobx';
import ValidatedField from './ValidatedField';
import { phoneNumberRegex } from '../../constants/GeneralRegex';
import References from '../../components/application/pages/References';
import FormState from './FormState';

/**
 * The State for the References Form
 */
export default class ReferencesState extends FormState {
  constructor() {
    super('References', <References />, 'Errors Remaining.');
  }

  idCounter = 0;

  // Array of reference entries
  @observable references = [];

  @observable referenceName = new ValidatedField('');

  @observable contactNumber = new ValidatedField('', s => !phoneNumberRegex.test(s));

  @observable address = new ValidatedField('');

  @observable relation = new ValidatedField('');


  /**
   * Saves the entry and clears the form
   *
   * @return {boolean} successful if true
   */
  @action save = () => {
    // check all fields validation before saving
    if (this.validateFields()) {
      return false;
    }

    // Add the entry to the array
    this.references.push({
      id: this.idCounter,
      referenceName: this.referenceName.value,
      contactNumber: this.contactNumber.value,
      address: this.address.value,
      relation: this.relation.value
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
    this.referenceName.reset();
    this.contactNumber.reset();
    this.address.reset();
    this.relation.reset();
  };

  /**
   * Remove an entry from the references by ID
   *
   * @param id {Number} entry id to remove
   */
  @action removeReference = (id) => {
    // Filter out the entry to delete
    this.references = this.references.filter(obj => obj.id !== id);
  };
}

import React from 'react';
import { action, observable } from 'mobx';
import ValidatedField from './ValidatedField';
import SpecialSkills from '../../components/application/pages/SpecialSkills';
import FormState from './FormState';


/**
 * The State for the certificate Form
 */
export default class SpecialSkillsState extends FormState {
  constructor() {
    super('Certification', <SpecialSkills />, 'Errors Remaining to save.');
  }

  idCounter = 0;

  @observable adding = false;

  // Array of entries
  @observable certificate = [];

  @observable name = new ValidatedField('');

  @observable issuedDate = new ValidatedField('');

  @observable expirationDate = new ValidatedField('');

  /**
   * Set all validated fields to a set changed state
   *
   * @param to {boolean} value to change to
   */
  setAllChangedState(to) {
    this.name.changed = to;
    this.issuedDate.changed = to;
    this.expirationDate.changed = to;
  }

  /**
   * Validate the fields
   *
   * @returns {boolean} true if the form is incomplete
   */
  @action validateFields = () => {
    this.setAllChangedState(true);
    return this.name.validation
      || this.issuedDate.validation
      || this.expirationDate.validation;
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
    this.certificate.push({
      id: this.idCounter,
      name: this.name.value,
      issuedDate: this.issuedDate.value,
      expirationDate: this.expirationDate.value,
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
    this.name.update('');
    this.issuedDate.update('');
    this.expirationDate.update('');

    // Clear all the change state
    this.setAllChangedState(false);
  };

  /**
   * Remove an entry from the certificate by ID
   *
   * @param id {Number} entry id to remove
   */
  @action removeCertificate = (id) => {
    // Filter out the entry to delete
    this.certificate = this.certificate.filter(obj => obj.id !== id);
  };
}

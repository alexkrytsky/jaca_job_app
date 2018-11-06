import React from 'react';
import { action, observable } from 'mobx';
import ValidatedField from './ValidatedField';
import FormState from './FormState';
import Education from '../../components/application/pages/Education';

/**
 * The State for the Education Form
 */
export default class EducationState extends FormState {
  constructor() {
    super('Education', <Education />, 'Errors Remaining.');
  }

  idCounter = 0;

  // Array of entries
  @observable school = [];

  @observable educationLevel = new ValidatedField('');

  @observable schoolName = new ValidatedField('');

  @observable schoolLocation = new ValidatedField('');

  @observable yearsCompleted = new ValidatedField('');

  @observable graduate = new ValidatedField('');

  @observable diploma = new ValidatedField('');

  /**
   * Set all validated fields to a set changed state
   *
   * @param to {boolean} value to change to
   */
  setAllChangedState(to) {
    this.educationLevel.changed = to;
    this.schoolName.changed = to;
    this.schoolLocation.changed = to;
    this.yearsCompleted.changed = to;
    this.graduate.changed = to;
    this.diploma.changed = to;
  }

  /**
   * Validate the fields
   *
   * @returns {boolean} true if the form is incomplete
   */
  @action validateFields = () => {
    this.setAllChangedState(true);
    return this.educationLevel.validation
      || this.schoolName.validation
      || this.schoolLocation.validation
      || this.yearsCompleted.validation
      || this.graduate.validation
      || this.diploma.validation;
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
    this.school.push({
      id: this.idCounter,
      educationLevel: this.educationLevel.value,
      schoolName: this.schoolName.value,
      schoolLocation: this.schoolLocation.value,
      yearsCompleted: this.yearsCompleted.value,
      graduate: this.graduate.value,
      diploma: this.diploma.value,
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
    this.educationLevel.update('');
    this.schoolName.update('');
    this.schoolLocation.update('');
    this.yearsCompleted.update('');
    this.graduate.update('');
    this.diploma.update('');

    // Clear all the change state
    this.setAllChangedState(false);
  };

  /**
   * Remove an entry from the school by ID
   *
   * @param id {Number} entry id to remove
   */
  @action removeSchool = (id) => {
    // Filter out the entry to delete
    this.school = this.school.filter(obj => obj.id !== id);
  };
}

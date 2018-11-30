import React from 'react';
import { action, observable } from 'mobx';
import ValidatedField from './ValidatedField';
import Field from './Field';
import EmploymentDesired from '../../components/application/pages/EmploymentDesired';
import FormState from './FormState';
// this section holds the state for employment desired form

/**
 * The State for the Employment Desired Form
 */
export default class EmploymentDesiredState extends FormState {
  // hold the title for the section
  constructor() {
    super('Employment Desired', <EmploymentDesired />, 'Errors Remaining to save.');
  }

  // all the states that need to be checked/validated
  @observable employmentDesired = new ValidatedField('');
  @observable salaryExpectations = new Field('');
  @observable applied = new Field(false);
  @observable workedAtMsc = new Field(false);

  setAllChangedState(to) {
    this.employmentDesired.changed = to;
    this.salaryExpectations.changed = to;

  }

  @action validateFields = () => {
    this.setAllChangedState(true);
    return this.employmentDesired.validation;
  };
}

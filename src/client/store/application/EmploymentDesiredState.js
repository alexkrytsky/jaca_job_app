import React from 'react';
import { action, observable } from 'mobx';
import ValidatedField from './ValidatedField';
import Field from './Field';
import EmploymentDesired from '../../components/application/pages/EmploymentDesired';
import FormState from './FormState';


/**
 * The State for the Employment Desired Form
 */
export default class EmploymentDesiredState extends FormState {
  constructor() {
    super('Employment Desired', <EmploymentDesired />, 'Errors Remaining to save.');
  }

  @observable employmentDesired = new ValidatedField('');
  @observable salaryExpectations = new ValidatedField('');
  @observable startDate = new ValidatedField('');
  @observable applied = new Field(false);
  @observable workedAtMsc = new Field(false);

  setAllChangedState(to) {
    this.employmentDesired.changed = to;
    this.salaryExpectations.changed = to;
    this.startDate = to;

  }

  @action validateFields = () => {
    this.setAllChangedState(true);
    return this.employmentDesired.validation || this.salaryExpectations.validation
      || this.startDate.validation;
  };
}

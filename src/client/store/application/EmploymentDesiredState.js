import React from 'react';
import EmploymentDesired from '../../components/application/pages/EmploymentDesired';
import FormState from './FormState';

/**
 * The State for the Employment Desired Form
 */
export default class EmploymentDesiredState extends FormState {
  constructor() {
    super('Employment Desired', <EmploymentDesired />, 'Errors Remaining.');
  }
}

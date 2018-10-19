import React from 'react';
import Submit from '../../components/application/pages/Submit';
import FormState from './FormState';

/**
 * The State for the Submit Form
 */
export default class SubmitState extends FormState {
  constructor() {
    super('Submit', <Submit />, 'Errors Remaining.');
  }
}

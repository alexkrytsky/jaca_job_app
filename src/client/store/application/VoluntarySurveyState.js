import React from 'react';
import VoluntarySurvey from '../../components/application/pages/VoluntarySurvey';
import FormState from './FormState';

/**
 * The State for the Voluntary Survey Form
 */
export default class VoluntarySurveyState extends FormState {
  constructor() {
    super('Voluntary Survey', <VoluntarySurvey />, 'Errors Remaining.');
  }
}

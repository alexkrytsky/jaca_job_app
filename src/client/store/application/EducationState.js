import React from 'react';
import Education from '../../components/application/pages/Education';
import FormState from './FormState';

/**
 * The State for the Education Form
 */
export default class EducationState extends FormState {
  constructor() {
    super('Education', <Education />, 'Errors Remaining.');
  }
}

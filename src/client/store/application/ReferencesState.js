import React from 'react';
import References from '../../components/application/pages/References';
import FormState from './FormState';

/**
 * The State for the References Form
 */
export default class ReferencesState extends FormState {
  constructor() {
    super('References', <References />, 'Errors Remaining.');
  }
}

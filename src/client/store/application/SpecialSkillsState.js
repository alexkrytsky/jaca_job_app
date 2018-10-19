import React from 'react';
import SpecialSkills from '../../components/application/pages/SpecialSkills';
import FormState from './FormState';

/**
 * The State for the Special Skills Form
 */
export default class SpecialSkillsState extends FormState {
  constructor() {
    super('Special Skills', <SpecialSkills />, 'Errors Remaining.');
  }
}

import React from 'react';
import {observable } from 'mobx';
import VoluntarySurvey from '../../components/application/pages/VoluntarySurvey';
import FormState from './FormState';
import ValidatedField from './ValidatedField';
import Field from "./Field";

/**
 * The State for the Voluntary Survey Form
 */
export default class VoluntarySurveyState extends FormState {
  constructor() {
    super('Voluntary Survey', <VoluntarySurvey />, 'Errors Remaining.');
  }
    @observable gender = new ValidatedField('');

    @observable white = new Field(false);

    @observable hispanic = new Field(false);

    @observable americanNative = new Field(false);

    @observable afroAmerican = new Field(false);

    @observable asian = new Field(false);

    @observable otherEthnicity = new Field(false);

    @observable pacificIslander = new Field(false);

    @observable vietnamVeteran = new Field(false);

    @observable activeDutyVeteran = new Field(false);

    @observable disabledVeteran = new Field(false);

    @observable newVeteran = new Field(false);

    @observable disability = new Field(false);
}

import React from 'react';
import { observable } from 'mobx';
import ValidatedField from './ValidatedField';
import Field from './Field';
import { emailRegex, phoneNumberRegex, zipCodeRegex } from '../../constants/GeneralRegex';
import GeneralInfo from '../../components/application/pages/GeneralInfo';
import FormState from './FormState';

/**
 * The State for the General Info Form
 */
export default class GeneralInfoState extends FormState {
  constructor() {
    super('General Information', <GeneralInfo />, 'Errors Remaining.');
  }

  @observable firstName = new ValidatedField('');

  @observable lastName = new ValidatedField('');

  @observable middleName = new Field('');

  @observable address1 = new ValidatedField('');

  @observable address2 = new Field('');

  @observable city = new ValidatedField('');

  @observable state = new ValidatedField('');

  @observable zipCode = new ValidatedField('', s => !zipCodeRegex.test(s));

  @observable homePhone = new ValidatedField('', s => !phoneNumberRegex.test(s));

  @observable cellPhone = new Field('', s => !phoneNumberRegex.test(s));

  @observable email = new ValidatedField('', s => !emailRegex.test(s));

  @observable ageCheck = new Field(false);

  @observable authorizedCheck = new Field(false);
}

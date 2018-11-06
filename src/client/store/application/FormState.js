import { action, computed } from 'mobx';
import ValidatedField from './ValidatedField';
import Field from './Field';


export default class FormState {
  constructor(label, component, errorText) {
    this.label = label;
    this.component = component;
    this.errorText = errorText;
  }

  /**
   * Set all validated fields to a set changed state
   *
   * @param to {boolean} value to change to
   */
  setAllChangedState = (to) => {
    Object.values(this)
      .filter(value => value instanceof ValidatedField)
      .forEach((value) => {
        value.changed = to;
      });
  };

  /**
   * Validate the fields
   *
   * @returns {boolean} true if the form is incomplete
   */
  @action validateFields = () => {
    this.setAllChangedState(true);
    return this.error;
  };

  /**
   * Reset all values
   */
  @action reset = () => {
    this.setAllChangedState(false);
    Object.values(this)
      .filter(value => value instanceof Field)
      .forEach(value => value.reset());
    Object.keys(this)
      .filter(key => this[key] instanceof Array)
      .forEach((key) => { this[key] = []; });
  };

  /**
   * Computed value, true if there are errors in the form
   * @returns {boolean} true if errors exist
   */
  @computed get error() {
    return !Object.values(this)
      .filter(value => value instanceof ValidatedField)
      .every(value => !value.validation);
  }

  /**
   * Computed Error Message, updates with count of errors
   * @returns {string}
   */
  @computed get errorMessage() {
    const count = Object.values(this)
      .filter(value => value instanceof ValidatedField)
      .map(value => value.validation)
      .filter(value => value)
      .length;
    return `${count} ${this.errorText}`;
  }
}

import { computed, observable, action } from 'mobx';
import Field from './Field';

/**
 * Field data with validation functionality
 */
export default class ValidatedField extends Field {
  @observable changed = false;

  /**
   * @param defaultValue {*} Default value for the field
   * @param validationFunc {Function} True if error
   */
  constructor(defaultValue, validationFunc = val => val === '') {
    super(defaultValue);
    this.validationFunc = validationFunc;
  }

  /**
   * Computed checks if the field is valid
   *
   * @returns {boolean} true if invalid
   */
  @computed get validation() {
    return this.validationFunc(this.value) && this.changed;
  }

  /**
   * Update the field
   *
   * @param value {*} value to insert
   */
  @action update(value) {
    super.update(value);
    this.changed = true;
  }
}

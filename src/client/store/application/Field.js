import { observable, action } from 'mobx';

/**
 * Field to store data
 */
export default class Field {
  @observable value = '';

  /**
   * @param defaultValue {*} Default value to use
   */
  constructor(defaultValue = '') {
    this.value = defaultValue;
  }

  /**
   * Update the field
   *
   * @param value {*}
   */
  @action update(value) {
    this.value = value;
  }
}

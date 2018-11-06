import { action, autorun, isObservableProp, toJS } from 'mobx';

/**
 * Base mobx state object that contains functionality for storage saving.
 */
export default class BaseState {
  /**
   * Create the storage object mapped to key
   * @param key {string} Key to use to access storage
   * @param storage {Storage} Storage type to use
   */
  constructor(root, key, storage = sessionStorage) {
    this.root = root;
    this.key = key;
    this.storage = storage;

    // Load from storage
    this.load();
    this.autoSave();
  }

  /**
   * Starts the autosave mobx action
   */
  autoSave() {
    let firstRun = true;
    autorun(() => {
      // This code will run every time any observable property on the store is updated.
      const copy = toJS(this);
      // Remove copied key and storage objects to prevent cascading or overflow issues.
      delete copy.key;
      delete copy.storage;
      delete copy.root;

      if (!firstRun) {
        this.storage.setItem(this.key, JSON.stringify(copy));
      }
      firstRun = false;
    });
  }

  /**
   * Load data from storage and map it to the objects mobx fields
   */
  @action load = () => {
    const data = this.storage.getItem(this.key);

    if (data !== undefined && data !== null) {
      const parsed = JSON.parse(data);

      Object.keys(parsed)
        .filter(key => key in this)
        .filter(key => isObservableProp(this, key))
        .forEach((key) => {
          this[key] = parsed[key];
        });
    }
  };
}

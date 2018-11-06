import { observable } from 'mobx';
import BaseState from './BaseState';


export default class LocalState extends BaseState {
  @observable paletteType = 0;

  constructor(root) {
    super(root, 'localState', localStorage);
  }
}

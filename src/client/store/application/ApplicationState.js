import { action, observable } from 'mobx';
import GeneralInfoState from './GeneralInfoState';
import EmploymentHistoryState from './EmploymentHistoryState';

export default class ApplicationState {
  @observable step = 0;

  @observable generalInfo = new GeneralInfoState();

  @observable employmentHistory = new EmploymentHistoryState();

  @action reset = () => {
    this.generalInfo = new GeneralInfoState();
    this.employmentHistory = new EmploymentHistoryState();
    this.step = 0;
  };

  @action
  formBack = () => {
    this.step -= 1;
  };

  @action
  formNext = () => {
    switch (this.step) {
      case 0:
        if (this.generalInfo.validateFields()) {
          return;
        }
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      default:
        throw new Error('No Verification Available');
    }
    this.step += 1;
  };
}

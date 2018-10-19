import { action, observable } from 'mobx';
import GeneralInfoState from './GeneralInfoState';
import EmploymentHistoryState from './EmploymentHistoryState';
import SpecialSkillsState from './SpecialSkillsState';
import EmploymentDesiredState from './EmploymentDesiredState';
import ReferencesState from './ReferencesState';
import VoluntarySurveyState from './VoluntarySurveyState';
import SubmitState from './SubmitState';
import EducationState from './EducationState';

export default class ApplicationState {
  @observable step = 0;

  @observable generalInfo = new GeneralInfoState();

  @observable employmentDesired = new EmploymentDesiredState();

  @observable education = new EducationState();

  @observable specialSkills = new SpecialSkillsState();

  @observable employmentHistory = new EmploymentHistoryState();

  @observable references = new ReferencesState();

  @observable voluntarySurvey = new VoluntarySurveyState();

  @observable submit = new SubmitState();

  @observable listOfSteps = [
    this.generalInfo,
    this.employmentDesired,
    this.education,
    this.specialSkills,
    this.employmentHistory,
    this.references,
    this.voluntarySurvey,
    this.submit
  ];

  @action reset = () => {
    this.listOfSteps.forEach(value => value.reset());
    this.step = 0;
  };

  @action setStep = (step) => {
    if (step <= this.step || this.validate()) {
      this.step = step;
    }
  };

  @action backStep = () => {
    this.step -= 1;
  };

  @action nextStep = () => {
    if (this.validate()) {
      this.step += 1;
    }
  };

  validate = () => {
    switch (this.step) {
      case 0:
        return !this.generalInfo.validateFields();
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return true;
      case 6:
        return true;
      case 7:
        return true;
      default:
        throw new Error('No Verification Available');
    }
  };
}

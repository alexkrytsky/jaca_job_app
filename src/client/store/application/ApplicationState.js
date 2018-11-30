import { action, observable, toJS } from 'mobx';
import axios from 'axios';
import faker from 'faker';
import GeneralInfoState from './GeneralInfoState';
import EmploymentHistoryState from './EmploymentHistoryState';
import SpecialSkillsState from './SpecialSkillsState';
import EmploymentDesiredState from './EmploymentDesiredState';
import ReferencesState from './ReferencesState';
import VoluntarySurveyState from './VoluntarySurveyState';
import SubmitState from './SubmitState';
import EducationState from './EducationState';
import ResumeUploadState from './ResumeUploadState';

export default class ApplicationState {
  @observable step = 0;

  @observable generalInfo = new GeneralInfoState();

  @observable employmentDesired = new EmploymentDesiredState();

  @observable education = new EducationState();

  @observable specialSkills = new SpecialSkillsState();

  @observable employmentHistory = new EmploymentHistoryState();

  @observable references = new ReferencesState();

  @observable voluntarySurvey = new VoluntarySurveyState();
  @observable resumeUpload = new ResumeUploadState();

  @observable submit = new SubmitState();

  @observable submitStatus = 'Uploading Application';

  @observable listOfSteps = [
    this.generalInfo,
    this.employmentDesired,
    this.education,
    this.specialSkills,
    this.employmentHistory,
    this.references,
    this.voluntarySurvey,
    this.resumeUpload,
    this.submit
  ];

  constructor(root) {
    this.root = root;
  }

  @action reset = () => {
    this.listOfSteps.forEach(value => value.reset());
    this.step = 0;
  };

  @action setStep = (step) => {
    if (step <= this.step || this.validate()) {
      this.step = step;
      window.scrollTo(0, 0);
    }
  };

  @action backStep = () => {
    this.step -= 1;
    window.scrollTo(0, 0);
  };

  @action nextStep = () => {
    if (this.validate()) {
      this.step += 1;
      if (this.step >= this.listOfSteps.length) {
        this.submitToServer();
      }
      window.scrollTo(0, 0);
    }
  };

  @action fillData = () => {
    const {
      name,
      internet,
      address,
      phone,
      random,
      date,
      finance,
      company,
      lorem
    } = faker;

    const {
      generalInfo,
      employmentDesired,
      education,
      specialSkills,
      employmentHistory,
      references,
      voluntarySurvey
    } = this;

    /**
     * @param num {Number}
     * @param digits {Number}
     * @returns {string}
     */
    const toFixed = (num, digits = 2) => num.toLocaleString('en-US', { minimumIntegerDigits: digits });

    const startDate = new Date(date.future());
    const issueDate = new Date(date.past());
    const expirationDate = new Date(date.future());
    switch (this.step) {
      case 0:
        generalInfo.firstName.update(name.firstName(0));
        generalInfo.lastName.update(name.lastName(0));
        generalInfo.middleName.update(name.firstName(0));
        generalInfo.email.update(internet.email());
        generalInfo.address1.update(address.streetAddress(false));
        generalInfo.address2.update(address.secondaryAddress());
        generalInfo.city.update(address.city());
        generalInfo.state.update(address.state());
        generalInfo.zipCode.update(address.zipCode());
        generalInfo.homePhone.update(phone.phoneNumber());
        generalInfo.cellPhone.update(phone.phoneNumber());
        generalInfo.ageCheck.update(random.boolean());
        generalInfo.authorizedCheck.update(random.boolean());
        break;
      case 1:
        this.root.fetchJobs()
          .then(() => {
            employmentDesired.employmentDesired.update(random.arrayElement(this.root.session.jobs));
          });
        employmentDesired.startDate.update(`${startDate.getFullYear()}-${toFixed(startDate.getMonth() + 1)}-${toFixed(startDate.getDay() + 1)}`);
        employmentDesired.salaryExpectations.update(`$${finance.amount()}`);
        employmentDesired.applied.update(random.boolean());
        employmentDesired.workedAtMsc.update(random.boolean());
        employmentDesired.monday.update(random.boolean());
        employmentDesired.tuesday.update(random.boolean());
        employmentDesired.wednesday.update(random.boolean());
        employmentDesired.thursday.update(random.boolean());
        employmentDesired.friday.update(random.boolean());
        break;
      case 2:
        education.educationLevel.update(random.arrayElement(['High School', 'College', 'Graduate School']));
        education.schoolName.update(company.companyName());
        education.schoolLocation.update(address.streetAddress(false));
        education.yearsCompleted.update(random.number({
          min: 0,
          max: 6
        }));
        education.graduate.update(random.arrayElement(['yes', 'no']));
        education.diploma.update(lorem.sentence());
        break;
      case 3:
        specialSkills.description.update(name.jobType());
        specialSkills.name.update(company.catchPhrase());
        specialSkills.issuedDate.update(`${issueDate.getFullYear()}-${toFixed(issueDate.getMonth() + 1)}-${toFixed(issueDate.getDay() + 1)}`);
        specialSkills.expirationDate.update(`${expirationDate.getFullYear()}-${toFixed(expirationDate.getMonth() + 1)}-${toFixed(expirationDate.getDay() + 1)}`);
        break;
      case 4:
        employmentHistory.employer.update(name.findName());
        employmentHistory.address.update(address.streetAddress(false));
        employmentHistory.contactNumber.update(phone.phoneNumber());
        employmentHistory.position.update(name.jobTitle());
        employmentHistory.startDate.update(`${issueDate.getFullYear()}-${toFixed(issueDate.getMonth() + 1)}-${toFixed(issueDate.getDay() + 1)}`);
        employmentHistory.endDate.update(`${expirationDate.getFullYear()}-${toFixed(expirationDate.getMonth() + 1)}-${toFixed(expirationDate.getDay() + 1)}`);
        employmentHistory.supervisorName.update(name.findName());
        employmentHistory.supervisorTitle.update(name.jobTitle());
        employmentHistory.reasonLeft.update(lorem.sentence());
        employmentHistory.description.update(lorem.sentences());
        employmentHistory.contactPermission.update(random.boolean());
        break;
      case 5:
        references.referenceName.update(name.findName());
        references.contactNumber.update(phone.phoneNumber());
        references.address.update(address.streetAddress(false));
        references.relation.update(random.arrayElement(['Uncle', 'Aunt', 'Boss', 'Co-worker', 'Friend', 'Neighbor']));
        break;
      case 6:
        voluntarySurvey.gender.update(random.arrayElement(['male', 'female', 'other']));
        voluntarySurvey.white.update(random.boolean());
        voluntarySurvey.hispanic.update(random.boolean());
        voluntarySurvey.americanNative.update(random.boolean());
        voluntarySurvey.afroAmerican.update(random.boolean());
        voluntarySurvey.asian.update(random.boolean());
        voluntarySurvey.pacificIslander.update(random.boolean());
        voluntarySurvey.vietnamVeteran.update(random.boolean());
        voluntarySurvey.activeDutyVeteran.update(random.boolean());
        voluntarySurvey.disabledVeteran.update(random.boolean());
        voluntarySurvey.newVeteran.update(random.boolean());
        voluntarySurvey.disability.update(random.boolean());
        break;
      default:
        break;
    }
  };

  @action submitToServer = () => {
    const {
      generalInfo,
      employmentDesired,
      education,
      specialSkills,
      employmentHistory,
      references,
      resumeUpload,
      voluntarySurvey
    } = this;

    const formData = new FormData();

    Object.values(resumeUpload.files)
      .filter(value => value instanceof File)
      .forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

    const data = {
      firstName: generalInfo.firstName.value,
      lastName: generalInfo.lastName.value,
      email: generalInfo.email.value,
      generalInfo: {
        middleName: generalInfo.middleName.value,
        address1: generalInfo.address1.value,
        address2: generalInfo.address2.value,
        city: generalInfo.city.value,
        state: generalInfo.state.value,
        zipCode: generalInfo.zipCode.value,
        homePhone: generalInfo.homePhone.value,
        cellPhone: generalInfo.cellPhone.value,
        ageCheck: generalInfo.ageCheck.value,
        authorizedCheck: generalInfo.authorizedCheck.value,
      },
      employmentDesired: {
        employmentDesired: employmentDesired.employmentDesired.value,
        startDate: employmentDesired.startDate.value,
        salaryExpectations: employmentDesired.salaryExpectations.value,
        applied: employmentDesired.applied.value,
        workedAtMsc: employmentDesired.workedAtMsc.value,
      },
      education: {
        school: toJS(education.school)
      },
      specialSkills: {
        skills: specialSkills.description.value,
        certificate: toJS(specialSkills.certificate)
      },
      employmentHistory: {
        history: toJS(employmentHistory.history)
      },
      references: {
        references: toJS(references.references)
      },
      voluntarySurvey: {
        gender: voluntarySurvey.gender.value,
        white: voluntarySurvey.white.value,
        hispanic: voluntarySurvey.hispanic.value,
        americanNative: voluntarySurvey.americanNative.value,
        afroAmerican: voluntarySurvey.afroAmerican.value,
        asian: voluntarySurvey.asian.value,
        pacificIslander: voluntarySurvey.pacificIslander.value,
        vietnamVeteran: voluntarySurvey.vietnamVeteran.value,
        activeDutyVeteran: voluntarySurvey.activeDutyVeteran.value,
        disabledVeteran: voluntarySurvey.disabledVeteran.value,
        newVeteran: voluntarySurvey.newVeteran.value,
        disability: voluntarySurvey.disability.value
      }
    };

    formData.append('data', JSON.stringify(data));

    axios.post('/api/app/submit', formData,
      {
        headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` }
      })
      .then(() => {
        this.submitStatus = 'Success';
      })
      .catch(() => {
        this.submitStatus = 'An error occurred, Please try again soon.';
      });
  };

  validate = () => {
    switch (this.step) {
      case 0:
        return !this.generalInfo.validateFields();
      case 1:
        return !this.employmentDesired.validateFields();
      default:
        return true;
    }
  };
}

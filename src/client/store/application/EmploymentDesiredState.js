import { action, observable } from 'mobx';
import ValidatedField from './ValidatedField';
import Field from './Field';
import { phoneNumberRegex } from '../../constants/GeneralRegex';

/**
 * The State for the Employment Desired Form
 */
export default class EmploymentHistoryState {
    @observable employmentDesired = new ValidatedField('');
    @observable salaryExpectations = new ValidatedField('');
    @observable startDate = new ValidatedField('');
    @observable monday = new Field(false);
    @observable tuesday = new Field(false);
    @observable wednesday = new Field(false);
    @observable thursday = new Field(false);

    @observable friday = new Field(false);
    @observable applied = new Field(false);
    @observable workedAtMsc = new Field(false);

    setAllChangedState(to) {
        this.employmentDesired.changed = to;
        this.salaryExpectations.changed=to;
        this.startDate = to;

    }

    @action validateFields = () => {
        this.setAllChangedState(true);
        return this.employmentDesired.validation || this.salaryExpectations.validation
            || this.startDate.validation
    };
}
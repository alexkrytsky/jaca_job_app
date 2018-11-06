module.exports = class EmploymentDesired {
  constructor(info) {
    this.employmentDesired = null;
    this.startDate = null;
    this.salaryExpectations = null;
    this.applied = false;
    this.workedAtMsc = false;
    this.monday = false;
    this.tuesday = false;
    this.wednesday = false;
    this.thursday = false;
    this.friday = false;

    Object.keys(this)
      .filter(key => key in info)
      .forEach((key) => {
        this[key] = info[key];
      });
  }
};

module.exports = class VoluntarySurvey {
  constructor(info) {
    this.gender = null;
    this.white = false;
    this.hispanic = false;
    this.americanNative = false;
    this.afroAmerican = false;
    this.asian = false;
    this.pacificIslander = false;
    this.vietnamVeteran = false;
    this.activeDutyVeteran = false;
    this.disabledVeteran = false;
    this.newVeteran = false;
    this.disability = false;

    Object.keys(this)
      .filter(key => key in info)
      .forEach((key) => {
        this[key] = info[key];
      });
  }
};

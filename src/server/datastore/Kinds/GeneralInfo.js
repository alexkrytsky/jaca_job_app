module.exports = class GeneralInfo {
  constructor(info) {
    this.middleName = null;
    this.address1 = null;
    this.address2 = null;
    this.city = null;
    this.state = null;
    this.zipCode = null;
    this.homePhone = null;
    this.cellPhone = null;
    this.ageCheck = false;
    this.legalCheck = false;

    Object.keys(this)
      .filter(key => key in info)
      .forEach((key) => {
        this[key] = info[key];
      });
  }
};

module.exports = class EmploymentHistory {
  constructor(info) {
    this.history = [];

    Object.keys(this)
      .filter(key => key in info)
      .forEach((key) => {
        this[key] = info[key];
      });
  }
};

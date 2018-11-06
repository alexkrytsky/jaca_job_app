module.exports = class Education {
  constructor(info) {
    this.school = [];

    Object.keys(this)
      .filter(key => key in info)
      .forEach((key) => {
        this[key] = info[key];
      });
  }
};

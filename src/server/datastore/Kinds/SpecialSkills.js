module.exports = class SpecialSkills {
  constructor(info) {
    this.skills = null;
    this.certificate = [];

    Object.keys(this)
      .filter(key => key in info)
      .forEach((key) => {
        this[key] = info[key];
      });
  }
};

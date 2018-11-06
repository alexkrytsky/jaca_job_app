module.exports = class References {
  constructor(info) {
    this.references = [];

    Object.keys(this)
      .filter(key => key in info)
      .forEach((key) => {
        this[key] = info[key];
      });
  }
};

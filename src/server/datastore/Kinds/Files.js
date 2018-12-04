module.exports = class Files {
  constructor(info) {

    this.files = [];


    Object.keys(this)
      .filter(key => key in info)
      .forEach((key) => {
        this[key] = info[key];
      });

  }

};

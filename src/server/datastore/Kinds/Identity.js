const Store = require('../Store');
const GeneralInfo = require('./GeneralInfo');
const EmploymentDesired = require('./EmploymentDesired');
const Education = require('./Education');
const SpecialSkills = require('./SpecialSkills');
const EmploymentHistory = require('./EmploymentHistory');
const References = require('./References');
const VoluntarySurvey = require('./VoluntarySurvey');

const kind = 'Identity';

module.exports = class Identity {
  constructor(entry, key = null) {
    // Unique Identifier
    this.key = key;

    // Entry properties
    this.created = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.generalInfo = new GeneralInfo({});
    this.employmentDesired = new EmploymentDesired({});
    this.education = new Education({});
    this.specialSkills = new SpecialSkills({});
    this.employmentHistory = new EmploymentHistory({});
    this.references = new References({});
    this.voluntarySurvey = new VoluntarySurvey({});

    Object.keys(this)
      .filter(field => field in entry)
      .forEach((field) => {
        this[field] = entry[field];
      });
  }

  static query(key) {
    return new Promise((resolve) => {
      Store.get(key)
        .then((results) => {
          const identity = results[0];

          resolve(new Identity(identity, identity[Store.KEY]));
        });
    });
  }

  static queryAll() {
    return new Promise((resolve) => {
      const query = Store.createQuery(kind);

      Store.runQuery(query)
        .then((results) => {
          const identities = results[0];

          // Create array of Identity Objects
          resolve(identities.map(
            identity => new Identity(identity, identity[Store.KEY])
          ));
        });
    });
  }

  save() {
    const key = this.key == null ? Store.key([kind]) : this.key;

    // TODO(): Add validation

    const entry = {
      created: new Date(),
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      generalInfo: this.generalInfo,
      employmentDesired: this.employmentDesired,
      education: this.education,
      specialSkills: this.specialSkills,
      employmentHistory: this.employmentHistory,
      references: this.references,
      voluntarySurvey: this.voluntarySurvey
    };

    return Store.upsert({
      key,
      data: entry
    })
      .then((test) => {
        this.key = test[0].mutationResults[0].key;
      });
  }
};

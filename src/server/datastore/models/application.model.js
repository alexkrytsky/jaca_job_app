const gstore = require('gstore-node')();

const { Schema } = gstore;

const applicationSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  generalInfo: {
    type: Object,
  },
  employmentDesired: {
    type: Object,
  },
  education: {
    type: Object,
  },
  specialSkills: {
    type: Object,
  },
  employmentHistory: {
    type: Object,
  },
  references: {
    type: Object,
  },
  voluntarySurvey: {
    type: Object,
  },
  files: {
    type: Array,
  },
  created: {
    type: Date,
    default: gstore.defaultValues.NOW
  }
});

applicationSchema.queries('list');

module.exports = gstore.model('Application', applicationSchema);

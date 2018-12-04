const gstore = require('gstore-node')();

const { Schema } = gstore;

const jobSchema = new Schema({
  job: {
    type: String,
    required: true
  },
});

jobSchema.queries('list');

module.exports = gstore.model('Job', jobSchema);

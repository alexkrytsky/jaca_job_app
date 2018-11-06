// Import the Google Cloud client Lib
const Datastore = require('@google-cloud/datastore');

const projectId = process.env.GOOGLE_CLOUD_PROJECT;

const store = new Datastore({
  projectId
});

module.exports = store;

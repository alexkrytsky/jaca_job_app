// Import the Google Cloud client Lib
const gstore = require('gstore-node')();
const Datastore = require('@google-cloud/datastore');
const { Storage } = require('@google-cloud/storage');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { ApplicationSession } = require('./session/ApplicationSession');
const Authentication = require('./routers/Authentication');
const Application = require('./routers/Application');


const projectId = process.env.GOOGLE_CLOUD_PROJECT;

const store = new Datastore({
  projectId
});

const storage = new Storage({
  projectId
});

gstore.connect(store);

const app = express();

app.set('trust proxy', 1);

app.use(session({
  secret: 'jaca-job-app-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env === 'production' }
}));

const jobs = [
  'Case Manager – Part-time',
  'Economic Stability Director',
  'Housing Supervisor',
  'Regional Long-Term Care Ombuds-King County',
  'WSC AmeriCorp Education and Employment Support Specialist'
];

// Log requests to the console
const logger = (req, res, next) => {
  const timeStamp = new Date();
  console.log(`[LOG] [${timeStamp.toLocaleTimeString()}] [${req.method}] [${req.originalUrl}]`);
  next();
};

// Create a session of one doesn't exist
const sessionManager = (req, res, next) => {
  const currentSession = req.session;
  if (!currentSession.app) {
    currentSession.app = new ApplicationSession();
  }
  // Handle different cases
  next();
};

// bundled files
app.use(sessionManager);
app.use(logger);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('dist'));

// Routers
app.use('/api/auth', Authentication);
app.use('/api/app', Application);

// API paths
app.get('/api/jobs', (req, res) => res.send({ jobs }));

// app.get('/api/identities', (req, res) => {
//   Identity.queryAll()
//     .then((list) => {
//       res.send(list);
//     });
// });
//
// app.get('/api/identities/:id', (req, res) => {
//   const key = Store.key(['Identity', Number.parseInt(req.params.id, 10)]);
//   console.log(key);
//   Identity.query(key)
//     .then((identity) => {
//       res.send(identity);
//     });
// });

// All other routes should redirect to index
app.get('/*', (req, res) => {
  const file = path.join(__dirname, '/../../dist/index.html');
  res.sendFile(file);
});

const PORT = process.env.PORT || 8080;

// Start the express listener
const server = app.listen(PORT, () => {
  const { port } = server.address();

  console.log(`Server listening on port ${port}...`);
});

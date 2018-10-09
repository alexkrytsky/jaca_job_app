const express = require('express');
const session = require('express-session');
const path = require('path');
const user = require('./user.js');
const { ApplicationSession } = require('./session/ApplicationSession');

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
app.use(express.static('dist'));

// API paths
app.get('/api/getUsername', (req, res) => res.send({ username: user.getUsername() }));
app.get('/api/jobs', (req, res) => res.send({ jobs }));

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

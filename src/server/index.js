const express = require('express');
const user = require('./user.js');

const app = express();

const jobs = [
  'Case Manager – Part-time',
  'Economic Stability Director',
  'Housing Supervisor',
  'Regional Long-Term Care Ombuds-King County',
  'WSC AmeriCorp Education and Employment Support Specialist'
];

// bundled files
app.use(express.static('dist'));

// API paths
app.get('/api/getUsername', (req, res) => res.send({ username: user.getUsername() }));
app.get('/api/jobs', (req, res) => res.send({jobs}));

// 404
app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// Start the express listener
app.listen(8080, () => console.log('Listening on port 8080!'));

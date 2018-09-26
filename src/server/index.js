const express = require('express');
const user = require('./user.js');

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: user.getUsername() }));
app.listen(8080, () => console.log('Listening on port 8080!'));

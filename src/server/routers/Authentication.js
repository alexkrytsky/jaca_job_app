const router = require('express')
  .Router();

router.get('/status', (req, res) => {
  const { session } = req;

  res.send({ loggedIn: session.loggedIn });
});

const HARDCODED_EMAIL = 'test@test.com';
const HARDCODED_PASS = 'testTEST1!';

router.post('/login', (req, res) => {
  // HARD CODED EMAIL AND PASSWORD
  const { email, password } = req.body;

  if (email === HARDCODED_EMAIL && password === HARDCODED_PASS) {
    const { session } = req;
    session.loggedIn = true;
    session.email = email;
    res.send({ status: 'success' });
  } else {
    res.send({ status: 'error' });
  }
});

router.post('/logout', (req, res) => {
  const { session } = req;
  session.loggedIn = false;
  session.email = '';
  res.send({ status: 'success' });
});

module.exports = router;

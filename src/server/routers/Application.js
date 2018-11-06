const router = require('express')
  .Router();
const Identity = require('../datastore/Kinds/Identity');

router.post('/submit', (req, res) => {
  const timeStamp = new Date();
  console.log(`[LOG] [${timeStamp.toLocaleTimeString()}] [Submission]`);

  const submission = new Identity(req.body);

  submission.save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

module.exports = router;

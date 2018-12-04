const router = require('express')
  .Router();
const gstore = require('gstore-node')();
const Job = require('../datastore/models/job.model');

router.get('/list', async (req, res) => {
  try {
    const jobs = await Job.list();
    res.send(jobs.entities);
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

router.post('/add', async (req, res) => {
  const { job } = req.body;

  try {
    // Create entity from received data
    const newJob = new Job({
      job
    });

    // Save the entity to datastore
    await newJob.save(null, { method: 'insert' });
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

router.post('/remove', async (req, res) => {
  try {
    const { job } = req.body;

    const data = await Job.findOne({ job });

    console.log(data);

    const result = await Job.delete(data.entityKey.id);

    if (result.success) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

module.exports = router;

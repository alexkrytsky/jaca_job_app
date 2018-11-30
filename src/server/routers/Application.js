const router = require('express')
  .Router();
const gstore = require('gstore-node')();
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const Application = require('../datastore/models/application.model');
const { generateSignedURL } = require('../storage/StorageHelper');
const { APP_BUCKET } = require('../config/CONSTANTS');

const upload = multer({ dest: 'uploads/' });

const projectId = process.env.GOOGLE_CLOUD_PROJECT;
const bucketName = 'msc-application-files';

const storage = new Storage({
  projectId
});

/**
 * Simple list of everything
 */
router.get('/list', async (req, res) => {
  const results = await Application.list();
  const list = results.entities.map(app => ({
    firstName: app.firstName,
    lastName: app.lastName,
    email: app.email,
    position: app.employmentDesired.employmentDesired,
    id: app.id,
    created: app.created
  }));
  console.log(list);
  res.send(list);
});

/**
 * Searchable list of everything
 */
router.get('/search', async (req, res) => {
  const results = await Application.list();
  const list = results.entities;
  console.log(list);
  res.send(list);
});

/**
 * Get app by id
 */
router.get('/id/:id', async (req, res) => {
  const app = await Application.get(Number.parseInt(req.params.id, 10));
  const plain = app.plain();
  console.log(plain);

  const files = [];

  for (let i = 0; i < plain.files.length; i += 1) {
    const promise = generateSignedURL(APP_BUCKET, plain.files[i]);
    files.push(promise);
    promise.then((url) => {
      plain.files[i] = url;
    });
  }

  await Promise.all(files);

  console.log(plain);

  res.send(plain);
});

/**
 * Application submission action
 */
router.post('/submit', upload.any(), async (req, res, next) => {
  const data = JSON.parse(req.body.data);
  const { files } = req;

  // Save App
  const application = new Application({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    generalInfo: data.generalInfo,
    employmentDesired: data.employmentDesired,
    education: data.education,
    specialSkills: data.specialSkills,
    employmentHistory: data.employmentHistory,
    references: data.references,
    voluntarySurvey: data.voluntarySurvey,
  });

  try {
    await application.save(null, { method: 'insert' });
    const appID = application.entityKey.id;
    console.log(appID);

    const updates = {
      files: [],
    };

    files.forEach(async (file) => {
      const path = `${appID}/${file.originalname}`;
      const uploadedFile = await storage.bucket(bucketName)
        .upload(file.path, {
          gzip: true,
          metadata: {
            contentType: file.mimetype,
            cacheControl: 'public, max-age=31536000',
          },
        });

      await storage
        .bucket(bucketName)
        .file(uploadedFile[0].name)
        .move(path);
    });

    updates.files = files.map(file => `${appID}/${file.originalname}`);

    await Application.update(appID, updates);
    res.sendStatus(200);
  } catch (ex) {
    console.error(ex);
    res.sendStatus(400);
  }
});

module.exports = router;

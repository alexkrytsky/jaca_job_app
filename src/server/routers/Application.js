const router = require('express')
  .Router();
const gstore = require('gstore-node')();
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const Application = require('../datastore/models/application.model');
const { generateSignedURL, moveFile } = require('../storage/StorageHelper');
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
  try {
    // Get all applications
    const results = await Application.list();
    // Reduce information to base fields
    const list = results.entities.map(app => ({
      firstName: app.firstName,
      lastName: app.lastName,
      email: app.email,
      position: app.employmentDesired.employmentDesired,
      id: app.id,
      created: app.created
    }));
    res.send(list);
  } catch (e) {
    res.sendStatus(400);
  }
});

/**
 * Searchable list of everything
 */
router.get('/search', async (req, res) => {
  try {
    // Get all applications
    const results = await Application.list();
    const list = results.entities;
    res.send(list);
  } catch (e) {
    res.sendStatus(400);
  }
});

/**
 * Get app by id
 */
router.get('/id/:id', async (req, res) => {
  try {
    // Get application by id
    const app = await Application.get(Number.parseInt(req.params.id, 10));

    // Get only the data fields back
    const plain = app.plain();

    // Convert filenames into public urls
    if (plain.files.length > 0) {
      const promiseCollector = [];
      for (let i = 0; i < plain.files.length; i += 1) {
        // Get signedURL as promise
        const promise = generateSignedURL(APP_BUCKET, plain.files[i]);

        // Add oncomplete action
        promise.then((url) => {
          plain.files[i] = url;
        });

        // Add to collector
        promiseCollector.push(promise);
      }

      // Wait until all urls are generated
      await Promise.all(promiseCollector);
    }

    res.send(plain);
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

router.post('/note', async (req, res) => {
  try {
    const {
      id,
      noteName,
      noteMessage,
      noteLabels
    } = req.body;

    const app = await Application.get(Number.parseInt(id, 10));
    const plain = app.plain();

    if (!('notes' in plain) || plain.notes === null) {
      plain.notes = [];
    }

    plain.notes.push({
      noteName,
      noteMessage,
      noteLabels,
      added: Date.now()
    });

    await Application.update(Number.parseInt(id, 10), plain);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

/**
 * Application submission action
 */
router.post('/submit', upload.any(), async (req, res, next) => {
  const data = JSON.parse(req.body.data);
  const { files } = req;

  try {
    // Create entity from received data
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
      files: [],
      notes: [],
    });

    // Save the entity to datastore
    await application.save(null, { method: 'insert' });
    // Get entity ID
    const appID = application.entityKey.id;

    if (files.length > 0) {
      // Prepare object to store filenames
      const updates = {
        files: [],
      };

      const promiseCollector = [];

      files.forEach(async (file) => {
        // Store in folder using appID under original filename
        const path = `${appID}/${file.originalname}`;
        // Upload file to bucket
        const uploadedFile = await storage.bucket(bucketName)
          .upload(file.path, {
            gzip: true,
            metadata: {
              contentType: file.mimetype,
              cacheControl: 'public, max-age=31536000',
            },
          });

        // Rename file to correct path
        const promise = await moveFile(bucketName, uploadedFile[0].name, path);
        promise.then(() => {
          updates.files.push(path);
        });
        promiseCollector.push(promise);
      });

      // Wait for renaming to complete
      await Promise.all(promiseCollector);

      // Update application with files
      await Application.update(appID, updates);
    }

    // Send success code
    res.sendStatus(200);
  } catch (ex) {
    console.error(ex);
    res.sendStatus(400);
  }
});

module.exports = router;

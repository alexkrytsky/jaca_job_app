/**
 * Create a temporary URL for download or viewing publicly.
 *
 * @param bucket {string} bucket to access file from.
 * @param fileName {string} file to generate url for.
 * @returns {Promise<string>} Returns the generated url.
 */
async function generateSignedURL(bucket, fileName) {
  const { Storage } = require('@google-cloud/storage');
  const { PROJECT_ID } = require('../config/CONSTANTS');

  const storage = new Storage({
    projectId: PROJECT_ID
  });

  const options = {
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60,
  };

  const [url] = await storage.bucket(bucket)
    .file(fileName)
    .getSignedUrl(options);

  console.log(`The signed url for ${fileName} is ${url}.`);

  return url;
}

/**
 * Get metadata for file
 * @param bucket {string} bucket to access file from.
 * @param fileName {string} file to get metadata from.
 * @returns {Promise<File>} metadata for file.
 */
async function getMetadata(bucket, fileName) {
  const { Storage } = require('@google-cloud/storage');
  const { PROJECT_ID } = require('../config/CONSTANTS');

  const storage = new Storage({
    projectId: PROJECT_ID
  });

  const [metadata] = await storage.bucket(bucket)
    .file(fileName)
    .getMetadata();

  console.log(`File: ${metadata.name}`);
  console.log(`Bucket: ${metadata.bucket}`);
  console.log(`Storage class: ${metadata.storageClass}`);
  console.log(`Self link: ${metadata.selfLink}`);
  console.log(`ID: ${metadata.id}`);
  console.log(`Size: ${metadata.size}`);
  console.log(`Updated: ${metadata.updated}`);
  console.log(`Generation: ${metadata.generation}`);
  console.log(`Metageneration: ${metadata.metageneration}`);
  console.log(`Etag: ${metadata.etag}`);
  console.log(`Owner: ${metadata.owner}`);
  console.log(`Component count: ${metadata.component_count}`);
  console.log(`Crc32c: ${metadata.crc32c}`);
  console.log(`md5Hash: ${metadata.md5Hash}`);
  console.log(`Cache-control: ${metadata.cacheControl}`);
  console.log(`Content-type: ${metadata.contentType}`);
  console.log(`Content-disposition: ${metadata.contentDisposition}`);
  console.log(`Content-encoding: ${metadata.contentEncoding}`);
  console.log(`Content-language: ${metadata.contentLanguage}`);
  console.log(`Media link: ${metadata.mediaLink}`);
  console.log(`KMS Key Name: ${metadata.kmsKeyName}`);
  console.log(`Temporary Hold: ${metadata.temporaryHold}`);
  console.log(`Event-based hold: ${metadata.eventBasedHold}`);
  console.log(`Effective Expiration Time: ${metadata.effectiveExpirationTime}`);
  console.log(`Metadata: ${metadata.metadata}`);

  return metadata;
}

/**
 * Move or rename a file.
 *
 * @param bucket {string} bucket to access file from.
 * @param fileName {string} file to be moved.
 * @param dest {string} destination fileName and location.
 * @returns {Promise<void>} No information is returned.
 */
async function moveFile(bucket, fileName, dest) {
  const { Storage } = require('@google-cloud/storage');
  const { PROJECT_ID } = require('../config/CONSTANTS');

  const storage = new Storage({
    projectId: PROJECT_ID
  });

  await storage.bucket(bucket)
    .file(fileName)
    .move(dest);

  console.log(`gs://${bucket}/${fileName} moved to gs://${bucket}/${dest}.`);
}

module.exports = {
  generateSignedURL,
  getMetadata,
  moveFile
};

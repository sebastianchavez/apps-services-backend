const CONSTANTS = require('./constants')

if (process.env.NODE_ENV === 'prod') {
  require('dotenv').config()
  console.log('Ambiente Produccion')
} else {
  console.log('Ambiente Desarrollo')
}

module.exports = {
    PORT: process.env.PORT || CONSTANTS.SERVER.PORT,
    DB: process.env.MONGODB_URI || CONSTANTS.SERVER.MONGODB_URI,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || CONSTANTS.SERVER.S3.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY || CONSTANTS.SERVER.S3.S3_SECRET_ACCESS_KEY,
    S3_BUCKET: process.env.S3_BUCKET || CONSTANTS.SERVER.S3.S3_BUCKET,
    S3_BUCKET_KEY: process.env.S3_BUCKET_KEY || CONSTANTS.SERVER.S3.S3_BUCKET_KEY,
    ACL: process.env.ACL || CONSTANTS.SERVER.S3.ACL,
    SECRET_TOKEN: process.env.SECRECT_TOKEN || CONSTANTS.SERVER.SECRECT_TOKEN,
  }
  
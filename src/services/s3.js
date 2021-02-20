const AWS = require('aws-sdk')
const CONSTANTS = require('../config/constants')
const s3Service = {}

AWS.config.update({
  accessKeyId: CONSTANTS.SERVER.S3.S3_ACCESS_KEY_ID,
  secretAccessKey: CONSTANTS.SERVER.S3.S3_SECRET_ACCESS_KEY
})

const params = {
  Bucket: CONSTANTS.SERVER.S3.S3_BUCKET,
  Key: '',
  ACL: 'public-read'
}

s3Service.getObject = async obj => {
  try {
    const s3 = new AWS.S3()
    params.Key = `${obj.path}${obj.image}`
    const response = await s3.listObjects(params)
    return response
  } catch (err) {
    return err
  }
}

s3Service.saveObject = (obj, callback) => {
  try {
    const s3 = new AWS.S3()
    const encodedDoc = obj.document
    const decodedDoc = Buffer.from(encodedDoc, 'base64')
    params.Body = decodedDoc
    params.Key = `${obj.path}${obj.name}`
    s3.upload(params).promise().then(res => {
      callback(null, res)
    }).catch(err => {
      callback(err)
    })
  } catch (err) {
    callback(err)
  }
}

s3Service.deleteObject = (obj, callback) => {
  try {
    const s3 = new AWS.S3()
    params.Key = `${obj.path}${obj.name}`
    delete params.Body
    delete params.ACL
    s3.deleteObject(params).promise().then(res => {
      callback(null, res)
    }).catch(err => {
      callback(err)
    })
  } catch (err) {
    callback(err)
  }
}

s3Service.saveImage = (obj, callback) => {
  try {
    const s3 = new AWS.S3()
    const encodedImage = obj.image
    const decodedImage = Buffer.from(encodedImage, 'base64')
    console.log(decodedImage)
    params.Body = decodedImage
    params.Key = `${obj.path}${obj.name}`
    s3.upload(params).promise().then(res => {
      callback(null, res)
    }).catch(err => {
      console.log('ERROR:', err)
      callback(err)
    })
  } catch (err) {
    callback(err)
  }
}

module.exports = s3Service

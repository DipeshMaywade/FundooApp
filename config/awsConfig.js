const aws = require('aws-sdk');
require('dotenv').config();

aws.config.update({
  secretAccessKey: process.env.SECRETACCESSKEY,
  accessKeyId: process.env.ACCESSKEYID,
  region: process.env.REGION,
});

const s3 = new aws.S3();
const sqs = new aws.SQS({ apiVersion: '2012-11-05' });

module.exports = { s3, sqs };

const _ = require('lodash');
const ffmpeg = require('ffmpeg');

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const APP_VIDEO_BUCKET_NAME = 'retailer-videos';
const APP_FACES_BUCKET_NAME = 'retailer-faces';
const APP_FRAMES_BUCKET_NAME = 'retailer-frames';

const BUCKET_MAX_KEYS = 100;

const awsServiceTest = () => {

  AWS.config.update({region:'us-west-2'});
  
  if (typeof Promise === 'undefined') {
    AWS.config.setPromisesDependency(require('bluebird'));
  }

  AWS.config.getCredentials((err) => {
    console.log("Check dev credential: ");
    if (err) {
      console.log(err.stack);
    } else {
      console.log("Access Key:", AWS.config.credentials.accessKeyId);
      console.log("Secret Access Key:", AWS.config.credentials.secretAccessKey);
      // console.log("Region:", AWS.config.region);
    }
  });

  // test s3 buckets
  s3.listBuckets((err, data) => {
    console.log("List All S3 buckets:");
    if (err) {
      console.log("Error", err);
    } else {
      console.log(data.Buckets);
    }
  });

  const bucketParams = {
    Bucket: APP_VIDEO_BUCKET_NAME, /* required */
    MaxKeys: BUCKET_MAX_KEYS
  };

  s3.listObjects(bucketParams, (err, data) => {
    console.log("List Objects in Video Bucket");
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

};

awsServiceTest();
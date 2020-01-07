const AWS = require('aws-sdk');

const path = require("path");
const PATH = path.resolve(__dirname, "../.env");
require('dotenv').config({ path: PATH });

const inspect = require('util').inspect;

const AWS_DEFAULT_REGION = 'us-west-2';
const APP_VIDEO_BUCKET_NAME = 'retailer-videos';
const APP_FACES_BUCKET_NAME = 'retailer-faces';
const APP_FRAMES_BUCKET_NAME = 'retailer-frames';
const APP_REK_SQS_NAME = 'Rekognition';

const APP_REK_DB_COLLECTION_ID = 'faces-db';
const APP_REK_TEMP_COLLECTION_ID = 'transition';

const BUCKET_MAX_KEYS = 1000;

const APP_ROLE_ARN = process.env.ROLE_ARN;
const APP_SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN;

if (!AWS.config.region) {
  AWS.config.update({region: AWS_DEFAULT_REGION});
}
const s3 = new AWS.S3();
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const rekognition = new AWS.Rekognition();

async function awsServiceStart(awsTask) {

  console.log(`\n\n\n\nSet default AWS service region: ${AWS_DEFAULT_REGION}`);  
  
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

  if (typeof Promise === 'undefined') {
    AWS.config.setPromisesDependency(require('bluebird'));
  }

  try {
    let p1 = rekognition.createCollection({CollectionId: APP_REK_TEMP_COLLECTION_ID}).promise();
    let p2 = rekognition.createCollection({CollectionId: APP_REK_DB_COLLECTION_ID}).promise();  
    let data = await Promise.all([p1, p2]);
    console.log(`Created Collection, Id: ${data}`);           // excutes when all promises resolved
    // console.log(`Created Collection, Id: ${data.CollectionArn}`);           // successful response
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);  // can only catch the 1st error in Promise.all
  }

  const bucketParams = {
    Bucket: APP_VIDEO_BUCKET_NAME,
    MaxKeys: BUCKET_MAX_KEYS
  };

  // promise implementation version
  s3ListBuckets = s3.listBuckets().promise();
  s3ListObjects = s3.listObjects(bucketParams).promise();

  await Promise.all([s3ListBuckets, s3ListObjects])
  .then((data) => {
    console.log("List All S3 buckets:");
    console.log(data[0].Buckets);
    console.log("List Objects in Video Bucket:");
    console.log(data[1]);
  })
  .catch((err) => console.log(err.stack));

  if(arguments.length > 1) {
    awsTask(); // call task passed in
  }

};

////////////////////////////////////////////////////////////////////////
// functions use SQS are below

const getRekSQSMessageUrl = (queName) => {
  return new Promise ((resolve, reject) => {
    sqs.getQueueUrl({ QueueName: queName }).promise()
    .then((data) => {
      resolve(data.QueueUrl); 
    }).catch(err => reject(`Failed to get SQS name: , ${err}`));
  });
}

async function deleteSQSHisMessages(queName) {

  let sqsFullUrl = await getRekSQSMessageUrl(queName);
  const params = {
    AttributeNames: ["All"],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["All"],
    QueueUrl: sqsFullUrl,
    VisibilityTimeout: 60,
    WaitTimeSeconds: 20     // test timeout
  };

  console.log('Checking history SQS messages...');
  
  let msgEntries = []; 
  let queryStop = false;

  try {
    while (queryStop === false) {
      await sqs.receiveMessage(params).promise().then((data) => {
        if(data.Messages) {
          
          console.log(`Found ${data.Messages.length} history messages in SQS`);           
          for(const msg of data.Messages) {
            msgEntries.push({ Id: msg.MessageId, ReceiptHandle: msg.ReceiptHandle});
          };

        } else {   
          console.log(`No more history messages found in SQS`);
          queryStop = true;
        } 
      }).catch((err) => queryStop = true);
    }
    if(msgEntries.length > 0) {
      //NOTE: the max number to do batch delete is 10
      const deleteParams = { Entries: msgEntries, QueueUrl: params.QueueUrl }
      sqs.deleteMessageBatch(deleteParams, (err) => {
        if (err) console.log(`Error when deleting SQS Message: ${err}`);
        else console.log(`Deleted ${deleteParams.Entries.length} history messages in SQS`); 
      }); 
    } else { console.log(`Code run without deleting!`) }
  } catch(error) { 
    console.log(`SQS History Msg Polling Error:`, error);
  };

}

// https://sqs.us-west-2.amazonaws.com/137668631249/Rekognition
async function getSQSMessageSuccess(queName, jobId) {

  let sqsFullUrl = await getRekSQSMessageUrl(queName);
  const params = {
    AttributeNames: ["SenderId"],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["All"],
    QueueUrl: sqsFullUrl,
    VisibilityTimeout: 60,
    WaitTimeSeconds: 20     // test timeout, max allowed value is 20
  };    

  let jobDone = false;  //
  try {
    while(jobDone === false) {
      await sqs.receiveMessage(params).promise().then((data) => {
        if(data.Messages) {
          for(const msg of data.Messages) {
            const msgContent = JSON.parse(JSON.parse(msg.Body).Message);
            if (msgContent.JobId === jobId) {
              if (msgContent.Status === 'SUCCEEDED') {
                console.log(`Get Rekognition JobStatus: ${msgContent.Status}! JobId: ${jobId}`);
                jobDone = true;
              } else {
                console.log(`Get Rekognition JobStatus: ${msgContent.Status}, continuing... JobId: ${jobId}`);
              }
            }
          } // end of for  
        } else {
          console.log(`Timeout, failed to get JobStatus msg in ${params.WaitTimeSeconds} seconds from SQS, try another time...`);
        }
      })
    }
  }
  catch(error) { 
    console.log("SQS New Task Status Msg Receive Error:", error); 
  };
  
  return jobDone;
}

module.exports = {
  AWS, s3, rekognition, 
  APP_VIDEO_BUCKET_NAME,
  APP_FACES_BUCKET_NAME,
  APP_FRAMES_BUCKET_NAME,
  APP_ROLE_ARN,
  APP_SNS_TOPIC_ARN,
  APP_REK_SQS_NAME,
  APP_REK_DB_COLLECTION_ID,
  APP_REK_TEMP_COLLECTION_ID,
  BUCKET_MAX_KEYS,
  awsServiceStart,
  deleteSQSHisMessages,
  getSQSMessageSuccess
}
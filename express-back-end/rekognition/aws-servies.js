const AWS = require('aws-sdk');
require('dotenv').config();
const inspect = require('util').inspect;

const AWS_DEFAULT_REGION = 'us-west-2';
const APP_VIDEO_BUCKET_NAME = 'retailer-videos';
const APP_FACES_BUCKET_NAME = 'retailer-faces';
const APP_FRAMES_BUCKET_NAME = 'retailer-frames';
const APP_REK_SQS_NAME = 'Rekognition';

const APP_REK_DB_COLLECTION_ID = 'faces-db';
const APP_REK_TEMP_COLLECTION_ID = 'transition';

const BUCKET_MAX_KEYS = 1000;

// NOTE: The following two lines cannot take effect when requiring them from other js files
// const APP_ROLE_ARN = process.env.ROLE_ARN;
// const APP_SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN;
const APP_ROLE_ARN = 'arn:aws:iam::137668631249:role/Rekognition_Final'
const APP_SNS_TOPIC_ARN ='arn:aws:sns:us-west-2:137668631249:AmazonRekognition-Final'

let sqsQueueUrl = null;   

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

  // rekognition.listCollections({}, (err, data) => {
  //   if(!data.CollectionIds.includes(APP_REK_TEMP_COLLECTION_ID)) {
  //     rekognition.createCollection({CollectionId: APP_REK_TEMP_COLLECTION_ID}, (err, data) => {    
  //       if (err) console.log(err, err.stack); // an error occurred
  //       else     console.log(`Created Collection, Id: ${data.CollectionArn}`);           // successful response
  //     });
  //   } else {
  //     console.log(`Already created CollecionId ${APP_REK_TEMP_COLLECTION_ID} for the App`);
  //   }
  // });

  try {
    let p1 = rekognition.createCollection({CollectionId: APP_REK_TEMP_COLLECTION_ID}).promise();
    let p2 = rekognition.createCollection({CollectionId: APP_REK_DB_COLLECTION_ID}).promise();  
    let data = await Promise.all([p1, p2]);
    console.log(`Created Collection, Id: ${data}`);           // excutes when all promises resolved
    // console.log(`Created Collection, Id: ${data.CollectionArn}`);           // successful response
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);  // can only catch the 1st error in Promise.all
  }

  sqs.getQueueUrl({ QueueName: APP_REK_SQS_NAME}).promise().then((data) => sqsQueueUrl = data.QueueUrl); 

  // test s3 buckets and objects (NOTE: async apis)
  // s3.listBuckets((err, data) => {
  //   console.log("List All S3 buckets:");
  //   if (err) {
  //     console.log("Error", err);
  //   } else {
  //     console.log(data.Buckets);
  //   }
  // });

  const bucketParams = {
    Bucket: APP_VIDEO_BUCKET_NAME,
    MaxKeys: BUCKET_MAX_KEYS
  };

  // s3.listObjects(bucketParams, (err, data) => {
  //   console.log("List Objects in Video Bucket:");
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log(data);           // successful response
  // });

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
  // console.log(`Pre-cretated SQS Queue Url is found: ${sqsFullUrl}`);   
  const params = {
    AttributeNames: ["SenderId"],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["All"],
    QueueUrl: sqsFullUrl,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 20     // test timeout
  };

  console.log('Checking history SQS messages...');
  await sqs.receiveMessage(params).promise().then((data) => {

    return new Promise ((resolve, reject) => {

      if(data.Messages) {
        
        console.log(`Found ${data.Messages.length} history messages in SQS`); 
      
        let msgEntries = []; 
        for(const msg of data.Messages) {
          msgEntries.push({ Id: msg.MessageId, ReceiptHandle: msg.ReceiptHandle});
        };
        const deleteParams = {
          Entries: msgEntries,
          QueueUrl: params.QueueUrl
        }
        sqs.deleteMessageBatch(deleteParams, (err) => {
          if (err) { reject(`Error when deleting SQS Message: ${err}`); }
          else { 
            console.log(`Deleted ${deleteParams.Entries.length} history messages in SQS`); 
            resolve('DELETED');
          }
        }); 

      } else {   
         resolve(`No history messages found in SQS`);
      } 
     });
  })
  // .then((deleteParams) => {
  // then() is used in caller js file
  // })
  .catch((err) => console.log(`Polling SQS messages:,`, err));

}

// https://sqs.us-west-2.amazonaws.com/137668631249/Rekognition
async function getSQSMessageSuccess(queName, jobId) {

  // quePromise = sqs.getQueueUrl({ QueueName: queName }).promise();  
  // quePromise.then((data) => {
  // console.log(`Found rekognition SQS QueueUrl: ${data.QueueUrl}`);   

    // let sqsQueueUrl = null;
    // await sqs.getQueueUrl({ QueueName: APP_REK_SQS_NAME}).promise().then((data) => sqsQueueUrl = data.QueueUrl); 
    let sqsFullUrl = await getRekSQSMessageUrl(queName);
    const params = {
      AttributeNames: ["SenderId"],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: ["All"],
      QueueUrl: sqsFullUrl,
      VisibilityTimeout: 20,
      WaitTimeSeconds: 20     // test timeout, max allowed value is 20
    };    

    let msgFound = false;
    await sqs.receiveMessage(params).promise().then((data) => {
      // return new Promise ((resovle, reject) => { 
        if(data.Messages) {
          for(const msg of data.Messages) {
            const msgContent = JSON.parse(JSON.parse(msg.Body).Message);
            if (msgContent.JobId === jobId) {
              if (msgContent.Status === 'SUCCEEDED') {
                console.log(`Rekognition JobStatus Query: ${msgContent.Status}! JobId: ${jobId}`);
                msgFound = true;
              } else {
                console.log(`Rekognition JobStatus Query: ${msgContent.Status}, continuing... JobId: ${jobId}`);
                msgFound = (async() => await getSQSMessageSuccess(queName, jobId))();
              }
            }
          } // end of for  
        } else {
          console.log(`Timeout, failed to get JobStatus msg in ${params.WaitTimeSeconds} seconds from SQS, try another time...`);
          msgFound = (async() => await getSQSMessageSuccess(queName, jobId))();
        }
      // }); // promise
    }).catch((err) => { 
      console.log("SQS Receive Error:", err); 
    });
    
    return msgFound;

  // });  
}

module.exports = {
  AWS, s3, rekognition, sqsQueueUrl,
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
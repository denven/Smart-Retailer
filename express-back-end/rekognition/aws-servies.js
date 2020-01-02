const AWS = require('aws-sdk');

const AWS_DEFAULT_REGION = 'us-west-2';
const APP_VIDEO_BUCKET_NAME = 'retailer-videos';
const APP_FACES_BUCKET_NAME = 'retailer-faces';
const APP_FRAMES_BUCKET_NAME = 'retailer-frames';
const APP_REK_SQS_NAME = 'Rekognition';
const BUCKET_MAX_KEYS = 100;

if (!AWS.config.region) {
  AWS.config.update({region: AWS_DEFAULT_REGION});
}
const s3 = new AWS.S3();
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const rekognition = new AWS.Rekognition();

async function awsServiceStart(awsTask) {

  console.log(`Set default AWS service region: ${AWS_DEFAULT_REGION}`);  
  
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

  sqs.getQueueUrl({ QueueName: queName }, (err, data) => {
    if (err) console.log("Failed to get SQS name: ", err);
    else { console.log(data.QueueUrl); return data.QueueUrl;}
  });
}

async function deleteSQSHisMessages(queName) {

  // const queue = sqs.getQueueUrl({ QueueName: queName }).promise();
  // queue.then((data) => {
  //   console.log(`A cretated SQS is found: ${data.QueueUrl}`);   
    const params = {
      AttributeNames: ["SenderId"],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: ["All"],
      QueueUrl: 'https://sqs.us-west-2.amazonaws.com/137668631249/Rekognition',
      VisibilityTimeout: 20,
      WaitTimeSeconds: 5     // test timeout
    };

    sqs.receiveMessage(params).promise()
    .then((data) => {
      if(data.Messages) {
        console.log(`Received ${data.Messages.length} messages`, data);        
        for(const msg of data.Messages) {
          const deleteParams = {
            QueueUrl: params.QueueUrl,
            ReceiptHandle: msg.ReceiptHandle
          };

          sqs.deleteMessage(deleteParams, (err, data) => {
            if (err) { console.log("Delete Error:", err); }
            else { console.log("History Message Deleted:", data); }
          });
        } 
      } else {
        console.log(`No message found in SQS: ${params.QueueUrl}`);        
      }  
    }).catch((err) => console.log(`Error in polling SQS message`));
  // }
  // .catch((err) => {
  //   console.log("Failed to get SQS name:", err)
  // });

}

// https://sqs.us-west-2.amazonaws.com/137668631249/Rekognition
async function getSQSMessageSuccess (queName, jobId) {

  quePromise = sqs.getQueueUrl({ QueueName: queName }).promise();  
  quePromise.then((data) => {
    console.log(`A cretated SQS is found: ${data.QueueUrl}`);   
    const params = {
      AttributeNames: ["SenderId"],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: ["All"],
      QueueUrl: data.QueueUrl,
      VisibilityTimeout: 20,
      WaitTimeSeconds: 20     // test timeout, max allowed value is 20
    };    

    // const msgPromise = sqs.receiveMessage(params).promise();
    return sqs.receiveMessage(params).promise();
  })
  .then((data) => {
    let jobFinished = false;
    if(data.Messages) {
        for(const msg of data.Messages) {
          const msgContent = JSON.parse(JSON.parse(msg.Body).Message);
          if ((msgContent.JobId === jobId) && (msgContent.Status === 'SUCCEEDED')) {
            jobFinished = true;
            console.log(`Rekognition Job Query result: ${msgContent.Status}! JobId: ${jobId}. `);
          }

          // const deleteParams = {
          //   QueueUrl: params.QueueUrl,
          //   ReceiptHandle: msg.ReceiptHandle
          // };    
          // sqs.deleteMessage(deleteParams, (err, data) => {
          //   if (err) { console.log("Delete Error:", err); }
          //   else { console.log("Message Deleted:", data); }
          // });
        } // end of for           
    } else {
      console.log(`Timeout to get SQS messages, tried ${params.WaitTimeSeconds} seconds!`);
    }   
    console.log("I returned here", jobFinished);
    return jobFinished; 
  })
  .catch((err) => { 
    console.log("SQS Receive Error:", err); 
    return false;
  });
  
  console.log("I returned in the end");
}

module.exports = {
  AWS, s3, rekognition,
  APP_VIDEO_BUCKET_NAME,
  APP_FACES_BUCKET_NAME,
  APP_FRAMES_BUCKET_NAME,
  APP_REK_SQS_NAME,
  awsServiceStart,
  deleteSQSHisMessages,
  getSQSMessageSuccess
}
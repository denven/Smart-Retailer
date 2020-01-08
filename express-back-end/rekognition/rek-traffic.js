/** 
 * This module will use large memory and the analysis is time consuming
 * no faces collection needed when processing
 * test data: 16s duration video analysis needs 120s, 23s video needs 180s
 **/

const chalk = require('chalk');
const INFO = chalk.bold.green;
const ERROR = chalk.bold.red;
const WARN = chalk.keyword('orange');
const Chalk = console.log;

const { rekognition, APP_VIDEO_BUCKET_NAME, APP_ROLE_ARN, APP_SNS_TOPIC_ARN,
  APP_REK_SQS_NAME, deleteSQSHisMessages, getSQSMessageSuccess } = require('./aws-servies');

const startPersonTracking = (videoKey) => {

  return new Promise((resolve, reject) => {

    const params = {
      Video: { /* required */
        S3Object: { Bucket: APP_VIDEO_BUCKET_NAME, Name: videoKey }
      },
      // ClientRequestToken: "startFaceDetectionToken",
      JobTag: "startPersonTracking",
      NotificationChannel: {
        RoleArn: APP_ROLE_ARN,
        SNSTopicArn: APP_SNS_TOPIC_ARN
      }
    }

    rekognition.startPersonTracking(params, (err, task) => {
      if (err) reject(err, err.stack); // an error occurred
      else     resolve(task);           // successful response
    });
  });

};

// Note: There is no faceId in this returned data.
const getAllPersonsData = (trackData) => {
  
  let allPersonsData = [];  
  for (const item of trackData.Persons) {    
    let newItem = {
      "Timestamp": item.Timestamp,
      "Index": item.Person.Index
    };
    allPersonsData.push(newItem);
  }
  return allPersonsData;
}

const getPersonsInVideo = (allPersonsData) => {

  let allPersons = [];
  let oldIndex = -1;
  let person = {show_timestamp: '', leave_timestamp: '', index: '' };

  for (const item of allPersonsData) {

    if(item.Index !== oldIndex) { 
      if(oldIndex >= 0) {
        let newObj = JSON.parse(JSON.stringify(person));
        allPersons.push(newObj);  //record a person
      }
      oldIndex = item.Index;
      person.show_timestamp = item.Timestamp;
      person.leave_timestamp = item.Timestamp;
      person.index = item.Index;
      
    } else {
      person.leave_timestamp = item.Timestamp;
    }
  }

  allPersons.push(person); //last person
  console.log(allPersons);
  return allPersons;

};


async function getPersonsTracking (jobId, videoKey) {

  let nextToken = '';
  let allPersonsData = [];

  do { 
    const params = { JobId: jobId, MaxResults: 1000, NextToken: nextToken, SortBy: "INDEX"};
    let data = await rekognition.getPersonTracking(params).promise();
    
    let curReqData = getAllPersonsData(data);
    allPersonsData.push.apply(allPersonsData, curReqData);
    nextToken = data.NextToken || '';

  } while (nextToken);

  console.log(allPersonsData.length);
  let persons = getPersonsInVideo(allPersonsData);
  Chalk(INFO(`Found ${persons.length} persons by tracking motions in video ${videoKey}`));

  return persons;

}

async function startTrackingAnalysis (videoKey) {
 
  try {

    await deleteSQSHisMessages(APP_REK_SQS_NAME);
    let task = await startPersonTracking(videoKey);
    Chalk(INFO(`Starts Job: Person Tracking, JobId: ${task.JobId}`));   

    let status = await getSQSMessageSuccess(APP_REK_SQS_NAME, task.JobId);
    console.log(`Job ${status ? 'SUCCEEDED' : 'NOT_DONE'} from SQS query: ${status}`);
    
    let allTrackedPersons = getPersonsTracking(task.JobId, videoKey);

    return allTrackedPersons;

  } catch(error) {
    Chalk(ERROR(`Failed to track persons in video ${videoKey}:`, err.stack));
  }

};


module.exports = { startTrackingAnalysis }

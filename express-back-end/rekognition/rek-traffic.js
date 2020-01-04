// This module will use large memory
const _ = require('lodash');

const {AWS, s3, rekognition, 
  APP_VIDEO_BUCKET_NAME, APP_FACES_BUCKET_NAME, APP_FRAMES_BUCKET_NAME, APP_REK_SQS_NAME,
  APP_REK_COLLECTION_ID, BUCKET_MAX_KEYS,  APP_ROLE_ARN, APP_SNS_TOPIC_ARN,
  awsServiceStart, deleteSQSHisMessages, getSQSMessageSuccess } = require('./aws-servies');

const video = require('../filemanager/videos');

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
const getPersonsInVideo = (trackData) => {
  
  let allPersonsData = [];  
  for (const item of trackData.Persons) {    
    let newItem = {
      "Timestamp": item.Timestamp,
      "Index": item.Person.Index
    };
    allPersonsData.push(newItem);
  }

  let person = {show_timestamp: '', leave_timestamp: '', index: '' };
  let allPersons = [];
  let oldIndex = -1;
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
  return allPersons;

};

const s3_video_key = 'sample-3.mp4';
const video_local_path = '/home/chengwen/lighthouse/final/Demo/Videos/sample-.mp4';

const startPersonTrackingAnalysis = (s3_video_key) => {
  
  deleteSQSHisMessages(APP_REK_SQS_NAME).then( () => { 
    
    // start a new task when SQS is empty
    startPersonTracking(s3_video_key).then((task) => {

      // TODO: when total number of faces > 1000 for the long duration videos
      console.log(`StartPersonTracking..., JobId: ${task.JobId}`);   
      getSQSMessageSuccess(APP_REK_SQS_NAME, task.JobId).then((status) => {

        const params = { JobId: task.JobId, MaxResults: 1000, NextToken: "", SortBy: "INDEX"};  // by PERSON INDEX
        rekognition.getPersonTracking(params, (err, trackData) => {
          if (!err) {
            console.log(trackData);
            let persons = getPersonsInVideo(trackData);
            console.log(`There are ${persons.length} persons in video ${s3_video_key}`);
          } else {
            console.log(err, err.stack);
          }
        });

      });
    }).catch((err) => console.log("Failed to track persons from video on S3:", err.stack));
  });

};

// call this function when click 
startPersonTrackingAnalysis(s3_video_key);


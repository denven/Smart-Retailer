// This module will use large memory
const {AWS, s3, rekognition, 
  APP_VIDEO_BUCKET_NAME, APP_FACES_BUCKET_NAME, APP_FRAMES_BUCKET_NAME, APP_REK_SQS_NAME,
  APP_REK_COLLECTION_ID, BUCKET_MAX_KEYS,  APP_ROLE_ARN, APP_SNS_TOPIC_ARN,
  awsServiceStart, deleteSQSHisMessages, getSQSMessageSuccess } = require('./aws-servies');

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
  return allPersons;

};

const getVideoTraffic = (persons) => {

  return persons.map((person, index) => {
    return {
      timestamp: person.show_timestamp,
      count: ++index
    }
  });

}

const s3_video_key = 'sample-3.mp4';
const video_local_path = '/home/chengwen/lighthouse/final/Demo/Videos/sample-.mp4';

const getPersonsTracking = (jobId) => {

  let nextToken = '';
  do { 
    const params = { JobId: jobId, MaxResults: 1000, NextToken: nextToken, SortBy: "INDEX"};  // by PERSON INDEX
    rekognition.getPersonTracking(params, (err, trackData) => {
      if (!err) {
        let persons = getPersonsInVideo(trackData);
        console.log(`Found ${persons.length} persons in video ${s3_video_key}`);
        nextToken = trackData.NextToken || '';
      } else {
        console.log(err, err.stack);
      }
    });
  } while (nextToken);
}

const startPersonTrackingAnalysis = (s3_video_key) => {
  
  deleteSQSHisMessages(APP_REK_SQS_NAME).then( () => { 
    
    // start a new task when SQS is empty
    startPersonTracking(s3_video_key).then((task) => {

      console.log(`StartPersonTracking..., JobId: ${task.JobId}`);   
      getSQSMessageSuccess(APP_REK_SQS_NAME, task.JobId)
      .then(() => {
        let allPerons = getPersonsTracking(task.JobId);
        getVideoTraffic(allPerons);
      });

    }).catch((err) => console.log("Failed to track persons in video on S3:", err.stack));

  });

};

// test code
// startPersonTrackingAnalysis(s3_video_key);
// getPersonsTracking('15409357db4f5ec53f4d3d3722f4a41d849ab02b41f6d5280c8464e04c183b3a');

module.exports = {
  startPersonTrackingAnalysis
}

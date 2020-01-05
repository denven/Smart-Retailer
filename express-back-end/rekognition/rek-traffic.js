// This module will use large memory and the analysis is time consuming
// no faces collection needed when processing
// test data: 16s duration video analysis needs 120s, 23s video needs 180s

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
  return allPersons;

};

const s3_video_key = 'sample-1.mp4';
const video_local_path = '/home/chengwen/lighthouse/final/Demo/Videos/sample-.mp4';

const getPersonsTracking = (jobId) => {

  let nextToken = '';
  let allPersonsData = [];

  do { 
    const params = { JobId: jobId, MaxResults: 1000, NextToken: nextToken, SortBy: "INDEX"};
    rekognition.getPersonTracking(params, (err, trackData) => {
      if (!err) {
        let curReqData = getAllPersonsData(trackData);
        allPersonsData.push.apply(allPersonsData, curReqData);
        nextToken = trackData.NextToken || '';
      } else {
        console.log(err, err.stack);
      }
    });
  } while (nextToken);

  // althoug getPersonTracking is not an asynchronous function from aws docs, but it still 
  // takes much time to excute and the while may not be able to loop as it hits a empty 
  // nextToken before it's altered in the callback
  // use a timeout to excute the following codes, otherwise, we will get an empty allPersonsData
  // or change the loop into async/await or promise, or a recursion implementation version
  setTimeout(()=>{
    console.log(allPersonsData.length);
    let persons = getPersonsInVideo(allPersonsData);
    console.log(`Found ${persons.length} persons in video ${s3_video_key}`);
  }, 5000); 

}

const startPersonTrackingAnalysis = (s3_video_key) => {
  
  deleteSQSHisMessages(APP_REK_SQS_NAME).then( () => { 
    
    // start a new task when SQS is empty
    startPersonTracking(s3_video_key).then((task) => {

      console.log(`StartPersonTracking... for video ${s3_video_key}, JobId: ${task.JobId}`);   
      getSQSMessageSuccess(APP_REK_SQS_NAME, task.JobId)
      .then((status) => {
        console.log(status);
        let allPerons = getPersonsTracking(task.JobId);
        // getVideoTraffic(allPerons);  //TODO:
      });

    }).catch((err) => console.log("Failed to track persons in video on S3:", err.stack));

  });

};

// test code
// startPersonTrackingAnalysis(s3_video_key);
// getPersonsTracking('ed96bc196e712dbe28df2cc6d87a2739c369165d3a52e9c86f68c4db20360e82');

module.exports = {
  startPersonTrackingAnalysis
}

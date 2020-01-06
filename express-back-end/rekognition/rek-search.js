/*
 * By searching faces in collection(We need 2 collections)
 * 1. by comparing selve's faces collection to get uniq faces detail data
 *   delete/empty the indexes in collection before analyzing new video/after one video is analyzed
 * 2. by comparing existed faces collection to get recurred faces for new video 
 * adding new faces into existed collection for future recuring analysis
 **/

const _ = require('lodash');

const {rekognition,
  APP_VIDEO_BUCKET_NAME, APP_FACES_BUCKET_NAME, APP_REK_SQS_NAME,
  APP_REK_DB_COLLECTION_ID, APP_REK_TEMP_COLLECTION_ID, APP_ROLE_ARN, APP_SNS_TOPIC_ARN,
  deleteSQSHisMessages, getSQSMessageSuccess } = require('./aws-servies');

const startFaceSearch = (videoKey, collectionId) => {
  
  return new Promise((resolve, reject) => {

    const params = {
      Video: { /* required */
        S3Object: { Bucket: APP_VIDEO_BUCKET_NAME, Name: videoKey }
      },
      // ClientRequestToken: "startFaceDetectionToken",
      // FaceAttributes: "ALL",  // not supported for this API
      CollectionId: collectionId,
      FaceMatchThreshold: 98,
      JobTag: "startFaceSearch",
      NotificationChannel: {
        RoleArn: APP_ROLE_ARN, 
        SNSTopicArn: APP_SNS_TOPIC_ARN
      }
    }

    rekognition.startFaceSearch(params, (err, task) => {
      if (err) reject(err, err.stack); // an error occurred
      else     resolve(task);           // successful response
    });
  });

};

// Emotions Values: 8 types (except "Unknown")
// HAPPY | SAD | ANGRY | CONFUSED | DISGUSTED | SURPRISED | CALM | UNKNOWN | FEAR

// Pick 1 face data for each person, no dulplicate faces
const getDistinctPersonsInVideo = (data) => {
  
  let oldIndex = -1;
  let allPersons = [];  
  let person = {};

  console.log(`Get ${data.Persons.length} faces data by searchFaces in collection`)
  for (const item of data.Persons) {   
    
    if(item.Person.Index !== oldIndex) { 
      if(oldIndex >= 0) {
        let newObj = JSON.parse(JSON.stringify(person));
        allPersons.push(newObj);  //record a person
      }
      oldIndex = item.Person.Index;
      person = {
        "Timestamp": item.Timestamp,
        "Index": item.Person.Index,
        "BoundingBox": item.Person.Face.BoundingBox,
        "Confidence": item.Person.Face.Confidence,
        "ExternalImageId": item.FaceMatches[0].Face.ExternalImageId,
        "FaceId": item.FaceMatches[0].Face.FaceId,
        "ImageId": item.FaceMatches[0].Face.ImageId
      };
    }
  }

  allPersons.push(person); //last person
  return allPersons;

};

// Get persons from multiple videos as recurred customers
// Identify recurring people by finding externalImageIds which contains different video info
// Return the video-frame-time of the former visits
// const getRecurringPersonsIndex = (data) => {

//   return {
//     Index: 
//   }
// }


// when job is succedded in sqs, call this function
async function getFaceSearch (jobId, type) {
    
  let nextToken = '';
  let persons = [];

  do { 
    const params = { JobId: jobId, MaxResults: 1000, NextToken: nextToken, SortBy: "INDEX" };  // by PERSON INDEX
    let data = await rekognition.getFaceSearch(params).promise();

    if (type === 'NEW_SEARCH') {
      persons = getDistinctPersonsInVideo(data);  // data or persons should be concated when loop twiece or more
      console.log(`Recognized ${persons.length} persons in video ${s3_video_key}`);
    }
  
    // TODO: 
    // if (type === 'RECUR_SEARCH') {
    //   persons = getRecurringPersonsInVideo(data);
    //   console.log(`Recognized ${persons.length} recurring persons in video ${s3_video_key}`);
    // }
  
    nextToken = data.NextToken || '';

  } while (nextToken);
 
  // console.log(`getFaceSearch in rek-search`, persons);
  return persons;

}

// entry function for call api startFaceSearch
async function getPersonUniqFace (videoKey, collectionId, type) {

  await deleteSQSHisMessages(APP_REK_SQS_NAME);

  let task = await startFaceSearch(videoKey, collectionId);
  console.log(`StartFaceSearch..., JobId: ${task.JobId}`);   

  let status = await getSQSMessageSuccess(APP_REK_SQS_NAME, task.JobId);
  console.log(`Job ${status ? 'SUCCEEDED' : 'NOT_DONE'} from SQS query`);
  
  let persons = await getFaceSearch(task.JobId, type); // this is async 

  return persons;  

};


const s3_video_key = 'sample-1.mp4';
// call this function when click 

// getUniqFaceDetails(s3_video_key, APP_REK_TEMP_COLLECTION_ID);
// getFaceSearch('aba023ce3b8f0a20159273908708be5fc350f65aed2ecf2e2c370ae51a29d1a9');


module.exports = { getPersonUniqFace };
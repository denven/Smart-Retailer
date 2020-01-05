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
      FaceMatchThreshold: 90,
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

// Note: There is no faceId in this returned data.
const getFacesDetails = (faceData) => {

  // All attributes of faces are below, we only care about demographic realted ones
  // "Face": { "Confidence", "Eyeglasses", "Sunglasses", "Gender", "Landmarks",
  //           "Pose", "Emotions", "AgeRange", "EyesOpen", "BoundingBox", "Smile",
  //           "MouthOpen", "Quality", "Mustache", "Beard" }
  
  let facesDetails = [];

  for (const face of faceData.Faces) {
    let newFace = {
      "Timestamp": face.Timestamp,
      "Face": _.pick(face.Face, "Confidence", "Gender", "Emotions", "AgeRange", "BoundingBox", "Smile")
    };
    facesDetails.push(newFace);
  }
  return facesDetails;
};

// Emotions Values: 8 types (except "Unknown")
// HAPPY | SAD | ANGRY | CONFUSED | DISGUSTED | SURPRISED | CALM | UNKNOWN | FEAR

const s3_video_key = 'sample-1.mp4';
const video_path = '/home/chengwen/lighthouse/final/Demo/Videos/sample-1.mp4';

const getPersonsInVideo = (data) => {
  
  let oldIndex = -1;
  let allPersons = [];  
  let person = {};

  console.log(`Get ${data.Persons.length} faces data`)
  for (const item of data.Persons) {   
    
    if(item.Person.Index !== oldIndex) { 
      console.log(item.Person.Index);

      if(oldIndex >= 0) {
        let newObj = JSON.parse(JSON.stringify(person));
        allPersons.push(newObj);  //record a person
      }
      oldIndex = item.Person.Index;
      person = {
        "Timestamp": item.Timestamp,
        "Index": item.Person.Index,
        "BoundingBox": item.Person.Face.BoundingBox,
        "Confidence": item.Person.Face.Confidence
      };
    }
  }

  allPersons.push(person); //last person
  console.log(allPersons);
  return allPersons;

};

// when job is succedded in sqs, call this function
const getFaceSearch = (jobId) => {

  return new Promise((resolve, reject) => {
    
    let nextToken = '';
    let persons = [];

    // do { 
      const params = { JobId: jobId, MaxResults: 1000, NextToken: nextToken, SortBy: "INDEX" };  // by PERSON INDEX
      rekognition.getFaceSearch(params, (err, data) => {  
        if(!err) {
          persons = getPersonsInVideo(data);
          console.log(`Recognized ${persons.length} persons in video ${s3_video_key}`);
          nextToken = data.NextToken || '';
          resolve(persons);
        } else {
          reject(err);
        }
      });
    // } while (nextToken);
  });
  // console.log(`getFaceSearch in rek-search`, persons);
  // return persons;

}

// entry function for call api startFaceSearch
async function getUniqFaceDetails (videoKey, collectionId) {
   
  deleteSQSHisMessages(APP_REK_SQS_NAME)
  .then( () => { return startFaceSearch(videoKey, collectionId); })
  .then((task) => {
    console.log(`StartFaceSearch..., JobId: ${task.JobId}`);   
    getSQSMessageSuccess(APP_REK_SQS_NAME, task.JobId).then((status) => {
      console.log(`Job ${status ? 'SUCCEEDED' : 'NOT_DONE'} from SQS query`);
      return getFaceSearch(task.JobId); // this is async 
    }).then((data) => console.log(data));
  })
  .catch((err) => console.log("Failed to track persons in video on S3:", err.stack));

  // deleteSQSHisMessages(APP_REK_SQS_NAME).then( () => { 
  //   // start a new task when SQS is empty
  //   startFaceSearch(videoKey, collectionId).then((task) => {

  //     console.log(`StartFaceSearch..., JobId: ${task.JobId}`);   
  //     getSQSMessageSuccess(APP_REK_SQS_NAME, task.JobId).then((status) => {
  //       console.log(`Job ${status ? 'SUCCEEDED' : 'NOT_DONE'} from SQS query`);
  //       let allPerons = (async () => await getFaceSearch(task.JobId))();  // this is async
  //       console.log('all perosns in rek-search module:', allPerons);

  //       return allPerons;
  //     });

  //   }).catch((err) => console.log("Failed to track persons in video on S3:", err.stack));

  // });
};

// call this function when click 

// getUniqFaceDetails(s3_video_key, APP_REK_TEMP_COLLECTION_ID);
// getFaceSearch('aba023ce3b8f0a20159273908708be5fc350f65aed2ecf2e2c370ae51a29d1a9');

module.exports = { getUniqFaceDetails };
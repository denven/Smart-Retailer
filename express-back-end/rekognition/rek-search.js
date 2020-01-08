/*
 * By searching faces in collection(We need 2 collections)
 * 1. by comparing selve's faces collection to get uniq faces detail data
 *    delete/empty the indexes in collection before analyzing new video/after one video is analyzed
 * 2. by comparing existed faces collection to get recurred faces for new video 
 * adding new faces into existed collection for future recuring analysis
 **/

const _ = require('lodash');

const chalk = require('chalk');
const INFO = chalk.bold.green;
const ERROR = chalk.bold.red;
const WARN = chalk.keyword('orange');
const Chalk = console.log;

const { rekognition, APP_VIDEO_BUCKET_NAME, APP_REK_SQS_NAME, APP_ROLE_ARN, APP_SNS_TOPIC_ARN,
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

// Pick 1 face data for each person, no dulplicate faces
const getDistinctPersonsInVideo = (data) => {
  
  let oldIndex = -1;
  let person = {};
  let allPersons = []; 

  console.log(`Get ${data.Persons.length} faces data by searchFaces in collection`)
  for (const item of data.Persons) {   
    
    if(item.Person.Index !== oldIndex) { 
      if(oldIndex >= 0) {
        let newObj = JSON.parse(JSON.stringify(person)); //deep copy
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
const getDistinctPersonsVisitsData = (personsFaces, curVidName) => {

  let oldIndex = -1;
  let allPersons = [];  
  let person = {Index: '', Timestamp: '', HisVisits: []};

  console.log(`Search for recuring people from other videos`)
  for (const item of personsFaces.Persons) {   
    
    if(item.Person.Index !== oldIndex) { 

      if(oldIndex >= 0) {
        let newObj = JSON.parse(JSON.stringify(person));
        allPersons.push(newObj);  //record a person
        person = {};
      }
      oldIndex = item.Person.Index;
      person.Index = item.Person.Index;
      person.Timestamp = item.Timestamp;
      person.HisVisits = [];
    }

    // search for face's externalImageId containing info from other video
    // eg: VID_20200106_191924-00:00:03.469-1.png => VID_20200106_191924      
    for(const face of item.FaceMatches) {
      let faceSrcVideo = face.Face.ExternalImageId.slice(0, -19);
      let faceTimestamp = face.Face.ExternalImageId.slice(-18, -4);
      // console.log(person.Index, curVidName, faceSrcVideo, faceTimestamp);
      if ( faceSrcVideo !== curVidName ) {
        let visits = person.HisVisits.filter(item => { return (item.Vid === faceSrcVideo) });
        if (visits.length === 0) {
          person.HisVisits.push({ Vid: faceSrcVideo, Timestamp: faceTimestamp });
        }
        // console.log(person.Index, faceSrcVideo, curVidName, JSON.stringify(person.HisVisits));
      }
    }
  }

  allPersons.push(person); //last person
  return allPersons;
}


// when job succeeded in sqs, call this function
async function getFaceSearch (jobId, type, videoKey) {
    
  let nextToken = '';
  let persons = [];

  do { 
    const params = { JobId: jobId, MaxResults: 1000, NextToken: nextToken, SortBy: "INDEX" }; 
    let data = await rekognition.getFaceSearch(params).promise();

    //TODO: data needs to be concatanated when there are a serial fetches of getFaceSearch() 
    //TODO: called for a single JobId, this would happen when long duration videos are processed

    if (type === 'NEW_SEARCH') {
      persons = getDistinctPersonsInVideo(data);  // data or persons should be concated when loop twice or more
      Chalk(INFO(`Recognized ${persons.length} persons in video ${videoKey}`));
    }

    if (type === 'RECUR_SEARCH') {
      const vidNameOnly = videoKey.slice(0, -4);  //remove extension of filename
      persons = getDistinctPersonsVisitsData(data, vidNameOnly);
      let recurs = _.filter(persons, (person) => {return person.HisVisits.length > 0} )
      Chalk(INFO(`Recognized ${recurs.length} recurring from ${persons.length} persons in video ${videoKey}`));
      console.log(JSON.stringify(recurs));
    }
  
    nextToken = data.NextToken || '';

  } while (nextToken);
 
  return persons;

}

// entry function for call api startFaceSearch
async function searchPersonsByType (videoKey, collectionId, type) {

  await deleteSQSHisMessages(APP_REK_SQS_NAME);

  let task = await startFaceSearch(videoKey, collectionId);
  Chalk(INFO(`Starts Job: Face Search, JobId: ${task.JobId}`));   

  let status = await getSQSMessageSuccess(APP_REK_SQS_NAME, task.JobId);
  console.log(`Job ${status ? 'SUCCEEDED' : 'NOT_DONE'} from SQS query: ${status}`);
  
  let persons = await getFaceSearch(task.JobId, type, videoKey); // this is async 

  return persons;  

};


module.exports = { searchPersonsByType };
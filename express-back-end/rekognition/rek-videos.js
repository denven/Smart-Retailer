const _ = require('lodash');
const chalk = require('chalk');
const INFO = chalk.bold.green;
const ERROR = chalk.bold.red;
const HINT = chalk.keyword('orange');
const Chalk = console.log;

const { s3, rekognition,
  APP_VIDEO_BUCKET_NAME, APP_FACES_BUCKET_NAME, APP_REK_SQS_NAME,
  APP_REK_TEMP_COLLECTION_ID, APP_REK_DB_COLLECTION_ID, 
  BUCKET_MAX_KEYS, APP_ROLE_ARN, APP_SNS_TOPIC_ARN,
  deleteSQSHisMessages, queryJobStatusFromSQS, rebuildCollection, 
  addFacesIntoCollection } = require('./aws-servies');

const { getPersonDetailsFromVideo, getPersonRecuringAmongVideos } = require('./rek-search');
const { startTrackingAnalysis } = require('./rek-traffic');
const { cropFacesFromLocalVideo } = require('../filemanager/videos');

const startFaceDetection = (videoKey) => {

  return new Promise((resolve, reject) => {

    const params = {
      Video: { /* required */
        S3Object: { Bucket: APP_VIDEO_BUCKET_NAME, Name: videoKey }
      },
      // ClientRequestToken: "startFaceDetectionToken",
      FaceAttributes: "ALL",  // or "DEFAULT"
      JobTag: "startFaceDetection",
      NotificationChannel: {
        RoleArn: APP_ROLE_ARN, 
        SNSTopicArn: APP_SNS_TOPIC_ARN
      }
    }

    rekognition.startFaceDetection(params, (err, task) => {
      if (err) reject(err, err.stack); // an error occurred
      else     resolve(task);           // successful response
    });
  });

};

// Note: There is no faceId in this returned data.
// All attributes of faces are below, we only care about demographic realted ones
// "Face": { "Confidence", "Eyeglasses", "Sunglasses", "Gender", "Landmarks",
//           "Pose", "Emotions", "AgeRange", "EyesOpen", "BoundingBox", "Smile",
//           "MouthOpen", "Quality", "Mustache", "Beard" }
// Emotions Values: 8 types (except "Unknown")
// HAPPY | SAD | ANGRY | CONFUSED | DISGUSTED | SURPRISED | CALM | UNKNOWN | FEAR
const getFacesDetails = (faceData) => {
  
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

/**
 * Prepare faces by taking screenshots, cropping faces from screenshots, and then
 * call the Rekognition api to detect faces in the video.
 * @param {String} videoKey 
 */
async function startVideoPreAnalysis (videoKey) {
  
  console.time('Pre-Analysis Job');

  try {
    let task = await startFaceDetection(videoKey);

    // TODO: when total number of faces > 1000 for the long duration videos
    const params = { JobId: task.JobId, MaxResults: 1000};  
    Chalk(HINT(`Starts Job: Face Detection, JobId: ${task.JobId}`));   
          
    let status = await queryJobStatusFromSQS(APP_REK_SQS_NAME, task.JobId);  
    console.log(`Job ${status ? 'SUCCEEDED' : 'NOT_DONE'} from SQS query: ${status}`);

    let data = await rekognition.getFaceDetection(params).promise();

    let detailedFaces = getFacesDetails(data);  
    let copyDetailedFaces = _.cloneDeep(detailedFaces); // use more memory
    // let copyDetailedFaces = JSON.parse(JSON.stringify(detailedFaces));

    await cropFacesFromLocalVideo(copyDetailedFaces, videoKey); //comment when test
    await rebuildCollection(APP_REK_TEMP_COLLECTION_ID);
    await addFacesIntoCollection(APP_FACES_BUCKET_NAME, videoKey, APP_REK_TEMP_COLLECTION_ID);

    Chalk(INFO('Job Face Detection Analysis: Done!'));
    console.timeEnd('Pre-Analysis Job');

    return new Promise((resolve, reject) => {
      if(detailedFaces.length > 0) resolve(detailedFaces);
      else reject(`Error when pre-analyzing the video, ${videoKey}`);
    });

  } catch(error) {  
    Chalk(ERROR(`Job Face Detection: Failed to get face details video ${videoKey},`, error.stack));
  }
    
}

async function videoRekognitionMain (videoKey) {
 
  Chalk(HINT(`Initilization for Video Analysis: ${videoKey}`));
  await deleteSQSHisMessages(APP_REK_SQS_NAME);

  // This task takes too much time, let's start it at first
  startTrackingAnalysis(videoKey);

  // Step 1: Pre-Analyze the video(video/images process, file uploading, face detection) 
  // Traget: To get all faces with details in the video (cannot tell who they are here)
  let detailedFaces = await startVideoPreAnalysis(videoKey);

  // Step 2: Search faces in temporary collection to obtain uniq face for each person
  // Target: Get the demographic attributes for individuals in the video
  await getPersonDetailsFromVideo(videoKey, APP_REK_TEMP_COLLECTION_ID, detailedFaces);

  // Step 3: Search faces again in the db-collection to identify recuring people
  await getPersonRecuringAmongVideos(videoKey, APP_REK_DB_COLLECTION_ID);
 
};

// call this function when click 
// addImageIntoCollection(APP_FACES_BUCKET_NAME, APP_REK_TEMP_COLLECTION_ID);

//  const s3_video_key = 'sample-3.mp4';  // test video
// const s3_video_key = 'VID_20200106_191848.mp4';  // test video
// const s3_video_key = 'VID_20200106_191924.mp4';  // test video
// const s3_video_key = 'sample-0.mp4';  // test video
const s3_video_key = 'sample-1.mp4';  // test video
// const s3_video_key = 'sample-3.mp4';  // test video

videoRekognitionMain(s3_video_key);

module.exports = { videoRekognitionMain };
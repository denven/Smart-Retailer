const _ = require('lodash');

const {AWS, s3, rekognition,
  APP_VIDEO_BUCKET_NAME, APP_FACES_BUCKET_NAME, APP_FRAMES_BUCKET_NAME, APP_REK_SQS_NAME,
  awsServiceStart, deleteSQSHisMessages, getSQSMessageSuccess } = require('./aws-servies');

const video = require('../filemanager/videos');

const addImageIntoCollection = (bucketName, collectionId) => {

  const bucketParams = {
    Bucket: bucketName, /* required */
    MaxKeys: BUCKET_MAX_KEYS
  };
  
  s3.listObjects(bucketParams, (err, buckObjsData) => {

    console.log("Adding objects into index ....", bucketName);

    if (!err) {
      s3.listObjects(bucketParams, (err, buckObjsData) => {
        buckObjsData.Contents.forEach((frameObj) => {
        const params = {
          CollectionId: collectionId,
          DetectionAttributes: ["ALL"],
          Image: { S3Object: { Bucket: bucketName, Name: frameObj.Key } },
          MaxFaces: 10,
          QualityFilter: "AUTO"  // change to HIGH may be better
        };

        rekognition.indexFaces(params, (err, data) => {
          if (err) console.log(err); // an error occurred
          else console.log("Added frame into Index", frameObj.Key);           // successful response
        });
      });
    });
  } else {
      console.log(err, err.stack); // an error occurred
    }
  });

};

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
        RoleArn: 'arn:aws:iam::137668631249:role/Rekognition_Final', 
        SNSTopicArn: "arn:aws:sns:us-west-2:137668631249:AmazonRekognition-Final"
      }
    }

    rekognition.startFaceDetection(params, (err, faces) => {
      if (err) reject(err, err.stack); // an error occurred
      else     resolve(faces);           // successful response
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

// TODO: Extract pictures from video according to the Timestamp
// TODO: Crop faces from pictures according to BoundingBox positions

const s3_video_key = 'sample-1.mp4';
const video_path = '/home/chengwen/lighthouse/final/Demo/Videos/sample-1.mp4';

( async() => {
  // await awsServiceStart();
  deleteSQSHisMessages(APP_REK_SQS_NAME);  //delete history messages
  startFaceDetection(s3_video_key).then((faceData) => {

    // TODO: when total number of faces > 1000 for the long duration videos
    const params = { JobId: faceData.JobId, MaxResults: 1000};  
    console.log(`StartFaceDetection's JobId is: ${faceData.JobId}`);
    setTimeout ( () => {
      if (getSQSMessageSuccess(APP_REK_SQS_NAME, faceData.JobId)) {
        rekognition.getFaceDetection(params, (err, data) => {
          if (err) console.log(err, err.stack);
          else {
            let faces = getFacesDetails(data); 
            video.cropFacesFromLocalVideo(faces, video_path);  // generate faces from each frame
          }
        });
      } 
    }, 40000);
  })
  .catch((err) => console.log("Failed to detect faces from video on S3:", err.stack));
})();






// rekognition.compareFaces(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });
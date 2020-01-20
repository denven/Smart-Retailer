const _ = require('lodash');
const ffmpeg = require('ffmpeg');

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const APP_VIDEO_BUCKET_NAME = 'video-bucket';
const APP_FACES_BUCKET_NAME = 'faces';
const APP_FRAMES_BUCKET_NAME = 'frames';

const BUCKET_MAX_KEYS = 100;
// const videoBucket = APP_VIDEO_BUCKET_NAME;
// const imageBucket = APP_IMAGE_BUCKET_NAME;

// AWS services and account test functions

// test credential
AWS.config.update({region:'us-east-1'});
AWS.config.getCredentials((err) => {
  console.log("Check my credential:");
  if (err) {
    console.log(err.stack);
  } else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});

// test s3 buckets
s3.listBuckets((err, data) => {
  console.log("List S3 buckets:");
  if (err) {
    console.log("Error", err);
  } else {
    console.log(data.Buckets);
  }
});

// const bucketParams = {
//   Bucket: APP_VIDEO_BUCKET_NAME, /* required */
//   MaxKeys: BUCKET_MAX_KEYS
// };

// s3.listObjects(bucketParams, (err, data) => {
//   console.log("List Objects in Bucket");
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

const rekognition = new AWS.Rekognition();

const addFramesIntoCollection = (bucketName, collectionId) => {

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
          QualityFilter: "AUTO"
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

addFramesIntoCollection(APP_FRAMES_BUCKET_NAME, "frames");
addFramesIntoCollection(APP_FACES_BUCKET_NAME, "faces");

const getFacesFromVideo = (videoKey) => {

  return new Promise((resolve, reject) => {

    const params = {
      Video: { /* required */
        S3Object: { Bucket: APP_VIDEO_BUCKET_NAME, Name: videoKey }
      },
      ClientRequestToken: "startFaceDetectionToken",
      FaceAttributes: "ALL",  // or "DEFAULT"
      JobTag: "startFaceDetection"
    };

    rekognition.startFaceDetection(params, (err, data) => {
      if (err) reject(err, err.stack); // an error occurred
      else     resolve(data);           // successful response
    });
  });

};

const getDemographicFaceAttributes = (faceData) => {

  // All attributes of faces are below, we only care about demographic realted ones
  // "Face": { "Confidence", "Eyeglasses", "Sunglasses", "Gender", "Landmarks",
  //           "Pose", "Emotions", "AgeRange", "EyesOpen", "BoundingBox", "Smile",
  //           "MouthOpen", "Quality", "Mustache", "Beard" }
  
  let demographicFaces = [];

  for (const face of faceData.Faces) {
    let newFace = {
      "Timestamp": face.Timestamp,
      "Face": _.pick(face.Face, "Confidence", "Gender", "Emotions", "AgeRange", "BoundingBox", "Smile")
    };
    demographicFaces.push(newFace);
  }
  return demographicFaces;
};

// Emotions Values: 8 types (except "Unknown")
// HAPPY | SAD | ANGRY | CONFUSED | DISGUSTED | SURPRISED | CALM | UNKNOWN | FEAR


// TODO: Extract pictures from video according to the Timestamp
// TODO: Crop faces from pictures according to BoundingBox positions


const util = require('util');
const exec = util.promisify(require('child_process').exec);

// eslint-disable-next-line func-style
async function execFfmpegCmd(cmd) {
  try {
    const { stdout, stderr } = await exec(cmd);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (err) {
    console.error(err);
  }
}

const generateFaceImages = (faces) => {

  let oldtimestamp = -1;
  let sequence = 1;
  console.log("Test face array length:", faces.length);

  faces.forEach((face) => {
    let size = face.Face.BoundingBox;
    let vheight = 576;
    let vwidth = 720;

    size.Width = parseInt(size.Width * 1.25 *  vwidth);
    size.Left = parseInt(size.Left * vwidth);
    size.Top = parseInt(size.Top * 0.5  * vheight);
    size.Height = parseInt(size.Height * 1.75 * vheight);

    let newtimestamp = face.Timestamp;
    if (oldtimestamp !== newtimestamp) {
      const cmd = 'ffmpeg -i ./sample.mp4 -ss 00:00:' + (face.Timestamp / 1000) + ' -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame' + face.Timestamp + '.png ';
      execFfmpegCmd(cmd);
      oldtimestamp = newtimestamp;
      sequence = 1;
    }
    // const cmd = 'ffmpeg -i ./pictures/frame' + face.Timestamp + '.png -vf "crop=' + size.Width + ':' + size.Height + ':' + size.Left + ':' + size.Top +  '" ./faces/frame' + face.Timestamp + '' + sequence + '.png';
    // execFfmpegCmd(cmd);
    sequence++;
  });

};


// getFacesFromVideo("sample.mp4").then((faceData) => {

//   const params = { JobId: faceData.JobId, MaxResults: 1000};  // TODO: when total results > 1000 for long videos
//   console.log(`JobId is ${faceData.JobId}`);

//   rekognition.getFaceDetection(params, (err, data) => {
//     if (err) console.log(err, err.stack);
//     else {
//       let faces = getDemographicFaceAttributes(data);  // NOTE: Be careful when the return Job status is still IN_PROGRESS
//       generateFaceImages(faces);  // generate faces for each frame
//     }
//   });

// })
//   .catch((err) => console.log("Failed to get faces", err.stack));


// rekognition.compareFaces(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });
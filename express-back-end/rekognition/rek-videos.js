const _ = require('lodash');

const {AWS, s3, rekognition,
  APP_VIDEO_BUCKET_NAME, APP_FACES_BUCKET_NAME, APP_FRAMES_BUCKET_NAME, APP_REK_SQS_NAME,
  APP_REK_COLLECTION_ID, BUCKET_MAX_KEYS,
  awsServiceStart, deleteSQSHisMessages, getSQSMessageSuccess } = require('./aws-servies');

const video = require('../filemanager/videos');

const getBestMatchedFaceId = (matchedFaces) => {
  return matchedFaces[0].Face.FaceId; // save it into local database
}

const keepUniqFaceInCollection = (matchedFaces, collectionId) => {
  if(matchedFaces.length >= 2) {
    let delFaces = matchedFaces.map(item => item.Face.FaceId);
    delFaces.splice(0,1);
    console.log(`We will delete ${delFaces.length} faces in collection`);
    const params = { CollectionId: collectionId, FaceIds: delFaces};
    rekognition.deleteFaces(params, function(err, data) {
      if (err) console.log(`Error when deleting faces from collection ${err}`); // an error occurred
      else     console.log(data);           // successful response
    });
  }
}
 
const addImageIntoCollection = (bucketName, collectionId) => {

  const bucketParams = {
    Bucket: bucketName, /* required */
    MaxKeys: BUCKET_MAX_KEYS
  };
  
  s3.listObjects(bucketParams, (err, buckObjsData) => {

    console.log("Adding objects into index ....", bucketName);

    if (!err) {
      let deletedFaces = [];
      s3.listObjects(bucketParams, (err, buckObjsData) => {
        buckObjsData.Contents.forEach((faceImage, index) => {
        // faceImage = buckObjsData.Contents[1];
        const params = {
          CollectionId: collectionId,
          DetectionAttributes: ["ALL"],
          ExternalImageId: faceImage.Key,
          Image: { S3Object: { Bucket: bucketName, Name: faceImage.Key } },
          MaxFaces: 10,
          QualityFilter: "HIGH"  // change to HIGH may be better
        };

        const imgParams = {
          CollectionId: collectionId,
          FaceMatchThreshold: 98,
          Image: { S3Object: { Bucket: bucketName, Name: faceImage.Key } },
          MaxFaces: 100,
          QualityFilter: 'HIGH'
        }
// if (index < 1) 
{
        try {
          let facesInCollection = rekognition.describeCollection(collectionId);
          if (facesInCollection.FaceCount === 0) {
            rekognition.indexFaces(params, (err, data) => {
              if (err) console.log(`${faceImage.Key}: indexFaces, ${err}`); // an error occurred
              else console.log(`${faceImage.Key}: Added face into collection`);
            });
          } else {
            rekognition.searchFacesByImage(imgParams, (err, data) => {
              if (!err) {
                if (data.FaceMatches.length === 0) { 
                  rekognition.indexFaces(params, (err, data) => {
                    if (err) console.log(`${faceImage.Key}: indexFaces, ${err}`); // an error occurred
                    else console.log(`${faceImage.Key}: Added face into collection`);
                  });
                } else {
                  console.log(`${faceImage.Key}: Found ${data.FaceMatches.length} Matched Faces in collection!`);
                    if(data.FaceMatches.length >= 2) {
                      let newDelFaces = data.FaceMatches.map(item => item.Face.FaceId);
                      newDelFaces.splice(0,1);
                      deletedFaces.push.apply(deletedFaces, newDelFaces);
                    }

                  // (async() => keepUniqFaceInCollection(data.FaceMatches, collectionId))();
                  // console.log(`${faceImage.Key}: \n${JSON.stringify(data.FaceMatches)}`);
                }
              } else {
                if('InvalidParameterException' === err.name) {
                  console.log(`${faceImage.Key}: Bad quality Face image when searching in collection`); 
                } else {
                  console.log(`${faceImage.Key}: Error in SearchFacesByImage, ${err.name}`);
                }
              }
            });     
          }     
        } catch (error) {
          console.log(`${faceImage.Key}: Bad face quality, ${error}`); 
        }
}    
      });

      // deletedFaces = [...new Set(deletedFaces)];
      setTimeout( () => {
        deletedFaces = Array.from(new Set(deletedFaces));
        console.log(deletedFaces.length);
        const params = { CollectionId: collectionId, FaceIds: deletedFaces};
        rekognition.deleteFaces(params, function(err, data) {
          if (err) console.log(`Error when deleting faces from collection ${err}`); // an error occurred
          else     console.log(data);           // successful response
        });
      }, 5000);
    
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

const beforeVideoAnalysis = () => {
  // await awsServiceStart();
  deleteSQSHisMessages(APP_REK_SQS_NAME)  //;  //delete history messages
  .then( (prepared) => {

    startFaceDetection(s3_video_key).then((faceData) => {
      // TODO: when total number of faces > 1000 for the long duration videos
      const params = { JobId: faceData.JobId, MaxResults: 1000};  
      console.log(`StartFaceDetection..., JobId: ${faceData.JobId}`);      
      getSQSMessageSuccess(APP_REK_SQS_NAME, faceData.JobId).then((status) => {
        rekognition.getFaceDetection(params, (err, data) => {
          if (!err) {
            let faces = getFacesDetails(data); 
            video.cropFacesFromLocalVideo(faces, video_path);
          } else {
            console.log(err, err.stack);
          }
        });
      });
    }).catch((err) => console.log("Failed to detect faces from video on S3:", err.stack));
  });

};

// call this function when click 
// beforeVideoAnalysis();




addImageIntoCollection(APP_FACES_BUCKET_NAME, APP_REK_COLLECTION_ID);
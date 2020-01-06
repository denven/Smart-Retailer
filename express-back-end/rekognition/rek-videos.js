const _ = require('lodash');

const { s3, rekognition,
  APP_VIDEO_BUCKET_NAME, APP_FACES_BUCKET_NAME, APP_REK_SQS_NAME,
  APP_REK_TEMP_COLLECTION_ID, BUCKET_MAX_KEYS, APP_ROLE_ARN, APP_SNS_TOPIC_ARN,
  deleteSQSHisMessages, getSQSMessageSuccess } = require('./aws-servies');

const { getPersonUniqFace } = require('./rek-search');

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
 
 
//NOTE: This is the current solution by adding all faces into collection
//      Donot need to do the comparision before addint indexes
async function addFacesIntoCollection (bucketName, folder, collectionId) {

  const bucketParams = { 
    Bucket: bucketName,  /* required */
    Delimiter: '/',
    Prefix: folder + '/',  //your folder name
    MaxKeys: BUCKET_MAX_KEYS 
  };  

  console.log(`Adding faces(s3 image file objects) into collection ${collectionId} ....`);

  let buckObjs = await s3.listObjectsV2(bucketParams).promise();
  let faceImages = buckObjs.Contents;
  faceImages.splice(0, 1);

  let faceIndexPromises =faceImages.map((faceImage) => {
    const params = {
      CollectionId: collectionId,
      DetectionAttributes: ["ALL"],
      ExternalImageId: faceImage.Key.split('/').pop(),
      Image: { S3Object: { Bucket: bucketName, Name: faceImage.Key } },
      MaxFaces: 10,
      QualityFilter: "HIGH"  // change to HIGH may be better
    };

    return rekognition.indexFaces(params).promise();   
  });

  let addRetData = await Promise.all(faceIndexPromises);
  console.log(`Added ${addRetData.length} faces into collection \"${collectionId}\"`);
}

// NOTE: This is formaer solution which doesn't work
const addImageIntoCollection = (bucketName, collectionId) => {

  const bucketParams = {
    Bucket: bucketName, /* required */
    MaxKeys: BUCKET_MAX_KEYS
  };
  
  s3.listObjects(bucketParams, (err, buckObjsData) => {

    console.log("Adding objects into index ....", bucketName);

    if (!err) {
      let deletedFaces = [];
      let recognizedFaceIds = [];
      s3.listObjects(bucketParams, (err, buckObjsData) => {
        buckObjsData.Contents.forEach((faceImage, index) => {
        // faceImage = buckObjsData.Contents[1];
        // parameter used for addIndexes
        const params = {
          CollectionId: collectionId,
          DetectionAttributes: ["ALL"],
          ExternalImageId: faceImage.Key,
          Image: { S3Object: { Bucket: bucketName, Name: faceImage.Key } },
          MaxFaces: 10,
          QualityFilter: "HIGH"  // change to HIGH may be better
        };

        // parameter used for searching face
        const imgParams = {
          CollectionId: collectionId,
          FaceMatchThreshold: 98,
          Image: { S3Object: { Bucket: bucketName, Name: faceImage.Key } },
          MaxFaces: 100,
          QualityFilter: 'HIGH'
        }

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
                  recognizedFaceIds.push(data.FaceMatches[0]);  // add one

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


const getPersonWithDetails = (persons, faceDetails) => {

  let detailedPersons = [];
  console.log('Target faces for comparision in collection pool:', faceDetails.length);
  faceDetails.forEach((face) => {

    for(const person of persons) {
      if (_.isEqual(face.Face.BoundingBox, person.BoundingBox)) {
        detailedPersons.push( {
          Index: person.Index,
          Timestamp: person.Timestamp,
          Confidence: person.Confidence,
          Gender: face.Face.Gender.Value,
          AgeRange: face.Face.AgeRange,
          Smile: face.Face.Smile,
          Emotions: face.Face.Emotions          
        });
      }
    } // for

  });

  console.log(`Unique Persons Detailed Data:`, detailedPersons);
  return detailedPersons;
}

// Emotions Values: 8 types (except "Unknown")
// HAPPY | SAD | ANGRY | CONFUSED | DISGUSTED | SURPRISED | CALM | UNKNOWN | FEAR

const s3_video_key = 'sample-3.mp4';  // test video

async function videoPreAnalysis (videoKey) {

  console.log(`Video Pre-Analyzing: ${videoKey}`);
  await deleteSQSHisMessages(APP_REK_SQS_NAME);
  
  let task = await startFaceDetection(videoKey);

  // TODO: when total number of faces > 1000 for the long duration videos
  const params = { JobId: task.JobId, MaxResults: 1000};  
  console.log(`StartFaceDetection..., JobId: ${task.JobId}`);   
         
  let status = await getSQSMessageSuccess(APP_REK_SQS_NAME, task.JobId);  
  console.log(`Job Status: ${status}`);

  let data = await rekognition.getFaceDetection(params).promise();

  // Step 1: Get all faces extracted with detailed attributes
  let detailedFaces = getFacesDetails(data);  

  // let copyDetailedFaces = JSON.parse(JSON.stringify(detailedFaces));
  let copyDetailedFaces = _.cloneDeep(detailedFaces); // use more memory

  // Step 2: Add all faces into a collection for comparision
  await video.cropFacesFromLocalVideo(copyDetailedFaces, videoKey); //comment when test
  await addFacesIntoCollection(APP_FACES_BUCKET_NAME, videoKey, APP_REK_TEMP_COLLECTION_ID);
  
  // Step 3: Search faces and obtain a only uniq face for each person
  let persons = await getPersonUniqFace(videoKey, APP_REK_TEMP_COLLECTION_ID);

  // Step 4: Get the detailed demographic attributes for individuals
  let personsWithDetails = getPersonWithDetails(persons, detailedFaces);

  // Step 5: Write into database


  // Step 6: Cleanup

};

// call this function when click 
// addImageIntoCollection(APP_FACES_BUCKET_NAME, APP_REK_TEMP_COLLECTION_ID);

videoPreAnalysis(s3_video_key);

module.exports = { videoPreAnalysis };
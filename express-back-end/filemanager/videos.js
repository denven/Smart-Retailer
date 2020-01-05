const helper = require('../helpers/helpers');
const ffmpeg = require('fluent-ffmpeg');
const sharp = require('sharp');
const path = require('path');
const shell = require('shelljs');

const s3Client = require('./s3bucket');
const APP_FACES_BUCKET_NAME = 'retailer-faces';

//TODO: recieve file from front end and save to video path

// Create folders used for processing different type of files 
const prepareDataDirectories = () => {

  const userHome = require('os').homedir();
  __dirname = path.join(userHome, 'lighthouse', 'final', 'Demo');

  shell.mkdir('-p', path.join(__dirname, 'Videos'));
  shell.mkdir('-p', path.join(__dirname, 'Frames'));
  shell.mkdir('-p', path.join(__dirname, 'Faces'));
}

// Take screentshots for all the frames which is detected with faces
// and Save the frame images into a folder named by filename in 'Frames' folder
const takeScreenshots = (frames, videoFileName) => {

  let oldTimestamp = -1;
  let framesPromises = [];

  const frameImgPath = path.join(__dirname, 'Frames', videoFileName);
  const videoFullName = path.join(__dirname, 'Videos', videoFileName);
  shell.mkdir(frameImgPath);

  for(const frame of frames) {

    let newTimestamp = helper.msTohhmmssmmm(frame.Timestamp); 
    if (oldTimestamp !== newTimestamp) {  // take screenshot for different frames
      oldTimestamp = newTimestamp; 
      let promise = new Promise((resolve, reject) => {
        ffmpeg(videoFullName)
          .on('error', (err) => reject(err))
          .on('end', (data) => resolve(data))
          .screenshots({
              timestamps: [newTimestamp],
              filename: `frame-${newTimestamp}.png`,
              folder: frameImgPath,
              size: `1280x720`
          });
      });  // return promise
      framesPromises.push(promise);
    }
  };

  return framesPromises;
}

// Crop all the faces from different frames
// and save the images into a folder named by video filename in 'Faces' folder
const cropFacesFromScreenshots = (faces, videoFileName) => {

    let oldTimestamp = -1;
    let sequence = 0;   // No. of face detected in the frame starts from 1
    console.log(`how many faces will be cropped: ${faces.length}`);

    const faceImgPath = path.join(__dirname, 'Faces', videoFileName);
    const frameImgPath = path.join(__dirname, 'Frames', videoFileName);
    shell.mkdir(faceImgPath);

    return faces.map((frame) => {

      let size = helper.getFaceBoundary(frame.Face.BoundingBox);
      frame.Timestamp = helper.msTohhmmssmmm(frame.Timestamp); 

      let newTimestamp = frame.Timestamp;
      if (oldTimestamp !== newTimestamp) {  // same frame
        oldTimestamp = newTimestamp; 
        sequence = 0;  // reset
      }

      sequence++;  // count of face in one frame
      return new Promise((resolve, reject) => {
        sharp(`${frameImgPath}/frame-${newTimestamp}.png`)
          .extract({ width: size.Width, height: size.Height, left: size.Left, top: size.Top})
          .toFile(`${faceImgPath}/frame-${frame.Timestamp}-${sequence}.png`)
          .then(file => resolve(file))
          .catch(err => reject(err));
      })
    });
}

// As there are many async operations, we make this function to make it more synchronously!
// upload all the faces images into s3 buckets after the croping job is done 
// There are 3 frames per second on average from the test video, the number depends on movements in vides
async function cropFacesFromLocalVideo (allFrames, videoFileName) {

  prepareDataDirectories();
  Promise.all(takeScreenshots(allFrames, videoFileName))
  .then( (frames) => {
    console.log(`Extracted ${frames.length} frames from video ${videoFileName}`);
    return Promise.all(cropFacesFromScreenshots(allFrames, videoFileName))
  })
  .then((faces) => {
      console.log(`Cropped ${faces.length} faces from video ${videoFileName}, Done!`);
      const faceImgPath = path.join(__dirname, 'Faces', videoFileName);
      // let faces_bucket = s3Client.createFolderInBucket(videoFileName, APP_FACES_BUCKET_NAME);
      // setTimeout( () => {
      //   s3Client.uploadMultiFiles(faceImgPath, APP_FACES_BUCKET_NAME, videoFileName)
      //   .then((data) => console.log(`Uploaded ${data.length} face images to s3 successfully.`))
      //   .catch((err) => console.log(err));
      // }, 1000);
      return 'done!'
  })
  .catch(err => console.log(err.stack))
  .catch((err) => console.log(err));
}

// tests
// let faces = require('./allFaces.json');
// console.log(faces.Faces.length);
// console.time('New image crop');
// cropFacesFromLocalVideo(faces, 'sample-1.mp4');
// console.log('done');


module.exports = { cropFacesFromLocalVideo };
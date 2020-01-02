const helper = require('../helpers/helpers');
const ffmpeg = require('fluent-ffmpeg');
const sharp = require('sharp');
const path = require('path');
const shell = require('shelljs');

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
const takeScreenshots = (frames, videoFileName) => {

  let oldTimestamp = -1;
  let framesPromises = [];

  const frameImgPath = path.join(__dirname, 'Frames', '2019-12-30');
  shell.mkdir(frameImgPath);

  for(const frame of frames) {

    let newTimestamp = helper.msTohhmmssmmm(frame.Timestamp); 
    if (oldTimestamp !== newTimestamp) {  // take screenshot for different frames
      oldTimestamp = newTimestamp; 
      let promise = new Promise((resolve, reject) => {
        ffmpeg(videoFileName)
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
const cropFacesFromScreenshots = (faces, videoFileName) => {

    let oldTimestamp = -1;
    let sequence = 1;   // No. of face detected in the frame starts from 1
     
    const faceImgPath = path.join(__dirname, 'Faces', '2019-12-30');
    const frameImgPath = path.join(__dirname, 'Frames', '2019-12-30');
    shell.mkdir(faceImgPath);

    return faces.map((frame) => {

      let size = helper.getFaceBoundary(frame.Face.BoundingBox);
      frame.Timestamp = helper.msTohhmmssmmm(frame.Timestamp); 

      let newTimestamp = frame.Timestamp;
      if (oldTimestamp !== newTimestamp) {  // same frame
        oldTimestamp = newTimestamp; 
        sequence = 1;
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
const cropFacesFromLocalVideo = (faces, videoFileName) => {

  prepareDataDirectories();
  Promise.all(takeScreenshots(faces, videoFileName))
  .then( (frames) => {
    console.log(`Extracted ${frames.length} frames from video ${videoFileName}`);
    Promise.all(cropFacesFromScreenshots(faces, videoFileName))
    .then(data => {console.log(`Cropped ${data.length} faces from video ${videoFileName}: Done!`);})
    .catch(err => console.log(err.stack));
  })
  .catch((err) => console.log(err));
}

// tests
// let faces = require('./allFaces.json');
// console.log(faces.Faces.length);
// console.time('New image crop');
// cropFacesFromLocalVideo(faces, '/home/chengwen/lighthouse/final/Demo/Videos/sample-1.mp4');


module.exports = { cropFacesFromLocalVideo };
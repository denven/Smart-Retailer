// functions to process files in s3 buckets
const fs = require('fs');
const path = require('path');

// const AWS = require('aws-sdk');
// const s3Client = new AWS.S3();
const {s3} = require('../aws-servies');
const s3Client =s3;

// upload a file to s3
const uploadOneFile = (fileName, bucketName) => {

    // Read content from the file
    // const fileData = fs.readFileSync(fileName);
    const stream = fs.createReadStream(fileName);

    // Setting up upload parameters
    const params = {
        Bucket: bucketName,
        Key: fileName.split('/').pop(),  // key filename only by removing path
        Body: stream
    };

    // Uploading files to the bucket
    const s3UploadPromise = s3Client.upload(params).promise();    
    s3UploadPromise
    .then((data) => console.log(`File uploaded successfully. ${data.Location}`))
    .catch((err) => console.log(err));

    return s3UploadPromise;
};

// upload multiple files to s3
// this function is used to upload multiple cropped face images to s3
const uploadMultiFiles = (imagesPath, targetBucket) => {

  const fileNames = fs.readdirSync(imagesPath);
  console.log(fileNames);
  const files = fileNames.map((fileName) => {    
    return {
      key: fileName,
      stream: fs.createReadStream(path.join(imagesPath, fileName))
    };
  });
  
  return Promise.all( files.map((file) => {
      const params = {
        Bucket: targetBucket,
        Key: file.key,
        Body: file.stream
      };
      return s3Client.upload(params).promise();
    }));
}

// create one folder for each video file in the faces root bucket
const createFolderInBucket = (videoName, targetBucket) => {

  const bucketFolder = targetBucket + '/' + videoName;
  const params = {Bucket: targetBucket, Key: videoName + '/', ACL: 'public-read', Body: videoName};

  s3Client.upload(params).promise()
  .then((data) => console.log(`Successfully created a folder in ${data.Location} on S3`))
  .catch((err) => console.log(`Error creating the folder: ${err}`));

  return bucketFolder;
}

// TODO
// const deleteFacesBucket = (bucketName) => {
// }

// function test
let faces_bucket = createFolderInBucket('2019-12-29', "retailer-faces");
uploadOneFile('/home/chengwen/lighthouse/final/Demo/Videos/sample-1.mp4', "retailer-videos");
// uploadMultiFiles('/home/chengwen/lighthouse/final/Demo/Faces/2019-12-30', faces_bucket)
// .then((data) => console.log(`Files uploaded successfully.`))
// .catch((err) => console.log(err));

module.exports = {
  uploadOneFile,
  uploadMultiFiles,
  createFolderInBucket
}
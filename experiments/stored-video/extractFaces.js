const ffmpeg = require('ffmpeg');

// module.exports =
class VideoOperation {
  constructor() {
  }

  getVideoTotalDuration(path) {
    const process = new ffmpeg(path);
    return process.then((video) => {
      console.log(`Video duration is ${video.metadata.duration.seconds} seconds`);
      return video.metadata.duration.seconds || 0;
    }, (err) => {
      console.log('getVideoTotalDuration,err:' + err.message);
      return err;
    });
  }

  getVideoSceenshots(srcPath, dstPath, frameRate, frameCount) {
    const process = new ffmpeg(srcPath);
    return process.then((video) => {
      video.fnExtractFrameToJPG(dstPath, {
        "frame_rate" : frameRate,
        "number" : frameCount,
        "file_name" : 'my_frame_%t_%s'
        // start_time				: null		// Start time to recording
        // , duration_time			: null		// Duration of recording
        // , frame_rate				: null		// Number of the frames to capture in one second
        // , size					: null		// Dimension each frame
        // , number					: null		// Total frame to capture
        // , every_n_frames			: null		// Frame to capture every N frames
        // , every_n_seconds			: null		// Frame to capture every N seconds
        // , every_n_percentage		: null		// Frame to capture every N percentage range
        // , keep_pixel_aspect_ratio	: true		// Mantain the original pixel video aspect ratio
        // , keep_aspect_ratio		: true		// Mantain the original aspect ratio
        // , padding_color			: 'black'	// Padding color
        // , file_name

      }, (error, files) => {
        if (!error) console.log('Frames: ' + files);
      });
    }).catch((err) => console.log('Error: ' + err));
  }

}

ffmpeg('/path/to/video.avi')
  .screenshots({
    timestamps: [30.5, '50%', '01:10.123'],
    filename: 'thumbnail-at-%s-seconds.png',
    folder: '/path/to/output',
    size: '320x240'
  });


const main = async() => {
  const VideoOperationObj = new VideoOperation();
  const videoPath = './sample.mp4';
  const outputPath = './output/';
  
  const duration = await VideoOperationObj.getVideoTotalDuration(videoPath);
  console.log(duration);

  await VideoOperationObj.getVideoSceenshots(videoPath,outputPath,1,5);
};

main().then().catch(console.error);

// let faces = require('./output1.json');

// let oldtimestamp = -1;
// let sequence = 1;

// faces.Faces.forEach((element) => {
//   let size = element.Face.BoundingBox;
//   let vheight = 576;
//   let vwidth = 720;
//   size.Width = parseInt(size.Width * 1.25 *  vwidth);
//   size.Left = parseInt(size.Left * vwidth);
//   size.Top = parseInt(size.Top * 0.5  * vheight);
//   size.Height = parseInt(size.Height * 1.75 * vheight);

//   let newtimestamp = element.Timestamp;
//   if (oldtimestamp != newtimestamp) {
//     console.log('ffmpeg  -i f1.vob  -ss 00:00:' + (element.Timestamp / 1000) + '   -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame' + element.Timestamp + '.png ');
//     oldtimestamp = newtimestamp;
//     sequence = 1;
//   }
//   console.log('ffmpeg -i ./pictures/frame' + element.Timestamp + '.png -vf  "crop=' + size.Width + ':' + size.Height + ':' + size.Left + ':' + size.Top +  '"  ./faces/frame' + element.Timestamp + '' + sequence + '.png');
//   sequence++;
// });
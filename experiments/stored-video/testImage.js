let faces = require('./allFaces.json');

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

const padNumber = (num, size) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

let oldtimestamp = -1;
let sequence = 1;

// const fs = require('fs');
const fs = require('fs').promises;
const os = require("os");
let count = 0;
(async() => await fs.writeFile('./ffmpeg.sh', "#!/bin/bash" + os.EOL, 'utf-8'))();

faces.Faces.forEach(function(element) {
  let videoWidth = 1280;
  let videoHeight = 720;

  let size = element.Face.BoundingBox;
  size.Left = parseInt(size.Left * videoWidth);
  size.Top = parseInt(size.Top * videoHeight);

  size.Width = parseInt(size.Width * videoWidth);
  size.Height = parseInt(size.Height * videoHeight);

  element.Timestamp = padNumber(element.Timestamp, 7); // suports max duration of single video <= 10000 seconds(2.78 hours)
  console.log(element.Timestamp);
  let newtimestamp = element.Timestamp;
  if (oldtimestamp !== newtimestamp) {
    console.time('New Screenshot');
    const cmd = 'ffmpeg -i ./sample.mp4 -ss 00:00:' + (element.Timestamp / 1000) + ' -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame' + element.Timestamp + '.png ' + '> /dev/null 2>&1';
    (async() => await fs.appendFile('./ffmpeg.sh', cmd + os.EOL, 'utf-8'))();
    oldtimestamp = newtimestamp;
    sequence = 1;
    // execFfmpegCmd(cmd);
    console.timeEnd("New Screenshot");
    count++;
  }

  console.time('New image crop');
  const cmd = 'ffmpeg -i ./pictures/frame' + element.Timestamp + '.png -vf "crop=' + size.Width + ':' + size.Height + ':' + size.Left + ':' + size.Top +  '" ./faces/frame' + element.Timestamp + '' + sequence + '.png ' + '> /dev/null 2>&1';
  (async() => await fs.appendFile('./ffmpeg.sh', cmd + os.EOL, 'utf-8'))();
  // execFfmpegCmd(cmd);
  console.timeEnd('New image crop');
  sequence++;
  count++;
});

console.log(`Total Images`, count);
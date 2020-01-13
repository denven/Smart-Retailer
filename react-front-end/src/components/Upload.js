import React from 'react';
import axios from 'axios';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const uploadAction = () =>{
  let formData = new FormData();
  let videoFiles = document.querySelector('#myFile');  
  let video = videoFiles.files[0];
  formData.append("video", video);
  console.log(video);


  axios.post(`/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  }).catch((err) => {
    console.log(err , " also the name of the video is " + formData)
  })
}

// export default function upload() {
//   const classes = useStyles();
  
//   const handleSubmit = event => {
//     event.preventDefault();
//   }
//   return (
//     <>
//       <div>
//         <form id="video_upload" onSubmit={handleSubmit}>
//           <input type="file" className={classes.root} id="myFile"/>
//           <input type="submit" id="videoSubmit" className={classes.root} onClick={uploadAction}/>
//         </form>
//       </div>
//     </>
//   )
// }
export default function MyUploader (){
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: '/upload' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => { 
    console.log(files, " this is files");
    console.log(files.map(f => f.meta));
   }
 
  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
    />
  )
}
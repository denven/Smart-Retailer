//import axios from 'axios';
// const Dropzone = require('react-dropzone');

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function MyUploader () {

  // specify upload params and url for your files
  const getUploadParams = ({ file, meta }) => { 
    const body = new FormData();
    console.log(`This is file and meta from getUPloadParams`, file, meta);
    body.append('VID', file);  //this is one validation
    return { url: '/upload', body };
  }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { 
    // console.log(`status mema file`, status, meta, file) 
    // if (status === 'headers_received') {
    //   toast.info(`${meta.name} uploaded!`, { position: toast.POSITION.BOTTOM_RIGHT });
    // } else if (status === 'aborted') {
    //   toast.warn(`${meta.name}, upload failed...`);
    // }  
  }
  
  const delay = (s) => {

  return new Promise(resolve => {
     setTimeout(() => resolve(1), s * 1000);
  })

}

  // receives array of files that are done uploading when submit button is clicked
  async function handleSubmit (files) { 

    for( const file of files) {
      if (file.meta.status === 'done') { 
        await delay(Math.ceil(file.meta.size/(20*1024*1024)));
        toast.info(`${file.meta.name} uploaded!`, { position: toast.POSITION.BOTTOM_RIGHT });
        await delay(2);
        file.remove();  
      } else if (file.status === 'aborted') {
        toast.warn(`${file.meta.name}, upload failed...`);
      }  
    };

  }

  const Preview = ({ meta }) => {
    const { name, videoHeight, videoWidth, duration } = meta;
    return (
      <span style={{ alignSelf: 'flex-start'}}>
        {name}, Dimension: {videoHeight}x{videoWidth}, Duration:{duration}
      </span>
    )
  }
 
  return (   
    <div>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        // PreviewComponent={Preview}
        accept="video/mp4"
        inputContent="Drop Video(mp4) Files to upload!"
        maxSizeBytes={1024*1024*1024}  //1GB
        autoUpload={true}
        maxFiles={3}
        submitButtonContent={'Upload files for analysis'}
        inputWithFilesContent={'Add Video Files ...'}
        styles={{
          dropzone: { height: "100vh" },
          dropzoneActive: { borderColor: 'green' }
        }}
      />  
      <ToastContainer autoClose={2000} />
    </div>        
  )
}




// let selectedFiles = [];

// const onChangeHandler = event => {
//     console.log(event.target.files);
//     selectedFiles = event.target.files;
//     console.log(typeof(selectedFiles), typeof(event.target.files));
// }

// const onClickHandler = () => {
//     const data = new FormData();
//     for(let x = 0; x < selectedFiles.length; x++) {
//        data.append('VID', selectedFiles[x])
//     }

//     axios.post("/uploads", data, {})
//     .then(res => { // then print response status
//       console.log(res.statusText)
//     }).catch(err => console.log(err));
// }

// export default function MyUploader (){ 

//   return (
//       <div>
//         <input type="file" name="file" className="form-control" multiple onChange={onChangeHandler}/>
//         <button type="button" class="btn btn-success btn-block" onClick={onClickHandler}>Upload</button> 
//       </div>
//   )
// }
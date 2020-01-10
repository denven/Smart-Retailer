import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 30,
    width: '225 px',
    padding: '0 30px',
    order: 1
  },
});

const uploadAction = () =>{
  let formData = new FormData();
  document.getElementById('videoSubmit').addEventListener("click", function(event){
    event.preventDefault();
  });
  // let videoFile = document.querySelector('#myFile');
  // formData.append("video", videoFile.files[0], "test.mp4");
  // axios.post(`/api/`, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  // }).catch((err) => {
  //   console.log(err , " also the name of the video is " + formData.name)
  // })

}
export default function upload() {
  const classes = useStyles();
  return (
    <>
      <div>
        <form id="video_upload">
          <input type="file" className={classes.root} id="myFile"/>
          <input type="submit" id="videoSubmit" className={classes.root} onclick={uploadAction}/>
        </form>
      </div>
    </>
  )
}
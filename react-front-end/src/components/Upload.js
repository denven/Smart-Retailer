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

const uploadAction = (file) =>{
  let formData = new FormData();
  let imagefile = document.querySelector('#file');
  formData.append("image", imagefile.files[0]);
  axios.post('upload_file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })

}
export default function upload(props) {
  const classes = useStyles();
  return (
    <>
      <div>
        <input type="file" className={classes.root} id="myFile"/>
        <input type="submit" className={classes.root}/>
      </div>
    </>
  )
}
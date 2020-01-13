import React, { useEffect }from 'react';
import '../Statistics.css';
import axios from 'axios';

export default function VideoPlayer (props) {
  let videos;

  useEffect(() => {
    axios.get(`/videos`)
    .then(res => {
      videos = res.data
      console.log(videos, " videos");
    });
  })

  return(
    <>
      <video width='400' className="video" controls>
        <source src="https://retailer-videos.s3-us-west-2.amazonaws.com/sample-0.mp4" type="video/mp4"/>
      </video>
    </>
  );
};
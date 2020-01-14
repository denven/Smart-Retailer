import React, { useEffect }from 'react';
import '../Statistics.css';
import axios from 'axios';

export default function VideoPlayer (props) {
  let video=props.url;
  console.log(video, " this is in videos");
  return(
    <>
      <video width='400' className="video" controls>
        <source src={video} type="video/mp4"/>
      </video>
    </>
  );
};
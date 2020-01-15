import React from 'react'
import ReactPlayer from 'react-player' 

export default function MyVideoPlayer (props) {
   
  return(

    <ReactPlayer url={props.url} width='100%' height='100%' controls />

    // <VideoPlayer controls
    //   url={props.url} width={400} // height={300} autoplay
    // />

    // <>
    //   <video id='s3video' width='400' className="video" controls onLoad autoPlay>
    //     <source src={`${props.url}`} type="video/mp4"/>
    //   </video>
    // </>
  );
};
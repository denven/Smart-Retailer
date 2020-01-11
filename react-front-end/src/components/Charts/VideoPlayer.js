import React from 'react';
import styles from '../Statistics.css';

export default function VideoPlayer () {
  return(
    <>
      <video width='400' className="video" controls>
        <source src="https://retailer-videos.s3-us-west-2.amazonaws.com/sample-0.mp4" type="video/mp4"/>
      </video>
    </>
  );
};
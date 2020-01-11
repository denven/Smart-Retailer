import React from 'react';
import styles from './Statistics.css';
import  BarChart  from './Charts/BarChart';
import PieChart from './Charts/PieChart';
import VideoPlayer from './Charts/VideoPlayer';
import axios from 'axios';
import SingleDataPoint from './Charts/SingelDataPoint';

export default function Statstics (props) {
  let recurs;
  let tracking;
  let faces;
  let videos;
  
  axios.get(`/videos`)
  .then(res => {
    videos = res
  });
  axios.get(`/recurs/${props.listNumber-1}`)
  .then(res => {
    recurs = res;
  });
  axios.get(`/track/${props.listNumber-1}`)
  .then(res => {
    tracking = res;
  });
  axios.get(`/faces/${props.listNumber-1}`)
  .then(res => {
    faces = res;
  });

  return(
    <div className="statContainer">
      <div className="upperRow">
        <div className="videoContainer">
          <VideoPlayer stat={props.stat}/>
        </div>
        <div className="singleData">
          <div className="singles">
          <SingleDataPoint/>
          </div>
          <div className="singles">
          <SingleDataPoint/>
          </div>
          <div className="singles">
          <SingleDataPoint/>
          </div>
        </div>
      </div>
      <div className="bottomRow">
        <div className="bottomLeft">
          <div className="bottomLeftSplit">
            <PieChart stat={props.stat}/>
          </div>
          <div className="bottomLeftSplit">
            <PieChart stat={props.stat}/>
          </div>
        </div>
        <div className="bottomRight">
        <BarChart stat={props.stat}/>
        </div>
      </div>
    </div>
  );
}
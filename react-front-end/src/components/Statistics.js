import React from 'react';
import styles from './Statistics.css';
import  BarChart  from './Charts/BarChart';
import PieChart from './Charts/PieChart';
import VideoPlayer from './Charts/VideoPlayer';
export default function Statstics (props) {

  return(
    <div className="statContainer">
      <div className="upperRow">
        <div className="videoContainer">
          <VideoPlayer stat={props.stat}/>
        </div>
      </div>
      <div className="bottomRow">
        <div className="bottomLeft">
          <PieChart stat={props.stat}/>
          <PieChart stat={props.stat}/>
        </div>
        <BarChart stat={props.stat}/>
      </div>
    </div>
  );
}
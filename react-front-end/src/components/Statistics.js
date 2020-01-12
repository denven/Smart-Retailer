import React, {useEffect}from 'react';
import './Statistics.css';
import  BarChart  from './Charts/BarChart';
import PieChart from './Charts/PieChart';
import VideoPlayer from './Charts/VideoPlayer';
import axios from 'axios';
import SingleDataPoint from './Charts/SingelDataPoint';
import LineAndBarGraph from './Charts/LineAndBarGraph';

export default function Statstics (props) {
  let recurs = 10;
  let tracking = 68;
  let faces = 100;
  let revisitTime = 5;
  let videos;
  
  useEffect(()=> {
    axios.get(`/videos`)
    .then(res => {
      videos = res.data
    });
    axios.get(`/recurs/${props.listNumber}`)
    .then(res => {
      recurs = res.data;
    });
    axios.get(`/track/${props.listNumber}`)
    .then(res => {
      tracking = res.data;
    });
    axios.get(`/faces/${props.listNumber}`)
    .then(res => {
      faces = res.data;
    });
  },[props.listNumber])
  

  return(
    <div className="statContainer">
      <div className="upperRow">
        <div className="videoContainer">
          <VideoPlayer stat={props.stat}/>
        </div>
        <div className="singleData">
          <div className="pie">
            <PieChart ages={1}/>
          </div>
          <div className="pie">
            <PieChart emotions={1}/>
          </div>
        </div>
      </div>
      <div className="bottomRow">
        <div className="bottomLeft">
          <div className="singles">
          <SingleDataPoint recur={recurs}/>
          </div>
          <div className="singles">
          <SingleDataPoint stayTime={tracking}/>
          </div>
          <div className="singles">
          <SingleDataPoint returnTime={revisitTime}/>
          </div>
        </div>
        <div className="bottomRight">
          <LineAndBarGraph stat={props.stat}/>
        </div>
      </div>
    </div>
  );
}
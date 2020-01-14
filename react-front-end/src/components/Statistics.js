import React, {useEffect}from 'react';
import './Statistics.css';
import PieChart from './Charts/PieChart';
import VideoPlayer from './Charts/VideoPlayer';
import axios from 'axios';
import SingleDataPoint from './Charts/SingelDataPoint';
import LineAndBarGraph from './Charts/LineAndBarGraph';

export default function Statstics (props) {
  
  let graph = {
    duration: 0,
    timestamp: [],
    count: [],
  }
  if (props.listNumber > 0) {
    graph.duration = props.videoList[props.listNumber-1].duration;

    for (let dataPoint of props.tracking.traffic) {
      graph.timestamp.push(dataPoint.timestamp);
      graph.count.push(dataPoint.count);
    }

    
    // graph[props.tracking.traffic.timestamp] = props.tracking.traffic.count;

  }

  let emotions = {
    "CONFUSED": 0,
    "DISGUSTED": 0,
    "FEAR": 0,
    "HAPPY": 0,
    "CALM": 0,
    "SAD": 0,
    "ANGRY": 0,
    "SURPRISED": 0,
  }
  let ages = {
    "Pre-Teen": 0,
    "Teen": 0,
    "Young Adult": 0,
    "Middle Aged": 0,
    "55+": 0
  }

  props.faces.forEach(person => {
    emotions[person.emotion] += 1;
    if (person.age === 0) {
      ages["Pre-Teen"] += 1;
    } else if (person.age === 1){
      ages["Teen"] += 1;
    } else if (person.age === 2){
      ages["Young Adult"] += 1;
    } else if (person.age === 3){
      ages["Middle Aged"] += 1;
    } else if (person.age === 4){
      ages["55+"] += 1;
    }
  })
  // console.log(props, " this is full props")
  // console.log(props.faces, " faces")
  // console.log(props.tracking, " tracking")
  // console.log(props.recur, " recus")
  
  return(
    <div className="statContainer">
      <div className="upperRow">
        <div className="videoContainer">
          <VideoPlayer url={props.videoList[props.listNumber - 1].s3_url}/>
        </div>
        <div className="singleData">
          <div className="pie">
            <PieChart 
              listNumber={props.listNumber}
              ages={ages}  
            />
          </div>
          <div className="pie">
            <PieChart 
            listNumber={props.listNumber}
            emotions={emotions}
            />
          </div>
        </div>
      </div>
      <div className="bottomRow">
        <div className="bottomLeft">
          <div className="singles">
          <SingleDataPoint 
          listNumber={props.listNumber}
          recur={props.recur}
          />
          </div>
          <div className="singles">
          <SingleDataPoint 
          listNumber={props.listNumber}
          stayTime={props.tracking}
          />
          </div>
          <div className="singles">
          <SingleDataPoint 
          listNumber={props.listNumber}
          returnTime={props.recur}
          />
          </div>
        </div>
        <div className="bottomRight">
          <LineAndBarGraph 
          listNumber={props.listNumber}
          graph={graph}
          />
        </div>
      </div>
    </div>
  );
}
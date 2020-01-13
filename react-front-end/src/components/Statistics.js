import React, {useEffect}from 'react';
import './Statistics.css';
import PieChart from './Charts/PieChart';
import VideoPlayer from './Charts/VideoPlayer';
import axios from 'axios';
import SingleDataPoint from './Charts/SingelDataPoint';
import LineAndBarGraph from './Charts/LineAndBarGraph';

export default function Statstics (props) {
  
  const correctVideo = (arrayOfObj, id) => {
    arrayOfObj.forEach(video => {
      if (video.id === id){
        return video.s3_url;
      }
    });
  }
  return(
    <div className="statContainer">
      <div className="upperRow">
        <div className="videoContainer">
          <VideoPlayer url={correctVideo(props.videoList,props.listNumber)}/>
        </div>
        <div className="singleData">
          <div className="pie">
            <PieChart 
              listNumber={props.listNumber}
              ages={1}  
            />
          </div>
          <div className="pie">
            <PieChart 
            listNumber={props.listNumber}
            emotions={1}
            />
          </div>
        </div>
      </div>
      <div className="bottomRow">
        <div className="bottomLeft">
          <div className="singles">
          <SingleDataPoint 
          listNumber={props.listNumber}
          recur={1}
          />
          </div>
          <div className="singles">
          <SingleDataPoint 
          listNumber={props.listNumber}
          stayTime={1}
          />
          </div>
          <div className="singles">
          <SingleDataPoint 
          listNumber={props.listNumber}
          returnTime={1}
          />
          </div>
        </div>
        <div className="bottomRight">
          <LineAndBarGraph listNumber={props.listNumber}/>
        </div>
      </div>
    </div>
  );
}
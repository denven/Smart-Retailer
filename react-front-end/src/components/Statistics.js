import React, {useEffect}from 'react';
import './Statistics.css';
import PieChart from './Charts/PieChart';
import MyVideoPlayer from './Charts/VideoPlayer';
import SingleDataPoint from './Charts/SingelDataPoint';
import LineAndBarGraph from './Charts/LineAndBarGraph';
import TransferList from './TransferList';

export default function Statstics (props) {
  const [selected, setSelected] = React.useState("all");
  let graph = {
    duration: 0,
    timestamp: [],
    count: [],
    multiGraph: {}
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

  console.log(props.appState, " in all");

  // console.log(props, " this is full props")
  // console.log(props.faces, " faces")
  // console.log(props.tracking, " tracking")
  // console.log(props.recur, " recus")
  
  if (props.listNumber === -1) {
    const listName = {}

    props.all.videos.forEach(video => {
      if (video.duration > graph.duration){
        graph.duration = video.duration
      }
    });

    for (let dataPoint of props.all.traffic) {
      if (!graph.multiGraph[props.parsingFileName(dataPoint.name)]) {
        graph.multiGraph[props.parsingFileName(dataPoint.name)] = {
          name: props.parsingFileName(dataPoint.name),
          timestamp: [],
          count: []
        }
      } else {
        graph.multiGraph[props.parsingFileName(dataPoint.name)].timestamp.push(dataPoint.timestamp);
        graph.multiGraph[props.parsingFileName(dataPoint.name)].count.push(dataPoint.count);
      }
    }

    props.all.faces.forEach(person => {
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
    

    return(
      <div className="statContainer">
        <div className="upperRow">
          <div className="videoContainer">
            <TransferList
              setSelected={setSelected}
              selected={selected}
              all={props.all}
              parsingFileName={props.parsingFileName}
            />
          </div>
          <div className="singleData">
            <div className="pie">
              <PieChart 
                ages={ages}
                appState={props.appState}  
              />
            </div>
            <div className="pie">
              <PieChart 
              emotions={emotions}
              appState={props.appState}
              />
            </div>
          </div>
        </div>
        <div className="bottomRow">
          <div className="bottomLeft">
            <div className="singles">
            <SingleDataPoint 
            recur={props.all.recurs}
            appState={props.appState}
            />
            </div>
            <div className="singles">
            <SingleDataPoint 
            stayTime={props.all}
            appState={props.appState}
            />
            </div>
            <div className="singles">
            <SingleDataPoint 
            returnTime={props.all.recurs}
            appState={props.appState}
            />
            </div>
          </div>
          <div className="bottomRight">
            <LineAndBarGraph 
            appState={props.appState}
            all={true}
            graph={graph}
            parsingFileName={props.parsingFileName}
            />
          </div>
        </div>
      </div>
    );
  } else {
    // console.log(props.recur, " recurs");
    // console.log(props.recur, " recurs");
    // console.log(props.recur, " recurs");

    if (props.listNumber > 0) {
      graph.duration = props.videoList[props.listNumber-1].duration;
  
      for (let dataPoint of props.tracking.traffic) {
        graph.timestamp.push(dataPoint.timestamp);
        graph.count.push(dataPoint.count);
      }
    }

    console.log(props, " this is inside stats")
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

    return(
      <div className="statContainer">
        <div className="upperRow">
          <div className="videoContainer">
            <MyVideoPlayer url={props.videoList[props.listNumber - 1].s3_url}/>
          </div>
          <div className="singleData">
            <div className="pie">
              <PieChart 
                listNumber={props.listNumber}
                ages={ages} 
                appState={props.appState} 
              />
            </div>
            <div className="pie">
              <PieChart 
              listNumber={props.listNumber}
              emotions={emotions}
              appState={props.appState}
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
            appState={props.appState}
            />
            </div>
            <div className="singles">
            <SingleDataPoint 
            listNumber={props.listNumber}
            stayTime={props.tracking}
            appState={props.appState}
            />
            </div>
            <div className="singles">
            <SingleDataPoint 
            listNumber={props.listNumber}
            returnTime={props.recur}
            appState={props.appState}
            />
            </div>
          </div>
          <div className="bottomRight">
            <LineAndBarGraph 
            appState={props.appState}
            listNumber={props.listNumber}
            graph={graph}
            
            />
          </div>
        </div>
      </div>
    );
  }
}
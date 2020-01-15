import React, {useState} from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import GraphToggle from './GraphSwitch';
import '../Statistics.css';


export default function LineAndBarGraph (props) {
  const [graphToggle, setGraphToggle] = useState("line");

  if (props.all) {
    console.log(props.graph)
    return (
      <>
        <LineChart
        graph={props.graph}
        all={props.all}
        parsingFileName={props.parsingFileName}
        />
      </>
    )
  }


  if (graphToggle === "line" && (!props.all)) {
    return (
      <>
        <LineChart
        graph={props.graph}
        />
        <GraphToggle 
          className="floater"
          setGraph={setGraphToggle}
        />
      </>
    )
  } else {
    return (
      <>
        <BarChart
          graph={props.graph}
        />
        <GraphToggle 
          className="floater"
          setGraph={setGraphToggle}
        />
      </>
    )
  }
}

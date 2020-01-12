import React, {useState} from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import GraphToggle from './GraphSwitch';
import '../Statistics.css';


export default function LineAndBarGraph (props) {
  const [graphToggle, setGraphToggle] = useState("line");

  if (graphToggle === "line") {
    return (
      <>
        <LineChart/>
        <GraphToggle 
          className="floater"
          setGraph={setGraphToggle}
        />
      </>
    )
  } else {
    return (
      <>
        <BarChart/>
        <GraphToggle 
          className="floater"
          setGraph={setGraphToggle}
        />
      </>
    )
  }
}

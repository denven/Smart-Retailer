import React, {useState, useEffect} from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import GraphToggle from './GraphSwitch';
import '../Statistics.css';
import Loading from '../Loading';


export default function LineAndBarGraph (props) {
  const [graphToggle, setGraphToggle] = useState("line");
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(()=> {
  //     setLoading(false);
  //   }, 750);
  // },[props.appState]);

  // if (loading === true) {
  //   return(
  //     <Loading/>
  //   )
  // }
  if (props.all) {
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

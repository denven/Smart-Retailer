import React, { useState, useEffect } from 'react';
import './App.css';
import VerticalTabs from './components/Sidebar';
import Upload from './components/Upload';
import Statistics from './components/Statistics';
import axios from 'axios';

export default function App (){
 
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      // subscribe for server messages
      const events = new EventSource('/events');
      events.onmessage = (event) => {
        const anaStates = JSON.parse(event.data);
        console.log(anaStates);
      };
      setListening(true);
    }
  }, [listening]);

  const [state, setState] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const [recur, setRecur] = useState([]);
  const [tracking, setTracking] = useState([]);
  const [faces, setFaces] = useState([]);
  const setView = (view) => {
    setState(view);
  }

  useEffect(() => {
    axios.get(`/videos`)
    .then(res => {
      setVideoList(res.data);
    });
  },[state])

  // return <p>{JSON.stringify(recur)}</p>;

  if (state === 0) {
    return (
      <>
          <div className='container'>
            <div className="sideBar">
              <VerticalTabs 
              changeView={setView}
              videoList={videoList}
              />
            </div>
            <div className="statistics">
            </div>
          </div>
      </>
    )
  } else if (state === 1){
    return (
      <>
        <div className='container'>
          <div className="sideBar">
            <VerticalTabs 
            changeView={setView}
            videoList={videoList}
            />
          </div>
          <div className="upload">
            <Upload/>
          </div>
        </div>
      </>
    )
  } else if (state > 2){
      return (
        <>
          <div className='container'>
            <div className="sideBar">
              <VerticalTabs 
                changeView={setView}
                videoList={videoList}
              />
            </div>
            <div className="statistics">
              <Statistics 
                listNumber={state - 2}
                videoList={videoList}
                recur={recur}
                tracking={tracking}
                faces={faces}
              />
            </div>
          </div>
        </>
      );
  } else if (state === "all") {
    return (
      <>
          <div className='container'>
            <div className="sideBar">
              <VerticalTabs 
                changeView={setView}
                videoList={videoList}
              />
            </div>
            <div className="statistics">
              <Statistics 
                listNumber={-1}
                videoList={videoList}
                recur={recur}
                tracking={tracking}
                faces={faces}
              />
            </div>
          </div>
        </>
    )
  }
}

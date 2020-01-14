import React, { useState, useEffect } from 'react';
import './App.css';
import VerticalTabs from './components/Sidebar';
import Upload from './components/Upload';
import Statistics from './components/Statistics';
import axios from 'axios';



export default function App (){
  const [state, setState] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const [recur, setRecur] = useState([]);
  const [tracking, setTracking] = useState([]);
  const [faces, setFaces] = useState([]);
  const [all, setAll] = React.useState();

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

  const setView = (view) => {
    setState(view);
  }

  useEffect(() => {
    axios.get(`/videos`)
    .then(res => {
      setVideoList(res.data.reverse());
    })
    axios.get(`/recurs/${state - 2}`)
    .then(res => {
      setRecur(res.data);
    }).catch(err => console.log(err));
    axios.get(`/track/${state - 2}`)
    .then(res => {
      setTracking(res.data);
    });
    axios.get(`/faces/${state - 2}`)
    .then(res => {
      setFaces(res.data);
    });
  },[state]);
  useEffect(() => {
    axios.get('/all/')
    .then(res => {
      setAll(res);
    })
  }, []);

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
                all={all}
                setAll={setAll}
              />
            </div>
          </div>
        </>
    )
  }
}

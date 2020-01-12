import React, { useState, useEffect } from 'react';
import './App.css';
import VerticalTabs from './components/Sidebar';
import Upload from './components/Upload';
import Statistics from './components/Statistics';
import axios from 'axios';
export default function App (){
  const [state, setState] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const setView = (view) => {
    setState(view);
  }

  useEffect(() => {
    axios.get(`/videos`)
    .then(res => {
      setVideoList = res.data;
    });
  },[])
  
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
              />
            </div>
          </div>
        </>
      );
  }
}

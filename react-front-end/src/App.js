import React, { useState } from 'react';
import './App.css';
import VerticalTabs from './components/Sidebar';
import Upload from './components/Upload';
import Statistics from './components/Statistics';
import axios from 'axios';
export default function App (){
  const [state, setState] = useState(0);
  const setView = (view) => {
    setState(view);
  }
  let videoList;

  axios.get(`/videos`)
  .then(res => {
    videoList = res
  });
  
  if (state === 0) {
    return (
      <>
        <div className='container'>
          <div className="sideBar">
            <VerticalTabs changeView={setView}/>
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
            <VerticalTabs changeView={setView}/>
          </div>
          <div className="upload">
            <Upload/>
          </div>
        </div>
      </>
    )
  } else {
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
                listNumber={state}
              />
            </div>
          </div>
        </>
      );
  }
}

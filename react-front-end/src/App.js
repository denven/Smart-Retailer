import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import VerticalTabs from './components/Sidebar';
import Upload from './components/Upload';
import Statistics from './components/Statistics';

export default function App (){
  const [state, setState] = useState(0);
  const setView = (view) => {
    setState(view);
  }
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
          <div className="statistics">
            <Upload/>
          </div>
        </div>
      </>
    )
  } else {
    //axios get stats from backend api
    // axios.get(`api/stats/${state}`)
    // .then((statistics => {
      return (
        <>
          <div className='container'>
            <div className="sideBar">
              <VerticalTabs changeView={setView}/>
            </div>
            <div className="statistics">
              <Statistics 
              // stats={statistics}
              />
            </div>
          </div>
        </>
      );
    // }))
    // .catch((error) => {
    //   console.log(error);
    // })
  }
}

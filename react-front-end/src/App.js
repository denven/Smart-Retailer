import React, { useState, useEffect } from 'react';
import './App.css';
import VerticalTabs from './components/Sidebar';
import Upload from './components/Upload';
import Statistics from './components/Statistics';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';




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
      setAll(res.data);
    })
  }, []);

  const parsingFileName = (fileName) => {
    let name = fileName.slice(4,12);
    let year = name.slice(0,4);
    let month = name.slice(4,6)
    let day = name.slice(6)
    let newName = "";
  
    switch (month) {
      case "01":
        newName += "Jan ";
        break;
      case "02":
        newName += "Feb ";
        break;
      case "03":
        newName += "Mar ";
        break;
      case "04":
        newName += "Apr ";
        break;
      case "05":
        newName += "May ";
        break;
      case "06":
        newName += "Jun ";
        break;
      case "07":
        newName += "Jul ";
        break;
      case "08":
        newName += "Aug ";
        break;
      case "09":
        newName += "Sep ";
        break;
      case "10":
        newName += "Oct ";
        break;
      case "11":
        newName += "Nov ";
        break;
      case "12":
        newName += "Dec ";
        break;
    }
    return newName += day + " " + year;
  }

  // return <p>{JSON.stringify(recur)}</p>;


  if (state === 0) {
    return (
      <>
          <TransitionGroup className='container'>
            <div className="sideBar">
              <VerticalTabs 
              changeView={setView}
              videoList={videoList}
              parsingFileName={parsingFileName}
              />
            </div>
            <CSSTransition
              in={state}
              timeout={1000}
              classNames="slide"
            >
              <div className="statistics">
                <Dashboard/>
              </div>
            </CSSTransition>
          </TransitionGroup>
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
            parsingFileName={parsingFileName}
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
                parsingFileName={parsingFileName}
              />
            </div>
            <div className="statistics">
              <Statistics 
                listNumber={state - 2}
                videoList={videoList}
                recur={recur}
                tracking={tracking}
                faces={faces}
                parsingFileName={parsingFileName}
                appState={state}
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
                parsingFileName={parsingFileName}
              />
            </div>
            <div className="statistics">
              <Statistics 
                listNumber={-1}
                all={all}
                setAll={setAll}
                parsingFileName={parsingFileName}
                appState={state}
              />
            </div>
          </div>
        </>
    )
  }
}

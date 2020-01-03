import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';

import VerticalTabs from './components/Siderbar';
import { Dashboard } from './components/Dashboard';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    width: 300,
  }
}));

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }
  
  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  render() {
    return (
      <>
        <div className='container'>
          <VerticalTabs/>
          <Dashboard/>
        </div>
      </>
    );
  }
}

export default App;

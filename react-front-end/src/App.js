import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button'
import VerticalTabs from './components/Siderbar';
import { Dashboard } from './components/Dashboard';

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
        <VerticalTabs/>
        <Dashboard/>
      </>
    );
  }
}

export default App;

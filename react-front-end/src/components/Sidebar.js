import React, {useState} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import Fab from '@material-ui/core/Fab';
import './Statistics.css';


const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    width: "225 px",
  },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
    height: 900
  },
  logo: {
    fontSize: 25,
  },
  tab: {
    fontSize: 18,
  }
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  let videos = props.videoList;
  
        
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.changeView(newValue);
  };
  function setViewToAll() {
    props.changeView("all");
    setValue(-1);
  }
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

  return (
    <div className={classes.root}>
        <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        <Tab className ={classes.logo} label="Smart-Retailer"/>
        <Tab className = {classes.tab} label="Upload" />
        <SearchBar 
        onSearch={setSearchTerm}
        key={2}
        />
        {(videos || []).map(video => (
        <Tab className = {classes.tab} 
        label={parsingFileName(video.name)}
        key={video.id} 
        />
        ))}
      </Tabs>
      <div className="all">
        <Fab variant="extended" className="all" onClick={setViewToAll}>
          All Statistics
        </Fab>
      </div>
    </div>
  );
}
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
    height: 730
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
        label={props.parsingFileName(video.name)}
        key={video.id} 
        />
        ))}
      </Tabs>
      <div className="all">
        <Fab variant="extended" onClick={setViewToAll}>
          All Statistics
        </Fab>
      </div>
    </div>
  );
}
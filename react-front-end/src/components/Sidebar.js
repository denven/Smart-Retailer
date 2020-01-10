import React, {useState} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import videosList from '../data/video_data.json';

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
  const videos = videosList.videos;
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.changeView(newValue);
  };

  console.log(props, 'props');
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
        {videos.map(video => (
        <Tab className = {classes.tab} 
        label={video.name}
        key={video.id} 
        
        />
        ))}

      </Tabs>
    </div>
  );
}
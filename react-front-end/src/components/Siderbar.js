import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
    height: 1150
  },
  logo: {
    fontSize: 25,
  },
  tab: {
    fontSize: 18,
  }
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab className ={classes.logo} label="IntelliRetailer" disabled>
        </Tab>
        <Tab className = {classes.tab} label="Upload"  />
        <Tab className = {classes.tab} label="Item One"  />
        <Tab className = {classes.tab} label="Item Two"  />
        <Tab className = {classes.tab} label="Item Three"  />
        <Tab className = {classes.tab} label="Item Four"  />
        <Tab className = {classes.tab} label="Item Five"  />
        <Tab className = {classes.tab} label="Item Six"  />
        <Tab className = {classes.tab} label="Item Seven"  />
      </Tabs>
    </div>
  );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 30,
    width: 300,
    padding: '0 30px',
    order: 1
  },
});

export function Dashboard() {
  const classes = useStyles();
  return (
    <>
      <div>
        <input type="file" className={classes.root} id="myFile"/>
        <input type="submit" className={classes.root}/>
      </div>
    </>
  )
}
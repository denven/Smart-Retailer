import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    height: "100%",
    width: "100%",
    float: "right"
  },
  single: {
    padding: '60px 190px',
    'padding-top': '75px',
  }
}));

export default function CircularIndeterminate(props) {
  const classes = useStyles();

  if (props.single) {
    return (
      <div className={classes.single}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }
}
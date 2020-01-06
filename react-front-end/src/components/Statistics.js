import React from 'react';
import styles from './Statistics.css';
import  BarChart  from './Charts/BarChart';
import PieChart from './Charts/PieChart';

export default function Statstics () {

  return(
    <>
      <PieChart></PieChart>
      <BarChart className={styles.bar}/>
    </>
  );
}
import React, { useEffect } from 'react';
import axios from 'axios';

export default function SingleDataPoint(props){
  
  if (props.recur) {
    let numOfRecur = 0;
    let totalNum = 0;
    props.recur.forEach(person => {
      if (person.is_recuring === true){
        numOfRecur++;
      }
      totalNum++;
    })
    return(
      <>
        <div>
            <div className="upperText">
              <p>
                Recurring customers vs Total Customers
              </p>
            </div>
          <div className="dataDisplay">
            <p>
              {numOfRecur}
            </p>
            <p>
              {totalNum}
            </p>
          </div>
        </div>
      </>
    );
  }
  if (props.stayTime) {
    console.log(props.stayTime, " staytime");
    let totalTime = 0;
    let averageTime = 0;

    props.stayTime.persons.forEach(person => {
      totalTime += person.stay_duration;
    });
    averageTime = totalTime / props.stayTime.persons.length;
    return(
      <>
        <div>
            <div className="upperText">
              <p>
                Average Time in Store
              </p>
            </div>
          <div className="dataDisplay">
            <p>
              {averageTime.toFixed(0) + " seconds"}
            </p>
          </div>
        </div>
      </>
    );
  }

  if (props.returnTime) {
    let totalReturnTime = 0;
    let count = 0;
    let averageReturnTime = 0;
    props.returnTime.forEach(person => {
      totalReturnTime += person.visit_date;
      if (person.is_recuring) {
        count++;
      }
    });
    averageReturnTime = totalReturnTime / count;

    return(
      <>
        <div>
            <div className="upperText">
              <p>
                Average Days Recurring Customers take to return.
              </p>
            </div>
          <div className="dataDisplay">
            <p>
              {averageReturnTime.toFixed(0) + " days"}
            </p>
          </div>
        </div>
      </>
    );
  }

}
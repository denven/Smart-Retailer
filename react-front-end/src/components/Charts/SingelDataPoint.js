import React, { useEffect } from 'react';
import axios from 'axios';

export default function SingleDataPoint(props){
  let recurs;
  let tracking;
  let averageStayTime;
  let averageReturnTime;
  let totalStayTime;

  // useEffect(() => {
  //   axios.get(`/recurs/${props.listNumber}`)
  //   .then(res => {
  //     recurs = res.data;
  //     console.log(recurs, " recurs");
  //   });

  //   axios.get(`/track/${props.listNumber}`)
  //   .then(res => {
  //     tracking = res.data;
  //     console.log(tracking, " tracking");
  //     tracking.persons.forEach(person => {
  //       totalStayTime += person.stay_duration;
  //       console.log(person.stay_duration, " this is staytime inside loop")
  //     });
  //     console.log(totalStayTime, " outside of loop total time")
  //     averageStayTime = totalStayTime / tracking.persons.length
  //     console.log(averageStayTime, " average stay time");
  //   })
  // },[])


  if (props.recur) {
    return(
      <>
        <div>
            <div className="upperText">
              <p>
                Recurring customers
              </p>
            </div>
          <div className="dataDisplay">
            <p>
              {recurs}
            </p>
          </div>
        </div>
      </>
    );
  }
  if (props.stayTime) {
    return(
      <>
        <div>
            <div className="upperText">
              <p>
                Average Stay Time
              </p>
            </div>
          <div className="dataDisplay">
            <p>
              {averageStayTime + " seconds"}
            </p>
          </div>
        </div>
      </>
    );
  }

  if (props.returnTime) {
    return(
      <>
        <div>
            <div className="upperText">
              <p>
                Average Time Recurring Customers take to return.
              </p>
            </div>
          <div className="dataDisplay">
            <p>
              {props.returnTime + " days"}
            </p>
          </div>
        </div>
      </>
    );
  }
}
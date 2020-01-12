import React from 'react';


export default function SingleDataPoint(props){
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
              {props.recur}
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
              {props.stayTime + " seconds"}
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
/*
 * This module prepare proper data format for recognition data before writing them to database.
 **/
const _ = require('lodash')

/**
 * @param {*} Emotions: Array of 8 types and values of emotions 
 * '[ {"Type":"CALM","Confidence":1.825882077217102}, ...]'
 * Emotions Value: has 8 types (except "Unknown")
 * HAPPY | SAD | ANGRY | CONFUSED | DISGUSTED | SURPRISED | CALM | UNKNOWN | FEAR
 */
const getMostConfidentEmotion = (Emotions) => {

  let emotions = _.orderBy(Emotions, Number, ['Confidence', 'desc']);
  return emotions[0].Type;

}


const getAgeRangeCategory = (AgeRange) => {

  let medianAge = Math.ceil((AgeRange.Low + AgeRange.High) / 2);

  if (medianAge < 18) return 0; // Children

  if (medianAge >= 18 && medianAge < 35) return 1; // Youth

  if (medianAge >= 35 && medianAge < 55) return 2; //
  
  if (medianAge >= 55 && medianAge < 65) return 3; //

  if (medianAge >= 65) return 4; // Seniors

}


// helper for calculating the traffic by time
const isPersonStillStaying = (timestamp, visit) => {
  if(timestamp >= visit.show_timestamp && timestamp <= visit.leave_timestamp) {
    return true;
  } else {
    return false;
  }
}

/**
 * Return an array of objects which have the count of traffic by timestamp
 * @param {Array} TrackedPersons returned by startPersonTracking() in rek-traffic
 */
const getTrackedTraffic = (TrackedPersons) => {

  let traffic = [];
  
  for(const visit of TrackedPersons) {

    let count = 0;
    TrackedPersons.forEach( person => {
      if(isPersonStillStaying(visit.show_timestamp, person)) count++;
    });

    traffic.push( { timestamp: visit.show_timestamp, count: count } );
  }

  for(const visit of TrackedPersons) {
    let count = 0;
    TrackedPersons.forEach( person => {
      if(isPersonStillStaying(visit.leave_timestamp, person)) count++;
    });

    traffic.push( { timestamp: visit.leave_timestamp, count: count } );
  }

  let data = _(traffic).orderBy(['timestamp', 'asc']).uniqBy('timestamp').value();
  console.log(data);

  return data;
}


 module.exports = { 
   getMostConfidentEmotion, 
   getAgeRangeCategory,
   getTrackedTraffic
  }
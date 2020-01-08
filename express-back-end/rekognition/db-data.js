/*
 * This module prepare proper data format for recognition data before writing them to database.
 **/
const _ = require('lodash')

/**
 * @param {*} Emotions: Array of 8 types and values of emotions 
 * '[ {"Type":"CALM","Confidence":1.825882077217102}, ..., {"Type":"SAD","Confidence":0.7703105211257935}]'
 * Emotions Value: has 8 types (except "Unknown")
 * HAPPY | SAD | ANGRY | CONFUSED | DISGUSTED | SURPRISED | CALM | UNKNOWN | FEAR
 */
const getMostConfidentEmotion = (Emotions) => {

  let emotions = _.orderBy(Emotions, Number, ['Confidence', 'desc']);
  console.log(JSON.stringify(emotions));
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






 module.exports = { getMostConfidentEmotion, getAgeRangeCategory }
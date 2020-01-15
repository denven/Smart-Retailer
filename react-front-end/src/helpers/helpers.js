// pad a number from begining with 0 to a a fixed length of string 
const padNumber = (num, size) => {
  let s = num + "";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
};

// format a millisecond timestamp to hh:mm:ss.xxx
const msTohhmmss = ( msTimestamp ) => {

  if(msTimestamp % 1000 > 500) {
    msTimestamp = msTimestamp + 500;
  } else {
    msTimestamp = msTimestamp - msTimestamp % 1000;
  }
    
    let seconds = msTimestamp / 1000;
    let hours = parseInt( seconds / 3600 );           // 3,600 seconds is 1 hour
    let minutes = parseInt( (seconds % 3600) / 60 );  // 60 seconds is 1 minute

    seconds = parseInt(seconds % 60);         // seconds remaining less than 60 (1 minute)
    let  millisec = msTimestamp % 1000;

    hours = padNumber(hours, 2);
    minutes = padNumber(minutes, 2);
    seconds = padNumber(seconds, 2);
    // millisec = padNumber(millisec, 3);
    if(millisec / 1000 < 60) return seconds + ' s';
    if(millisec / 1000 < 3600) return (minutes + ":" + seconds + 's')

    return( hours + ":" + minutes + ":" + seconds );
}

module.exports = {
  msTohhmmss
}
const _ = require('lodash');
const moment = require('moment');

let dateTime = "20191212_121556"
dateTime = moment( dateTime, 'YYYYMMDD_HHmmss', true).format("YYYY-MM-DD HH:mm:ss").valueOf();
console.log(moment(dateTime).valueOf());

let person = {Index: '', Timestamp: '', HisVisits: [{Vid: 'abc', Timestamp: 0}, {Vid: 'bcd', Timestamp: 90}]};

console.log(person.HisVisits.filter(item => { return (item.Vid === 'abc') }));
    

const getVideoFilmedDate = (videoName) => {

    let dateTime = videoName.slice(0, -3).replace(/[^0-9]/ig,"").slice(0,14);
    console.log(dateTime);
    dateTime = moment( dateTime, 'YYYYMMDDHHmmss', true).format("YYYY-MM-DD HH:mm:ss");
    console.log(moment(dateTime).valueOf());
}

getVideoFilmedDate('sfdsd2014kllk1202[][]101203.mp4');

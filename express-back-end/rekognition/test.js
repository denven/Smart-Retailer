const _ = require('lodash');

let person = {Index: '', Timestamp: '', HisVisits: [{Vid: 'abc', Timestamp: 0}, {Vid: 'bcd', Timestamp: 90}]};

console.log(person.HisVisits.filter(item => { return (item.Vid === 'abc') }));
    

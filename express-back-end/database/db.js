const knex = require('knex');
const config = require('./knexfile');

const env = process.env.NODE_ENV || 'development';
const configOptions = config[env];

const db = knex(configOptions);

module.exports = function() {

  //TODO: IMPLEMENT ALL THE QUERIES AND PROVIDE THEM AS FUNCTIONS FOR ROUTES METHODS  
  // this.getAgeRangeFromVide = () => {}


}

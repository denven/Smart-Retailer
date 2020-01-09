const config = require('./knexfile');
const env = process.env.NODE_ENV || 'development';
const knex = require('knex')(config[env]);

module.exports = function() {

  //TODO: IMPLEMENT ALL THE QUERIES AND PROVIDE THEM AS FUNCTIONS FOR ROUTES METHODS  
  // this.getAgeRangeFromVide = () => {}


}

const testDBConnection = () => {

  knex.raw("SELECT current_database()")
  .then( (data) => {
    let dbName = data.rows ?  data.rows[0].current_database : `Not Connected`;    
    console.log(`Current Database: ${dbName}`)
  }).then()
  .catch((err) => { console.log(err); throw err });

  knex.raw("SELECT tablename FROM pg_tables WHERE schemaname='public'")
  .then( (data) => {
    console.log('Tables Found in database:', data.rows.map(t => t.tablename).join(', '));
  }).then()
  .catch((err) => { console.log(err); throw err }); 
}

module.exports = { knex, testDBConnection};
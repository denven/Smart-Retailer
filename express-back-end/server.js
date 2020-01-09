const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;

const knex = require('./database/db').knex;
const db = require('./database/db');


const awsSrv = require('./rekognition/aws-servies');

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

const appRoutes = require("./routes/routes")();
app.use("/", appRoutes); // mount all the routes to root path (no other divisions)


db.testDBConnection();


app.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

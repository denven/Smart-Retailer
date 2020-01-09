/**
 * express routes for intercation with react front end
 */

"use strict";

const express = require('express');
const router  = express.Router();
const db = require('../database/db');


module.exports = function() {

  router.get("/", function(req, res) {
    db.testDBConnection();
    res.json({db: 'ok'});
  });

    
  // receive video file from front end and then upload it into s3 bucket
  // router.post();

  // accept command from front end to start an analysis of faces in video



  // return video analysis status for frontend
  // router.get();

  // return faces data for front end
  // router.get();

  return router;   // this router must be returned when used as a router division

};
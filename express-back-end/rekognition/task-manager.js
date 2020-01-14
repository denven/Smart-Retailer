const { knex } = require('../database/db');
const { startVideoRekognition } = require('./rek-videos');
const chalk = require('chalk');
const INFO = chalk.bold.green;
const ERROR = chalk.bold.red;
const HINT = chalk.keyword('orange');
const Chalk = console.log

async function chkUnAnaVideos () {

  try{
    let unAnaVideos = await knex('videos').select('name').where('ana_status', 0);
      // .then( rows => unAnaVideos = rows )
      // .catch( err => console.log(err) );
    return unAnaVideos;
  }catch(err) {console.log(err)};

}


async function getVideoTaskStat (vidName) {

  if(vidName) {
    let data = await knex('videos').select('ana_status').where('name', vidName);
    return data[0].ana_status;
  } else {
    return 0;
  }
}


const delay = (s) => {

  return new Promise(resolve => {
     setTimeout(() => resolve(1), s * 1000);
  })

}

async function anaTaskManager () {

  let chkInterval = 3;  //default
  let taskContext = { name: '', status: 'NOT_STARTED' }

  Chalk(INFO('Started to monitor video analysis tasks...'));

  while(true) {

    await delay(chkInterval);
    
    let unAnaVideos = await chkUnAnaVideos();
    if(unAnaVideos.length > 0) {
      if(taskContext.status === 'NOT_STARTED') {
        console.log(unAnaVideos[0].name);
        startVideoRekognition(unAnaVideos[0].name);
        taskContext.status = 'IN_PROCESS';
        taskContext.name = unAnaVideos[0].name;
        Chalk(HINT(`${taskContext.name} Analysis Begins!`));
      } else {
        let status = await getVideoTaskStat(taskContext.name);
        if(status === 4) {
          Chalk(HINT(`${taskContext.name} Analysis is Done!`));
          taskContext.status = 'NOT_STARTED';
          taskContext.name = '';
        }
      }
    } else {      
      let status = await getVideoTaskStat(taskContext.name);
      console.log(`test sooooooooooooooooo`, status);
      if(status === 4) {
        Chalk(HINT(`${taskContext.name} Analysis is Done!`));
        taskContext.status = 'NOT_STARTED';
        taskContext.name = '';
      }
      console.log('No pending videos analysis task');
    }

    console.log(taskContext);
  }

}

// taskManager();

module.exports = { anaTaskManager };

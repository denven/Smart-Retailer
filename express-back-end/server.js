const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;

const awsSrv = require('./rekognition/aws-servies');

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static('public'));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

const router = Express.Router();
const kenex = require('./database/db');
const appRoutes = require('./routes/routes');
appRoutes(router, kenex);
App.use('/', router);

awsSrv.awsServiceStart();

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

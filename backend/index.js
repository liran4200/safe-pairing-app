require('express-async-errors');
const config = require('config');
const initSocket = require('./socket/index');
const logger = require('./utils/Logger');
const isProvideJWT = require('./startup/config');
const error = require('./middleware/error');
const multiplyLocalHost = require('./middleware/multiplyLocalHost');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const login = require('./routes/login');
const users = require('./routes/users');
const notifications = require('./routes/notification'); 

//catch unhandle of promise rejection
process.on('unhandledRejection', (ex) => {
  logger.error('In unhandleRejecton, redirect to unhandleException');
  throw ex;
});
    
//checking provide jwtPR
//isProvideJWT();
const dbConnection = config.get('db');
mongoose.connect(dbConnection)
  .then(() =>  logger.info(`Connected to ${dbConnection}...`))
  .catch(err => logger.error(`Could not connect to ${dbConnection} ...`, err));

//get requests as json object
app.use(express.json());
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/notifications', notifications);
app.use(error);
app.use(multiplyLocalHost);

serverIo = initSocket(app);
const port = process.env.PORT || 4444; 
const server = serverIo.listen(port, () => logger.info(`Listening on port ${port}... `));
module.exports = server;
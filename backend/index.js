const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const login = require('./routes/login');
const users = require('./routes/users');

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not provided');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/safepairing')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

//get requests as json object
app.use(express.json());
app.use('/api/users', users);
app.use('/api/login', login);
const port = process.env.PORT || 4444; //  by default run on port 4444
app.listen(port, () => console.log(`Listening on port ${port}... `));
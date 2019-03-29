const express = require('express');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users');

mongoose.connect('mongodb://localhost/safepairing')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

//get requests as json object
app.use(express.json());
app.use('/api/users', users);

const port = process.env.PORT || 4444;
app.listen(port, () => console.log(`Listening on port ${port}... `));
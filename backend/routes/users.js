const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth ,async (req, res ) => {
    console.log(req.user);
    const user = await User.findById(req.user._id);
    res.send(_.pick(user, ['_id', 'name', 'email']) );
});

router.get('/', async (req, res ) => {
    const pageNumber =  parseInt(req.query.pageNumber);
    const pageSize =   parseInt(req.query.pageSize);
    
    if( !pageNumber || !pageSize || pageNumber < 1 ) {
        res.status(400).send("Invalid pageNumber or pageSize");
    }

    const users = await User
        .find()
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
        .select({ _id: 1, name: 1, email: 1});

    res.send(users);    
});

/** 
 * Currently, not necessary
router.get('/:id', auth ,async (req, res ) => {
    if( !mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).send('Invalid id');
    }

    const user = await User
        .findById(req.params.id)
        .select({ _id: 1, name: 1, email: 1});

    if( !user ) {
        res.status(404).send("User not found");
    }

    res.send(user);
}); 
*/ 

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    mongoose.connection.close();

    // checking user already registerd
    let user = await User.findOne({ email: req.body.email });
    if(user) 
        return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    
    const token = user.generateAuthToken();    
    res.header('x-auth-token', token).send( _.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
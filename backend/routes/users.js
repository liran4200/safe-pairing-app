const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

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


router.get('/:id', async (req, res ) => {
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

//TODO: implement return the current user online.
router.get('/me', (req, res ) => {
    res.send({'namecheck': 'liran'});
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    // checking user already registerd
    let user = await User.findOne({ email: req.body.email });
    if(user) 
        return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    res.send( _.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
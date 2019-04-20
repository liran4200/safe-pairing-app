const mongoose = require('mongoose');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me',auth, async (req, res ) => {
    if( !mongoose.Types.ObjectId.isValid(req.user._id)) {
        res.status(400).send('Invalid id');
    }
    const user = await User.findById(req.user._id);
    if(!user) {
        return res.status(404).send("User not found");
    }
    res.status(200).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']) );
});

/* currently not in use.
router.get('/', async (req, res ) => {
    const pageNumber =  parseInt(req.query.pageNumber);
    const pageSize =   parseInt(req.query.pageSize);

    if( !pageNumber || !pageSize || pageNumber < 1 ) {
        return res.status(400).send("Invalid pageNumber or pageSize");
    }

    const users = await User
        .find()
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
        .select({ _id: 1, firstName: 1, lastName: 1, email: 1});

    res.send(users);
});
*/

router.get('/search/', async ( req, res) => {
    const pageNumberDefault = 1;
    const pageSizeDefault = 10;
    let pageNumber =  parseInt(req.query.pageNumber);
    let pageSize =   parseInt(req.query.pageSize);

    if( !pageNumber) {
       pageNumber = pageNumberDefault;
    }

    if( !pageSize){
        pageSize = pageSizeDefault;
    }

    let parts = (req.query.keyWord).split(' ')
    let firstName = ''
    let lastName = ''

    if (parts.length > 1) {
        firstName = (req.query.keyWord).split(' ').slice(0, -1).join(' ');
        lastName = (req.query.keyWord).split(' ').slice(-1).join(' ');
    } else {
        firstName = req.query.keyWord
        lastName = req.query.keyWord
    }
    const users = await User.find(
        {
            $or: [
                {firstName: { $regex: firstName, $options: 'i'} },
                {lastName: { $regex: lastName, $options: 'i'}},
                {email: req.query.keyWord }
            ]
        }
    )
    .skip((pageNumber-1) * pageSize)
    .limit(pageSize)
    .select('firstName lastName email');

    res.status(200).send(users);
});


router.get('/:id', validateObjectId, async (req, res ) => {
    const user = await User
        .findById(req.params.id)
        .select({ _id: 1, firstName: 1, lastName: 1, email: 1});

    if( !user ) {
        res.status(404).send("User not found");
    }

    res.status(200).send(user);
});


router.post('/register', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    // checking user already registerd
    let user = await User.findOne({ email: req.body.email });
    if(user)
        return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['firstName','lastName','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    //new user after registeration will be logged in.
    const token = user.generateAuthToken();    
    res.status(200).header('x-auth-token', token).send( _.pick(user, ['_id','firstName','lastName','email']));
});

module.exports = router;

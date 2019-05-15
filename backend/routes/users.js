const mongoose = require('mongoose');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const multiplyLocalHost = require('../middleware/multiplyLocalHost');
const eosActions = require('../eosActions/actions');
const sendMail = require('../utils/sendMail');
const {mailOptions} = require('../utils/constants');
const randomatic = require('randomatic');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate, getFullName } = require('../models/user');
const express = require('express');
const router = express.Router();

router.use(multiplyLocalHost);

router.get('/me',auth, async (req, res ) => {
    if( !mongoose.Types.ObjectId.isValid(req.user._id)) {
        res.status(400).send('Invalid id');
    }
    const user = await User.findById(req.user._id);
    if(!user) {
        return res.status(404).send("User not found");
    }
    res.status(200).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email','eosAcc']) );
});

router.get('/search/', auth, async (req, res) => {
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
    const usersFromDb = await User.find(
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

    const users = usersFromDb.filter(usr => usr._id != req.user._id);

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
    const {error} = validate(_.pick(req.body, ['firstName','lastName','email','password','publicKey','eosAcc']));
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    //checking user already registerd
    let user = await User.findOne({ email: req.body.email });
    if(user)
        return res.status(400).send('User already registered');

    let accName = (req.body.firstName+req.body.lastName).toLowerCase();
    if(accName.length > 12)
        accName = accName.slice(0,12);
    req.body['eosAcc'] = accName;
    try{
        await eosActions.createNewAccount(accName, req.body.publicKey);
    }catch(e) {
        console.log(e);
        if(e && e.json && e.json.code)
            return res.status(e.code).send(e);
        return res.status(400).send(JSON.stringify(e));
    }

    user = new User(_.pick(req.body, ['firstName','lastName','email','password','publicKey','eosAcc']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.code  = randomatic('0',  6);
    await user.save();

    // send mail
    const body = mailOptions.emailConfirm.EMAIL_CONFIRMATION_BODY.replace("<code>", user.code);
    // sendMail(
    //     user.email,
    //     mailOptions.emailConfirm.EMAIL_CONFIRMATION_SUBJECT,
    //     '',
    //     body.replace("<username>", getFullName(user))
    // );

    res.status(200).send( _.pick(user, ['_id','code']));
});

router.post('/confirmation/:id',validateObjectId ,async (req, res) => {

    // TODO: check if already active.
    if(!req.body.code)
        return res.status(400).send('Confirmation code not provided');

    let user = await User.findById(req.params.id);
    if(!user)
        return res.status(404).send('User not found');

    if(req.body.code != user.code)
        return res.status(400).send('Confirmation code is not matching, please try again');

    user.isActive = true;
    user.save();
    //TODO: remove code field from mongo
    await User.updateOne({_id: user._id}, {$unset: {code: 1 }});

    res.status(200).send(_.pick(user,['_id','firstName','lastName','email','isActive','publicKey']));
});

module.exports = router;

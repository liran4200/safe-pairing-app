const {mailOptions} = require('../utils/constants');
const sendMail = require('../utils/sendMail');
const connections = require('../utils/Connections');
const auth = require('../middleware/auth');
const multiplyLocalHost = require('../middleware/multiplyLocalHost');
const _ = require('lodash');
const {User} = require('../models/user');
const { Notification, validate, validateStatus, validateType } = require('../models/notification');
const express = require('express');
const router = express.Router();

router.use(multiplyLocalHost);

router.get('/', async (req, res ) => {
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

    const notifications = await Notification
        .find()
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
        .populate('senderId','firstName lastName email')
        .populate('receiverId','firstName lastName email')
        .select( {status: 1, receiverId: 1, senderId: 2, type: 1, createdDate: 1} );

    res.send(notifications);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let notification = new Notification(_.pick(req.body, ['receiverId','senderId','type','status']));
    await notification.save();

    //populate sender user.
    console.debug(notification);
    notification = await Notification
                    .findById(notification._id)
                    .populate('senderId','firstName lastName email');
    console.debug(notification);
    const fullName = notification.senderId.firstName + notification.senderId.lastName;
    // send email
    const body = mailOptions.matchingRequest.MATCHING_REQUEST_PENDING_BODY
            .replace("<username>", fullName)
            .replace("<status>", notification.status);
    const subject = mailOptions.matchingRequest.MATCHING_REQUEST_SUBJECT.replace("<status>", notification.status);
    // sendMail(notification.senderId.email, subject, body);

    //push notification.
    target = connections.getConenction(notification.receiverId);
    if(target) {
        target.emit("notify", notification);
    }

    res.status(200).send( _.pick(notification, ['_id','receiverId','senderId','type','status']));
});

router.put('/status/:id', async (req, res) => {
    if(!validateStatus(req.body.status)){
        return res.status(400).send("Status is not exists");
    }
    let notification = await Notification.findByIdAndUpdate(req.params.id, {status: req.body.status }, {
        new: true
    });
    if(!notification) res.status(404).send("Notification not found");

    const user = await User.findById(req.body.receiverId);
    if(!user) {
        res.status(404).send("User not found");
    }
    console.log(user);
    notification = _.pick(notification, ['_id','receiverId','senderId','type','status']);

    //send mail
    const body = mailOptions.matchingRequest.MATCHING_REQUEST_BODY
            .replace("<username>", req.body.senderName)
            .replace("<status>", notification.status);
    console.debug(body);
    const subject = mailOptions.matchingRequest.MATCHING_REQUEST_SUBJECT.replace("<status>", notification.status);
    console.debug(subject);
    // sendMail(user.email, subject, body);

    //push notification
    target = connections.getConenction(req.body.senderId);
    if(target) {
        target.emit("updateStatus", notification);
    }

    res.status(200).send(notification);
});

router.get('/:id', async (req, res) => {
    const notification = await Notification
            .findById(req.params.id)
            .populate('senderId','firstName lastName email')
            .populate('receiverId','firstName lastName email');
    if(!notification) res.status(404).send("Notification not found");
    res.status(200).send(_.pick(notification, ['_id','receiverId','senderId','type','status']));
});

module.exports = router;

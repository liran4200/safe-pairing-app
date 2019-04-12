const {mailOptions} = require('../lib/constants');
const sendMail = require('../lib/sendMail');
const connections = require('../lib/Connections');
const auth = require('../middleware/auth');
const _ = require('lodash');
const { Notification, validate, validateStatus, validateType } = require('../models/notification');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res ) => {
    const pageNumber =  parseInt(req.query.pageNumber);
    const pageSize =   parseInt(req.query.pageSize);
    
    if( !pageNumber || !pageSize || pageNumber < 1 ) {
        res.status(400).send("Invalid pageNumber or pageSize");
    }

    const notifications = await Notification
        .find()
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
        .select( {status: 1, receiverId: 1, senderId: 2, type: 1} );

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
    notification = await Notification
                    .findById(notification._id)
                    .populate('senderId', 'name','email');
    console.debug(notification);

    // send email
    const body = mailOptions.matchingRequest.MATCHING_REQUEST_PENDING_BODY
            .replace("<username>", notification.senderId.name)
            .replace("<status>", notification.status);
    const subject = mailOptions.matchingRequest.MATCHING_REQUEST_SUBJECT.replace("<status>", notification.status);
    sendMail(notification.senderId.email, subject, body);

    //push notification.
    target = connections.getConenction(notification.receiverId);
    if(target) {
        target.emit("notify", notification);
    } 

    res.send( _.pick(notification, ['_id','receiverId','senderId','type','status']));
});

router.put('/status/:id', async (req, res) => {
    if(!validateStatus(req.body.status)){
        return res.status(400).send("Status is not exists");
    }
    let notification = await Notification.findByIdAndUpdate(req.params.id, {status: req.body.status }, {
        new: true
    });
    if(!notification) res.status(404).send("Notification not found");
    const user = await user.findById(req.body.userId);
    console.log(req.body);
    notification = _.pick(notification, ['_id','receiverId','senderId','type','status']);
    
    //send mail
    const body = mailOptions.matchingRequest.MATCHING_REQUEST_PENDING_BODY
            .replace("<username>", req.body.senderNamec)
            .replace("<status>", notification.status);
    console.debug(body);
    const subject = mailOptions.matchingRequest.MATCHING_REQUEST_SUBJECT.replace("<status>", notification.status);
    console.debug(subject);
    //sendMail(user.email, subject, body);

    //push notification
    target = connections.getConenction(req.body.userId);
    if(target) {
        target.emit("updateStatus", notification);
    } 

    res.status(200).send(notification);
});

router.get('/:id', async (req, res) => {
    const notification = await Notification.findById(req.params.id);
    if(!notification) res.status(404).send("Notification not found");
    res.status(200).send(_.pick(notification, ['_id','receiverId','senderId','type','status']));
});

module.exports = router;
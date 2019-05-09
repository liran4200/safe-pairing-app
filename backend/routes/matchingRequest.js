const { types, mailOptions } = require('../utils/constants');
const sendMail = require('../utils/sendMail');
const connections = require('../utils/Connections');
const auth = require('../middleware/auth');
const multiplyLocalHost = require('../middleware/multiplyLocalHost');
const _ = require('lodash');
const {User, getFullName} = require('../models/user');
const { Notification } = require('../models/notification');
const { MatchingRequest, validate, validateStatus, validateType } = require('../models/matchingRequest');
const express = require('express');
const router = express.Router();

router.use(multiplyLocalHost);

router.get('/:userId', async (req, res ) => {
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
    //get matching requests where user is sender or receiver
    const matchingRequests = await MatchingRequest
        .find({
          $or: [
            { senderId: req.params.userId },
            { receiverId: req.params.userId }
          ]
        })
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
        .populate('senderId','firstName lastName email')
        .populate('receiverId','firstName lastName email')
        .select( {status: 1, receiverId: 1, senderId: 2, type: 1, createdDate: 1} );

    res.send(matchingRequests);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let matchingRequest = new MatchingRequest(_.pick(req.body, ['receiverId','senderId','type','status']));
    await matchingRequest.save();

    //populate sender user.
    console.debug(matchingRequest);
    matchingRequest = await MatchingRequest
                    .findById(matchingRequest._id)
                    .populate('senderId','firstName lastName email')
                    .populate('receiverId','firstName lastName email');

    console.debug(matchingRequest);
    const fullName = getFullName(matchingRequest.senderId);
    // send email
    const html = mailOptions.matchingRequest.MATCHING_REQUEST_PENDING_BODY
            .replace("<username>", fullName)
            .replace("<status>", matchingRequest.status);
    const subject = mailOptions.matchingRequest.MATCHING_REQUEST_SUBJECT.replace("<status>", matchingRequest.status);

    // sendMail(
    //     matchingRequest.receiverId.email,
    //     subject,
    //     '',
    //     html);

    //create new notification
    let notification = new Notification({
      matchingRequestId: matchingRequest._id,
      ownerId: matchingRequest.receiverId,
      otherUserId: matchingRequest.senderId,
      matchingRequestStatus: matchingRequest.status
    });
    await notification.save();
    //push notification.
    target = connections.getConenction(req.body.receiverId);
    console.log("**********************************************************");
    console.log(matchingRequest);
    console.log(target);
    console.log(notification);
    if(target) {
        target.emit("notify", notification);
    }

    res.status(200).send( _.pick(matchingRequest, ['_id','receiverId','senderId','type','status']));
});

router.put('/status/:id', async (req, res) => {
    if(!validateStatus(req.body.status)){
        return res.status(400).send("Status is not exists");
    }
    let matchingRequest = await MatchingRequest.findByIdAndUpdate(req.params.id, {status: req.body.status }, {
        new: true
    });
    if(!matchingRequest) res.status(404).send("Matching request not found");

    const user = await User.findById(req.body.receiverId);
    if(!user) {
        res.status(404).send("User not found");
    }
    console.log(user);
    matchingRequest = _.pick(matchingRequest, ['_id','receiverId','senderId','type','status']);

    //send mail
    const html = mailOptions.matchingRequest.MATCHING_REQUEST_BODY
            .replace("<username>", req.body.senderName)
            .replace("<status>", matchingRequest.status);
    console.debug(html);
    const subject = mailOptions.matchingRequest.MATCHING_REQUEST_SUBJECT.replace("<status>", matchingRequest.status);
    console.debug(subject);

    // sendMail(
    //     user.email,
    //     subject,
    //     '',
    //     html);

      //create new notification
      let notification = new Notification({
        matchingRequestId: matchingRequest._id,
        ownerId: matchingRequest.senderId,
        otherUserId: matchingRequest.receiverId,
        type: types.UPDATE_MATCHING_NOTIFICATION,
        matchingRequestStatus: matchingRequest.status

      });
      await notification.save();

    //push notification
    target = connections.getConenction(req.body.senderId);
    if(target) {
        target.emit("updateStatus", notification);
    }

    res.status(200).send(matchingRequest);
});

router.get('/:id', async (req, res) => {
    const matchingRequest = await MatchingRequest
            .findById(req.params.id)
            .populate('senderId','firstName lastName email')
            .populate('receiverId','firstName lastName email');
    if(!matchingRequest) res.status(404).send("Matching request not found");
    res.status(200).send(_.pick(matchingRequest, ['_id','receiverId','senderId','type','status']));
});

module.exports = router;

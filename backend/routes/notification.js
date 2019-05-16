const {mailOptions} = require('../utils/constants');
const sendMail = require('../utils/sendMail');
const connections = require('../utils/Connections');
const auth = require('../middleware/auth');
const multiplyLocalHost = require('../middleware/multiplyLocalHost');
const _ = require('lodash');
const {User, getFullName} = require('../models/user');
const { Notification, validate, validateStatus, validateType } = require('../models/notification');
const express = require('express');
const router = express.Router();

router.use(multiplyLocalHost);

router.get('/:ownerId', auth,async (req, res ) => {
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
        .find( { ownerId: req.params.ownerId } )
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
        .sort( { lastUpdateDate: 'desc' } )
        .populate({
          path: 'matchingRequestId',
          populate: {
            path: 'senderId',
            model: 'User',
            select: 'firstName lastName email'
          }
        })
        .populate({
            path: 'matchingRequestId',
            populate: {
              path: 'receiverId',
              model: 'User',
              select: 'firstName lastName email'
            }
        })
        .select( {status: 1, type: 1, matchingRequestStatus: 1, ownerId: 1, lastUpdateDate: 1} );

    res.send(notifications);
});

router.put('/status/:id',auth, async (req, res) => {
    if(!validateStatus(req.body.status)){
        return res.status(400).send("Status is not exists");
    }
    let notification = await Notification.findByIdAndUpdate(req.params.id, {status: req.body.status }, {
        new: true
    });
    if(!notification) res.status(404).send("Matching request not found");

    const user = await User.findById(req.body.ownerId);
    if(!user) {
        res.status(404).send("User not found");
    }
    console.log(user);
    notification = _.pick(notification, ['_id', 'ownerId', 'status']);

    res.status(200).send(notification);
});

module.exports = router;

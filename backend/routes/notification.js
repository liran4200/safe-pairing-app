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

router.get('/:ownerId', async (req, res ) => {
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
        .find( { ownerId: req.params.ownerId })
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
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
        .select( {status: 1, type: 1, createdDate: 1, matchingRequestStatus: 1} );

    res.send(notifications);
});

module.exports = router;

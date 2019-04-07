const auth = require('../middleware/auth');
const _ = require('lodash');
const { Notification, validate } = require('../models/notification');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res ) => {
    const pageNumber =  parseInt(req.query.pageNumber);
    const pageSize =   parseInt(req.query.pageSize);
    
    if( !pageNumber || !pageSize || pageNumber < 1 ) {
        res.status(400).send("Invalid pageNumber or pageSize");
    }

    const notifications = await Notification
        .find()
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
        .select( {status: 1, userId: 1, type: 1} );

    res.send(notifications);    
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const notification = new Notification(_.pick(req.body, ['userId','type','status']));
    await notification.save();
    
    // send email and socket notification.

    res.send( _.pick(notification, ['userId','type','status']));
});

module.exports = router;
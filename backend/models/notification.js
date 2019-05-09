const constants =require('../utils/constants');
const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const notificationSchema =  new mongoose.Schema({
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    otherUserId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    matchingRequestId: {
        type: mongoose.Types.ObjectId,
        ref: 'MatchingRequest',
        required: true
    },
    matchingRequestStatus: {
      type: String,
      required: true,
      ref: 'MatchingRequest'
    },
    type: {
        type: String,
        required: true,
        default: constants.types.NEW_MATCHING_NOTIFICATION
    },
    status: {
        type: String,
        default: constants.status.NOTIFICATION_NEW
    },
    lastUpdateDate: {
        type: Date,
        default: Date.now()
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

function validateNotification(notification) {
    const schema = {
      ownerId: Joi.objectId(),
      matchingRequestId: Joi.objectId(),
      type: Joi.string().max(20).required().valid(Object.values(constants.types)),
      status: Joi.string().valid(Object.values(constants.status))
    };
    return Joi.validate(notification, schema);
}

function validateStatus(status) {
    return Object.values(constants.status).includes(status);
}

function validateType(type) {
    return Object.values(constants.types).includes(type);
}

exports.Notification = Notification;
exports.validate = validateNotification;
exports.validateType = validateType;
exports.validateStatus = validateStatus;

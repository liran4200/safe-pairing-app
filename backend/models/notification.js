const constants =require('../utils/constants');
const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const notificationSchema =  new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: { 
        type: String,
        maxlength: 20,
        require: true
    },
    status: { 
        type: String,
        default: "pending"
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

function validateNotification(notification) {
    const schema = {
      receiverId: Joi.objectId(),
      senderId: Joi.objectId(),
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

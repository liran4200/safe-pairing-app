const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const notificationSchema =  new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    type: { // can be matching-request, result
        type: String,
        maxlength: 20,
        require: true
    },
    status: { // depend of type
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
      type: Joi.string().max(20).required(),
      status: Joi.string()
    };
    return Joi.validate(notification, schema);
}

exports.Notification = Notification;
exports.validate = validateNotification;
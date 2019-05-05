const constants =require('../utils/constants');
const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const matchingRequestSchema =  new mongoose.Schema({
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
        default: "Pending"
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    evaluation: {
      type: String,
      default: "No results yet"
    }
});

const MatchingRequest = mongoose.model('MatchingRequest', matchingRequestSchema);

function validateMatchingRequest(matchingRequest) {
    const schema = {
      receiverId: Joi.objectId(),
      senderId: Joi.objectId(),
      type: Joi.string().max(20).required().valid(Object.values(constants.types)),
      status: Joi.string().valid(Object.values(constants.status))
    };
    return Joi.validate(matchingRequest, schema);
}

function validateStatus(status) {
    return Object.values(constants.status).includes(status);
}

function validateType(type) {
    return Object.values(constants.types).includes(type);
}

exports.MatchingRequest = MatchingRequest;
exports.validate = validateMatchingRequest;
exports.validateType = validateType;
exports.validateStatus = validateStatus;

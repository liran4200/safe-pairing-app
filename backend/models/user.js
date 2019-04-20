const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        require: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    code: {
        type: Number,
        default: 0
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign( {_id: this._id, }, config.get('jwtPrivateKey') );
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required()
    };
    return Joi.validate(user, schema);
}

function getFullName(user) {
    return user.firstName + user.lastName;
}

exports.User = User;
exports.validate = validateUser;
exports.getFullName = getFullName;
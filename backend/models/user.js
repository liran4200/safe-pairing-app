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
    publicKey: {
        type: String,
        require: true
    },
    eosAcc: {
        type: String,
        require: true,
    },
    isActive: {
        type: Boolean,
        default: false,
        maxlength: 12
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
      password: Joi.string().min(5).required(),
      publicKey: Joi.string().required()
    };
    return Joi.validate(user, schema);
}

function getFullName(user) {
    return user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)+" "+ 
           user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
}

exports.User = User;
exports.validate = validateUser;
exports.getFullName = getFullName;
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
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
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign( {_id: this._id, }, config.get('jwtPrivateKey') );
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
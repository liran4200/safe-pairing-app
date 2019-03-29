const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        require: true
    }

}));

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